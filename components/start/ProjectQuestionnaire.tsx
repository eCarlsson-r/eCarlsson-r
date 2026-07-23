"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, MessageCircle, RotateCw, Star } from "lucide-react";
import {
  fetchQuestionnaireConfig,
  submitLead,
  type QuestionnaireConfig,
  type LeadResult,
} from "@/lib/api";
import { resolveProjectSlug } from "@/lib/foundationSlug";
import { projectAccents } from "@/data/brandAccents";
import { generateEventId, getFbc, getFbp, trackLead } from "@/lib/metaPixel";
import {
  translateOption,
  industryLabels,
  buildTypeLabels,
  problemLabels,
  featureLabels,
  companySizeLabels,
} from "@/lib/id/questionnaireOptions";
import { buildLeadWhatsAppMessage, getStudioWhatsAppLink } from "@/lib/whatsapp";

const TOTAL_STEPS = 6;

// Display copy is Bahasa Indonesia — most visitors arrive from Indonesian-
// language ads. The option VALUES stored in `answers` and sent to
// submitLead() stay in English throughout; only translateOption() output
// (labels) is Indonesian. See lib/id/questionnaireOptions.ts.
const stepTitles = [
  "Bisnis Anda bergerak di bidang apa?",
  "Sistem seperti apa yang Anda butuhkan?",
  "Masalah apa yang ingin Anda selesaikan?",
  "Fitur apa saja yang Anda butuhkan?",
  "Tentang Bisnis Anda",
  "Detail Kontak Anda",
];

interface Answers {
  industry: string;
  buildType: string;
  problems: string[];
  features: string[];
  company: string;
  companySize: string;
  name: string;
  email: string;
  phone: string;
}

const emptyAnswers: Answers = {
  industry: "",
  buildType: "",
  problems: [],
  features: [],
  company: "",
  companySize: "",
  name: "",
  email: "",
  phone: "",
};

const emailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
// Mirrors the backend's LeadRequest#phone pattern.
const phoneValid = (phone: string) => /^[+0-9 ().-]+$/.test(phone.trim());

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function Option({
  label,
  selected,
  onClick,
  multi = false,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  multi?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition
        ${selected
          ? "border-primary bg-primary/10 text-primary"
          : "border-gray-200 dark:border-white/15 bg-white/50 dark:bg-white/5 hover:border-primary/60"}`}
    >
      <span
        className={`grid h-4 w-4 shrink-0 place-items-center border ${multi ? "rounded" : "rounded-full"} ${
          selected ? "border-primary bg-primary text-on-primary" : "border-gray-300 dark:border-white/30"
        }`}
      >
        {selected && <Check className="h-3 w-3" />}
      </span>
      {label}
    </button>
  );
}

function Skeleton() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
      <div className="h-1.5 w-full animate-pulse rounded-full bg-gray-200 dark:bg-white/10" />
      <div className="mt-8 h-8 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-white/10" />
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-12 animate-pulse rounded-xl bg-gray-200 dark:bg-white/10" />
        ))}
      </div>
    </div>
  );
}

export default function ProjectQuestionnaire() {
  const searchParams = useSearchParams();

  const [config, setConfig] = useState<QuestionnaireConfig | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<LeadResult | null>(null);

  // Fetch config once (re-run on retry).
  useEffect(() => {
    const controller = new AbortController();
    setConfig(null);
    setLoadError(null);

    fetchQuestionnaireConfig(controller.signal)
      .then((data) => {
        setConfig(data);
        // Pre-select industry from ?industry= when it matches a known option.
        const requested = searchParams.get("industry");
        if (requested) {
          const match = data.industries.find(
            (i) => i.toLowerCase() === requested.toLowerCase()
          );
          if (match) {
            setAnswers((a) => ({ ...a, industry: match }));
            setStep(2);
          }
        }
      })
      .catch((err) => {
        if (err?.name !== "AbortError") setLoadError(err?.message || "Gagal memuat kuesioner.");
      });

    return () => controller.abort();
    // searchParams intentionally read once at mount / retry
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadKey]);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers((a) => ({ ...a, [key]: value }));

  // Functional toggle so rapid clicks never read a stale array from the closure.
  const toggleField = (key: "problems" | "features", value: string) =>
    setAnswers((a) => ({ ...a, [key]: toggle(a[key], value) }));

  const canAdvance = useMemo(() => {
    switch (step) {
      case 1: return answers.industry !== "";
      case 2: return answers.buildType !== "";
      case 3: return answers.problems.length >= 1;
      case 4: return answers.features.length >= 1;
      case 5: return answers.companySize !== "";
      case 6: {
        const email = answers.email.trim();
        const phone = answers.phone.trim();
        const emailOk = email === "" || emailValid(email);
        const phoneOk = phone === "" || phoneValid(phone);
        const hasContact = (email !== "" && emailValid(email)) || (phone !== "" && phoneValid(phone));
        return answers.name.trim() !== "" && emailOk && phoneOk && hasContact;
      }
      default: return false;
    }
  }, [step, answers]);

  const submit = useCallback(async () => {
    setSubmitting(true);
    setSubmitError(null);
    // Generated once per attempt and shared with the Pixel event below so
    // Meta dedupes the client + server pair instead of double-counting.
    const fbEventId = generateEventId();
    try {
      const data = await submitLead({
        name: answers.name.trim(),
        ...(answers.email.trim() ? { email: answers.email.trim() } : {}),
        ...(answers.phone.trim() ? { phone: answers.phone.trim() } : {}),
        ...(answers.company.trim() ? { company: answers.company.trim() } : {}),
        companySize: answers.companySize,
        industry: answers.industry,
        buildType: answers.buildType,
        problems: answers.problems,
        features: answers.features,
        fbEventId,
        fbp: getFbp(),
        fbc: getFbc(),
      });
      trackLead(fbEventId);
      setResult(data);
    } catch (err: any) {
      setSubmitError(err?.message || "Terjadi kesalahan saat mengirim jawaban Anda. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  }, [answers]);

  const advance = useCallback(() => {
    if (!canAdvance || submitting) return;
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
    else submit();
  }, [canAdvance, submitting, step, submit]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !(e.target instanceof HTMLTextAreaElement)) {
      e.preventDefault();
      advance();
    }
  };

  if (loadError) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Kuesioner gagal dimuat</h1>
        <p className="mt-3 text-muted-foreground">{loadError}</p>
        <button
          onClick={() => setReloadKey((k) => k + 1)}
          className="mt-6 inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-label bg-primary text-on-primary hover:opacity-80 transition-opacity"
        >
          <RotateCw className="h-4 w-4" />Coba Lagi
        </button>
      </div>
    );
  }

  if (!config) return <Skeleton />;

  if (result) {
    const contact = answers.email.trim() || answers.phone.trim();
    return <Results result={result} contact={contact} answers={answers} />;
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-20" onKeyDown={onKeyDown}>
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        <span>Mulai Proyek</span>
        <span>Langkah {step} dari {TOTAL_STEPS}</span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
        />
      </div>
      <h1 className="mt-8 text-2xl md:text-3xl font-bold tracking-tight">{stepTitles[step - 1]}</h1>

      <motion.div key={step} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
        {step === 1 && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {config.industries.map((option) => (
              <Option key={option} label={translateOption(industryLabels, option)} selected={answers.industry === option} onClick={() => set("industry", option)} />
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {config.buildTypes.map((option) => (
              <Option key={option} label={translateOption(buildTypeLabels, option)} selected={answers.buildType === option} onClick={() => set("buildType", option)} />
            ))}
          </div>
        )}

        {step === 3 && (
          <>
            <p className="mb-4 text-sm text-muted-foreground">Pilih semua yang sesuai dengan bisnis Anda.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {config.problems.map((option) => (
                <Option key={option} multi label={translateOption(problemLabels, option)} selected={answers.problems.includes(option)} onClick={() => toggleField("problems", option)} />
              ))}
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <p className="mb-4 text-sm text-muted-foreground">Pilih semua fitur yang Anda butuhkan dari sistem ini.</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {config.features.map((option) => (
                <Option key={option} multi label={translateOption(featureLabels, option)} selected={answers.features.includes(option)} onClick={() => toggleField("features", option)} />
              ))}
            </div>
          </>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Nama Bisnis <span className="text-muted-foreground">(opsional)</span></span>
              <input
                type="text"
                maxLength={100}
                value={answers.company}
                onChange={(e) => set("company", e.target.value)}
                placeholder="Toko Maju Jaya"
                className="w-full rounded-lg"
              />
            </label>
            <div>
              <span className="mb-2 block text-sm font-medium">Jumlah Karyawan</span>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {config.companySizes.map((option) => (
                  <Option key={option} label={translateOption(companySizeLabels, option)} selected={answers.companySize === option} onClick={() => set("companySize", option)} />
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-6">
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Nama <span className="text-primary">*</span></span>
              <input
                type="text"
                maxLength={100}
                value={answers.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Budi Santoso"
                className="w-full rounded-lg"
              />
            </label>
            <p className="text-sm text-muted-foreground -mt-2">
              Isi email, nomor WhatsApp, atau keduanya — kami butuh minimal satu cara untuk menghubungi Anda.
            </p>
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Email</span>
              <input
                type="email"
                maxLength={150}
                value={answers.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="nama@usaha.com"
                className="w-full rounded-lg"
                aria-invalid={answers.email !== "" && !emailValid(answers.email)}
              />
              {answers.email !== "" && !emailValid(answers.email) && (
                <span className="mt-1 block text-xs text-destructive">Masukkan alamat email yang valid.</span>
              )}
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Nomor WhatsApp</span>
              <input
                type="tel"
                maxLength={25}
                value={answers.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="0812 3456 7890"
                className="w-full rounded-lg"
                aria-invalid={answers.phone !== "" && !phoneValid(answers.phone)}
              />
              {answers.phone !== "" && !phoneValid(answers.phone) && (
                <span className="mt-1 block text-xs text-destructive">Masukkan nomor telepon yang valid.</span>
              )}
            </label>
            {answers.name.trim() !== "" &&
              answers.email.trim() === "" &&
              answers.phone.trim() === "" && (
                <p className="text-xs text-destructive">
                  Tambahkan email atau nomor WhatsApp agar kami bisa menghubungi Anda.
                </p>
            )}
            {submitError && (
              <p className="rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {submitError}
              </p>
            )}
          </div>
        )}
      </motion.div>

      <div className="mt-10 flex items-center justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition"
          >
            <ArrowLeft className="h-4 w-4" />Kembali
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={advance}
          disabled={!canAdvance || submitting}
          className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-label bg-primary text-on-primary hover:opacity-80 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {step === TOTAL_STEPS ? (submitting ? "Mengirim…" : "Lihat Rekomendasi Saya") : "Lanjut"}
          {!submitting && <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

function Results({ result, contact, answers }: { result: LeadResult; contact: string; answers: Answers }) {
  const [top, ...rest] = result.recommendations ?? [];
  const others = rest.slice(0, 2);

  const whatsappLink = top
    ? getStudioWhatsAppLink(
        buildLeadWhatsAppMessage(answers, top, {
          industry: (v) => translateOption(industryLabels, v),
          buildType: (v) => translateOption(buildTypeLabels, v),
          problem: (v) => translateOption(problemLabels, v),
          feature: (v) => translateOption(featureLabels, v),
          companySize: (v) => translateOption(companySizeLabels, v),
        })
      )
    : null;

  if (!top) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Terima kasih, {result.name}.</h1>
        <p className="mt-4 text-muted-foreground">
          Jawaban Anda sudah kami terima. Kami akan menghubungi Anda dalam 24 jam melalui {contact}.
        </p>
      </div>
    );
  }

  const topSlug = resolveProjectSlug(top.foundationSlug, top.foundationName);
  const topAccent = topSlug ? projectAccents[topSlug] : undefined;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
      <span className="text-xs font-semibold uppercase tracking-widest text-primary">Rekomendasi Anda</span>
      <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Fondasi Sistem yang Direkomendasikan</h1>

      {/* Top match */}
      <div className="mt-8 rounded-2xl border bg-card/50 p-6 md:p-8" style={{ borderColor: topAccent ?? undefined }}>
        <div className="flex items-center gap-1" aria-label={`${top.matchScore}% match`} style={{ color: topAccent }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < Math.round(top.matchScore / 20) ? "fill-current" : "text-gray-300 dark:text-white/20"}`} />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h2 className="text-2xl md:text-3xl font-bold">{top.foundationName}</h2>
          <span className="text-3xl font-bold" style={{ color: topAccent }}>{Math.round(top.matchScore)}%</span>
          <span className="text-sm text-muted-foreground">kecocokan</span>
        </div>
        <p className="mt-4 text-muted-foreground">
          <span className="font-medium text-on-surface">Alasan: </span>
          {top.matchReason}
        </p>
        {topSlug && (
          <Link href={`/projects/${topSlug}`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-secondary transition">
            Lihat studi kasus lengkap<ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      {/* Runner-up matches */}
      {others.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {others.map((rec) => {
            const slug = resolveProjectSlug(rec.foundationSlug, rec.foundationName);
            const inner = (
              <>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-semibold">{rec.foundationName}</h3>
                  <span className="text-lg font-bold text-primary">{Math.round(rec.matchScore)}%</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{rec.matchReason}</p>
              </>
            );
            return slug ? (
              <Link key={rec.foundationSlug} href={`/projects/${slug}`} className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-5 transition hover:border-primary/60 hover:no-underline">
                {inner}
              </Link>
            ) : (
              <div key={rec.foundationSlug} className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-5">
                {inner}
              </div>
            );
          })}
        </div>
      )}

      <p className="mt-8 text-muted-foreground">
        Kami akan menghubungi Anda dalam 24 jam melalui <span className="font-medium text-on-surface">{contact}</span>.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        {whatsappLink && (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-label bg-primary text-on-primary hover:opacity-80 transition-opacity"
          >
            <MessageCircle className="h-4 w-4" />
            Kirim Pesan WhatsApp
          </a>
        )}
        {topSlug && (
          <Link
            href={`/projects/${topSlug}`}
            className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-label bg-primary text-on-primary hover:opacity-80 transition-opacity"
          >
            Jelajahi studi kasus<ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
