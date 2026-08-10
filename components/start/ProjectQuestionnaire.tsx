"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Layers3, MessageCircle, RotateCw, Sparkles, Star, Workflow } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  fetchQuestionnaireConfig,
  submitLead,
  type QuestionnaireConfig,
  type LeadResult,
} from "@/lib/api";
import { resolveProjectSlug } from "@/lib/foundationSlug";
import { projectAccents } from "@/data/brandAccents";
import { generateEventId, getFbc, getFbp, trackLead } from "@/lib/metaPixel";
import { pushGenerateLeadEvent } from "@/lib/gtm";
import {
  translateOption,
  industryLabels,
  buildTypeLabels,
  problemLabels,
  featureLabels,
  companySizeLabels,
} from "@/lib/id/questionnaireOptions";
import { buildLeadWhatsAppMessage, getStudioWhatsAppLink } from "@/lib/whatsapp";
import type { OperationalAssessment } from "@/lib/assessment-engine";

const TOTAL_STEPS = 6;

// The option VALUES stored in `answers` and sent to submitLead() stay in
// English (the canonical values the backend matches on) in every locale.
// For Bahasa Indonesia we swap only the DISPLAY label via translateOption;
// for English the raw value already reads correctly, so it passes through.

interface Answers {
  industry: string;
  buildType: string;
  problems: string[];
  features: string[];
  company: string;
  companySize: string;
  businessStatus: "RUNNING" | "PLANNING" | "";
  goal: string;
  name: string;
  email: string;
  phone: string;
}

type QuestionnaireView = "questionnaire" | "assessment" | "results";

const emptyAnswers: Answers = {
  industry: "",
  buildType: "",
  problems: [],
  features: [],
  company: "",
  companySize: "",
  businessStatus: "",
  goal: "",
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
  const locale = useLocale();
  const t = useTranslations("questionnaire");

  // Bahasa Indonesia swaps the display label; English shows the raw value.
  const labelOf = useCallback(
    (dict: Record<string, string>, value: string) =>
      locale === "id" ? translateOption(dict, value) : value,
    [locale]
  );

  const stepTitles = [
    t("step1Title"),
    t("step2Title"),
    t("step3Title"),
    t("step4Title"),
    t("step5Title"),
    t("step6Title"),
  ];

  const [config, setConfig] = useState<QuestionnaireConfig | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<LeadResult | null>(null);
  const [view, setView] = useState<QuestionnaireView>("questionnaire");
  const assessment = useMemo(() => result?.operationalAssessment ?? null, [result?.operationalAssessment]);

  // Fetch config once (re-run on retry or locale change).
  useEffect(() => {
    const controller = new AbortController();
    setConfig(null);
    setLoadError(null);

    fetchQuestionnaireConfig(locale, controller.signal)
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
        if (err?.name !== "AbortError") setLoadError(err?.message || t("loadErrorFallback"));
      });

    return () => controller.abort();
    // searchParams intentionally read once at mount / retry
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadKey, locale]);

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
      case 5: return answers.companySize !== "" && answers.businessStatus !== "";
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
      const data = await submitLead(
        {
          name: answers.name.trim(),
          ...(answers.email.trim() ? { email: answers.email.trim() } : {}),
          ...(answers.phone.trim() ? { phone: answers.phone.trim() } : {}),
          ...(answers.company.trim() ? { company: answers.company.trim() } : {}),
          companySize: answers.companySize,
          industry: answers.industry,
          buildType: answers.buildType,
          problems: answers.problems,
          features: answers.features,
          // Step 5 gates on this, so it can't be "" here — the cast keeps the
          // payload type honest without a redundant runtime check.
          businessStatus: answers.businessStatus as "RUNNING" | "PLANNING",
          ...(answers.businessStatus === "PLANNING" && answers.goal.trim()
            ? { goal: answers.goal.trim() }
            : {}),
          fbEventId,
          fbp: getFbp(),
          fbc: getFbc(),
        },
        locale
      );
      trackLead(fbEventId);
      pushGenerateLeadEvent({
        leadId: data.id,
        industry: answers.industry,
        buildType: answers.buildType,
      });
      setResult(data);
      setView("assessment");
    } catch (err) {
      if (err instanceof Error) setSubmitError(err?.message || t("submitErrorFallback"));
    } finally {
      setSubmitting(false);
    }
  }, [answers, locale, t]);

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
        <h1 className="text-2xl font-bold tracking-tight">{t("loadErrorTitle")}</h1>
        <p className="mt-3 text-muted-foreground">{loadError}</p>
        <button
          onClick={() => setReloadKey((k) => k + 1)}
          className="mt-6 inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-label bg-primary text-on-primary hover:opacity-80 transition-opacity"
        >
          <RotateCw className="h-4 w-4" />{t("retry")}
        </button>
      </div>
    );
  }

  if (!config) return <Skeleton />;

  if (view === "assessment" && result) {
    return (
      <AssessmentView
        assessment={assessment}
        onContinue={() => setView("results")}
        t={t}
      />
    );
  }

  if (view === "results" && result) {
    const contact = answers.email.trim() || answers.phone.trim();
    return <Results result={result} contact={contact} answers={answers} assessment={assessment} />;
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-20" onKeyDown={onKeyDown}>
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        <span>{t("progressLabel")}</span>
        <span>{t("stepCounter", { step, total: TOTAL_STEPS })}</span>
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
              <Option key={option} label={labelOf(industryLabels, option)} selected={answers.industry === option} onClick={() => set("industry", option)} />
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {config.buildTypes.map((option) => (
              <Option key={option} label={labelOf(buildTypeLabels, option)} selected={answers.buildType === option} onClick={() => set("buildType", option)} />
            ))}
          </div>
        )}

        {step === 3 && (
          <>
            <p className="mb-4 text-sm text-muted-foreground">{t("step3Help")}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {config.problems.map((option) => (
                <Option key={option} multi label={labelOf(problemLabels, option)} selected={answers.problems.includes(option)} onClick={() => toggleField("problems", option)} />
              ))}
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <p className="mb-4 text-sm text-muted-foreground">{t("step4Help")}</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {config.features.map((option) => (
                <Option key={option} multi label={labelOf(featureLabels, option)} selected={answers.features.includes(option)} onClick={() => toggleField("features", option)} />
              ))}
            </div>
          </>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <label className="block">
              <span className="mb-2 block text-sm font-medium">{t("companyNameLabel")} <span className="text-muted-foreground">{t("optional")}</span></span>
              <input
                type="text"
                maxLength={100}
                value={answers.company}
                onChange={(e) => set("company", e.target.value)}
                placeholder={t("companyNamePlaceholder")}
                className="w-full rounded-lg"
              />
            </label>
            <div>
              <span className="mb-2 block text-sm font-medium">{t("companySizeLabel")}</span>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {config.companySizes.map((option) => (
                  <Option key={option} label={labelOf(companySizeLabels, option)} selected={answers.companySize === option} onClick={() => set("companySize", option)} />
                ))}
              </div>
            </div>
            <div>
              <span className="mb-2 block text-sm font-medium">{t("businessStatusLabel")}</span>
              <div className="grid gap-3 sm:grid-cols-2">
                <Option
                  label={t("businessStatusRunning")}
                  selected={answers.businessStatus === "RUNNING"}
                  onClick={() => set("businessStatus", "RUNNING")}
                />
                <Option
                  label={t("businessStatusPlanning")}
                  selected={answers.businessStatus === "PLANNING"}
                  onClick={() => set("businessStatus", "PLANNING")}
                />
              </div>
            </div>
            {/* Only meaningful for a business that doesn't exist yet. */}
            {answers.businessStatus === "PLANNING" && (
              <label className="block">
                <span className="mb-2 block text-sm font-medium">{t("goalLabel")} <span className="text-muted-foreground">{t("optional")}</span></span>
                <textarea
                  rows={3}
                  maxLength={500}
                  value={answers.goal}
                  onChange={(e) => set("goal", e.target.value)}
                  placeholder={t("goalPlaceholder")}
                  className="w-full rounded-lg resize-none"
                />
              </label>
            )}
          </div>
        )}

        {step === 6 && (
          <div className="space-y-6">
            <label className="block">
              <span className="mb-2 block text-sm font-medium">{t("nameLabel")} <span className="text-primary">*</span></span>
              <input
                type="text"
                maxLength={100}
                value={answers.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder={t("namePlaceholder")}
                className="w-full rounded-lg"
              />
            </label>
            <p className="text-sm text-muted-foreground -mt-2">
              {t("contactHelp")}
            </p>
            <label className="block">
              <span className="mb-2 block text-sm font-medium">{t("emailLabel")}</span>
              <input
                type="email"
                maxLength={150}
                value={answers.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder={t("emailPlaceholder")}
                className="w-full rounded-lg"
                aria-invalid={answers.email !== "" && !emailValid(answers.email)}
              />
              {answers.email !== "" && !emailValid(answers.email) && (
                <span className="mt-1 block text-xs text-destructive">{t("emailInvalid")}</span>
              )}
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium">{t("phoneLabel")}</span>
              <input
                type="tel"
                maxLength={25}
                value={answers.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder={t("phonePlaceholder")}
                className="w-full rounded-lg"
                aria-invalid={answers.phone !== "" && !phoneValid(answers.phone)}
              />
              {answers.phone !== "" && !phoneValid(answers.phone) && (
                <span className="mt-1 block text-xs text-destructive">{t("phoneInvalid")}</span>
              )}
            </label>
            {answers.name.trim() !== "" &&
              answers.email.trim() === "" &&
              answers.phone.trim() === "" && (
                <p className="text-xs text-destructive">
                  {t("contactRequired")}
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
            <ArrowLeft className="h-4 w-4" />{t("back")}
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
          {step === TOTAL_STEPS ? (submitting ? t("submitting") : t("submit")) : t("next")}
          {!submitting && <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

function AssessmentView({
  assessment,
  onContinue,
  t,
}: {
  assessment: OperationalAssessment | null;
  onContinue: () => void;
  t: ReturnType<typeof useTranslations>;
}) {
  if (!assessment) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">{t("assessmentEyebrow")}</span>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">{t("assessmentTitle")}</h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{t("assessmentSubtitle")}</p>
        <div className="mt-8 rounded-2xl border border-gray-200 dark:border-white/10 bg-card/50 p-6 md:p-8">
          <p className="text-sm text-muted-foreground">The operational assessment is not available from the backend yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <span className="text-xs font-semibold uppercase tracking-widest text-primary">{t("assessmentEyebrow")}</span>
      <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">{t("assessmentTitle")}</h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{t("assessmentSubtitle")}</p>

      <div className="mt-8 rounded-2xl border border-gray-200 dark:border-white/10 bg-card/50 p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">{t("readinessScoreLabel")}</p>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-4xl font-bold tracking-tight">{assessment.score}</span>
              <span className="text-xl text-muted-foreground">/ 100</span>
            </div>
          </div>
          <p className="max-w-2xl text-sm text-muted-foreground">{t("readinessExplanation")}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5 p-6">
          <h2 className="text-xl font-semibold">{t("businessSummaryTitle")}</h2>
          <p className="mt-4 text-muted-foreground">{assessment.summary}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5 p-6">
          <h2 className="text-xl font-semibold">{t("keyFindingsTitle")}</h2>
          <div className="mt-4 space-y-3">
            {assessment.findings.map((finding) => (
              <div key={finding.title} className="rounded-xl border border-gray-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                <h3 className="text-sm font-semibold">{finding.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{finding.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-gray-200 dark:border-white/10 bg-card/50 p-6 md:p-8">
        <h2 className="text-xl font-semibold">{t("priorityRoadmapTitle")}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {assessment.priorities.map((priority) => {
            const Icon = priority.icon === "workflow" ? Workflow : priority.icon === "layers" ? Layers3 : Sparkles;
            return (
              <div key={priority.title} className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{priority.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{priority.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onContinue}
          className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-label bg-primary text-on-primary hover:opacity-80 transition-opacity"
        >
          {t("assessmentCta")}
          <ArrowRight className="h-4 w-4" />
        </button>
        <Link href="/projects" className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-6 py-3 text-sm font-label text-foreground hover:border-primary/60 hover:text-primary dark:border-white/15">
          {t("exploreCaseStudy")}
        </Link>
      </div>
    </div>
  );
}

function Results({ result, contact, answers, assessment }: { result: LeadResult; contact: string; answers: Answers; assessment: OperationalAssessment | null }) {
  const locale = useLocale();
  const t = useTranslations("questionnaire");
  if (!assessment) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{t("thankYouTitle", { name: result.name })}</h1>
        <p className="mt-4 text-muted-foreground">
          {t("thankYouBody", { contact })}
        </p>
      </div>
    );
  }
  const [top, ...rest] = result.recommendations ?? [];
  const others = rest.slice(0, 2);

  // WhatsApp message mirrors the on-screen language: Indonesian labels for
  // id, raw English values for en.
  const idn = <T extends string>(v: T) => v;
  const whatsappLink = top
    ? getStudioWhatsAppLink(
        buildLeadWhatsAppMessage(
          answers,
          top,
          locale === "id"
            ? {
                industry: (v) => translateOption(industryLabels, v),
                buildType: (v) => translateOption(buildTypeLabels, v),
                problem: (v) => translateOption(problemLabels, v),
                feature: (v) => translateOption(featureLabels, v),
                companySize: (v) => translateOption(companySizeLabels, v),
              }
            : {
                industry: idn,
                buildType: idn,
                problem: idn,
                feature: idn,
                companySize: idn,
              },
          locale
        )
      )
    : null;

  if (!top) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{t("thankYouTitle", { name: result.name })}</h1>
        <p className="mt-4 text-muted-foreground">
          {t("thankYouBody", { contact })}
        </p>
      </div>
    );
  }

  const topSlug = resolveProjectSlug(top.foundationSlug, top.foundationName);
  const topAccent = topSlug ? projectAccents[topSlug] : undefined;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
      <span className="text-xs font-semibold uppercase tracking-widest text-primary">{t("resultsEyebrow")}</span>
      <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">{t("resultsTitle")}</h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{t("resultsIntro")}</p>

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
          <span className="text-sm text-muted-foreground">{t("matchWord")}</span>
        </div>
        <p className="mt-4 text-muted-foreground">
          <span className="font-medium text-on-surface">{t("reasonLabel")}</span>
          {top.matchReason}
        </p>
        {topSlug && (
          <Link href={`/projects/${topSlug}`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-secondary transition">
            {t("seeCaseStudy")}<ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      <div className="mt-8 rounded-2xl border border-gray-200 dark:border-white/10 bg-card/50 p-6 md:p-8">
        <h2 className="text-xl font-semibold">{t("whyRecommendationTitle")}</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {assessment.recommendationBenefits.map((benefit) => (
            <div key={benefit} className="flex items-start gap-3 rounded-xl border border-gray-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
              <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="h-4 w-4" />
              </div>
              <p className="text-sm text-muted-foreground">{benefit}</p>
            </div>
          ))}
        </div>
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
        {t.rich("contactWithin", {
          contact,
          b: (chunks) => <span className="font-medium text-on-surface">{chunks}</span>,
        })}
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
            {t("assessmentDiscussionCta")}
          </a>
        )}
        {topSlug && (
          <Link
            href={`/projects/${topSlug}`}
            className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-label bg-primary text-on-primary hover:opacity-80 transition-opacity"
          >
            {t("exploreCaseStudy")}<ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
