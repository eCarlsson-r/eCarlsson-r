"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Calendar, Check, Download, Plus, Star } from "lucide-react";
import {
  buildTypes,
  industries,
  companySizes,
  problems,
  featureOptions,
  addOns,
  deliverables,
  recommend,
} from "@/data/discovery";
import { architectures } from "@/data/architectures";
import { projectAccents } from "@/data/brandAccents";

const TOTAL_STEPS = 8;

const stepTitles = [
  "What do you want to build?",
  "What industry are you in?",
  "How big is your team?",
  "What slows your business down today?",
  "Which features do you need?",
  "Recommended Foundation",
  "Customize your system",
  "Your Project Proposal",
];

function OptionButton({
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

function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export default function StartWizard() {
  const [step, setStep] = useState(1);
  const [buildType, setBuildType] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const recommendations = useMemo(
    () =>
      recommend({
        buildType,
        industry,
        companySize,
        problems: selectedProblems,
        features: selectedFeatures,
      }),
    [buildType, industry, companySize, selectedProblems, selectedFeatures]
  );

  const top = recommendations[0];
  const runnerUp = recommendations[1];
  const totalWeeks = top ? top.weeks + Math.ceil(selectedAddOns.length / 2) : 0;
  const stars = top ? Math.max(1, Math.min(5, Math.round(top.score / 20))) : 0;
  const architecture = top ? architectures[top.profile.slug] : undefined;
  const accent = top ? projectAccents[top.profile.slug] : undefined;

  const canContinue =
    step === 1 ? buildType !== "" :
    step === 2 ? industry !== "" :
    step === 3 ? companySize !== "" :
    true;

  const reason = top
    ? (top.matchedNeeds.length > 0 ? top.matchedNeeds : top.profile.covers)
        .slice(0, 6)
        .map((n) => n.toLowerCase())
    : [];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
      {/* Progress */}
      <div className="print:hidden">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <span>Let&apos;s build your system.</span>
          <span>Step {step} of {TOTAL_STEPS}</span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
        <h1 className="mt-8 text-2xl md:text-3xl font-bold tracking-tight">{stepTitles[step - 1]}</h1>
      </div>

      <motion.div key={step} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
        {step === 1 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {buildTypes.map((option) => (
              <OptionButton key={option} label={option} selected={buildType === option} onClick={() => setBuildType(option)} />
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {industries.map((option) => (
              <OptionButton key={option} label={option} selected={industry === option} onClick={() => setIndustry(option)} />
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {companySizes.map((option) => (
              <OptionButton key={option} label={`${option} people`} selected={companySize === option} onClick={() => setCompanySize(option)} />
            ))}
          </div>
        )}

        {step === 4 && (
          <>
            <p className="mb-4 text-sm text-muted-foreground">Select everything that applies.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {problems.map((option) => (
                <OptionButton key={option} multi label={option} selected={selectedProblems.includes(option)} onClick={() => setSelectedProblems((prev) => toggle(prev, option))} />
              ))}
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <p className="mb-4 text-sm text-muted-foreground">Select everything you expect the system to handle.</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {featureOptions.map((option) => (
                <OptionButton key={option} multi label={option} selected={selectedFeatures.includes(option)} onClick={() => setSelectedFeatures((prev) => toggle(prev, option))} />
              ))}
            </div>
          </>
        )}

        {step === 6 && top && (
          <div className="rounded-2xl border bg-card/50 p-6 md:p-8" style={{ borderColor: accent }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Recommended Foundation</p>
            <div className="mt-3 flex items-center gap-1" aria-label={`${stars} out of 5 stars`} style={{ color: accent }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < stars ? "fill-current" : "text-gray-300 dark:text-white/20"}`} />
              ))}
            </div>
            <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h2 className="text-2xl md:text-3xl font-bold">{top.profile.name}</h2>
              <span className="text-lg font-semibold" style={{ color: accent }}>{top.score}% Match</span>
            </div>
            <p className="mt-4 text-sm font-semibold">Reason:</p>
            <p className="text-sm text-muted-foreground">You need {reason.join(", ")}.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white/60 dark:bg-white/5 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Estimated customization</p>
                <p className="mt-1 text-sm font-semibold">{top.customization}</p>
              </div>
              <div className="rounded-xl bg-white/60 dark:bg-white/5 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Suggested timeline</p>
                <p className="mt-1 text-sm font-semibold">{top.weeks} weeks</p>
              </div>
            </div>
            <Link href={`/projects/${top.profile.slug}`} target="_blank" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-secondary transition">
              See the full case study<ArrowRight className="h-4 w-4" />
            </Link>
            {runnerUp && (
              <p className="mt-6 border-t border-primary/20 pt-4 text-xs text-muted-foreground">
                Also considered: {runnerUp.profile.name} ({runnerUp.score}% match)
              </p>
            )}
          </div>
        )}

        {step === 7 && (
          <>
            <p className="mb-4 text-sm text-muted-foreground">
              Extend the {top?.profile.name} foundation with the add-ons your operation needs.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {addOns.map((option) => {
                const selected = selectedAddOns.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelectedAddOns((prev) => toggle(prev, option))}
                    aria-pressed={selected}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition
                      ${selected
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-dashed border-gray-300 dark:border-white/20 hover:border-primary/60"}`}
                  >
                    {selected ? <Check className="h-4 w-4 shrink-0" /> : <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />}
                    {option}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {step === 8 && top && (
          <div id="proposal-print" className="space-y-8">
            <div className="hidden print:block">
              <p className="text-2xl font-bold">Carlsson Studio — Project Proposal</p>
              <p className="text-sm text-gray-500">Generated {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
            </div>

            <section className="rounded-2xl border border-gray-200 dark:border-white/10 p-5">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Project Summary</h3>
              <p className="mt-2 text-sm">
                A custom <strong>{buildType}</strong> for a <strong>{industry}</strong> business with <strong>{companySize}</strong> people,
                built on the <strong>{top.profile.name}</strong> foundation.
              </p>
            </section>

            {selectedProblems.length > 0 && (
              <section className="rounded-2xl border border-gray-200 dark:border-white/10 p-5">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Business Needs</h3>
                <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                  {selectedProblems.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm"><Check className="h-3.5 w-3.5 text-primary" />{p}</li>
                  ))}
                </ul>
              </section>
            )}

            <section className="rounded-2xl border bg-card/50 p-5" style={{ borderColor: accent }}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Recommended Foundation</h3>
              <p className="mt-2 text-lg font-bold">{top.profile.name} <span className="ml-2 text-sm font-semibold" style={{ color: accent }}>{top.score}% match</span></p>
              <p className="mt-1 text-sm text-muted-foreground">Covers {top.profile.covers.join(", ")}.</p>
            </section>

            {(selectedFeatures.length > 0 || selectedAddOns.length > 0) && (
              <section className="rounded-2xl border border-gray-200 dark:border-white/10 p-5">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Selected Features</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[...selectedFeatures, ...selectedAddOns.map((a) => `+ ${a}`)].map((f) => (
                    <span key={f} className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/10 print:border print:border-gray-300">{f}</span>
                  ))}
                </div>
              </section>
            )}

            {architecture && (
              <section className="rounded-2xl border border-gray-200 dark:border-white/10 p-5">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Architecture</h3>
                <ul className="mt-2 space-y-1.5">
                  {architecture.nodes.map((node) => (
                    <li key={node.id} className="text-sm">
                      <strong>{node.label}</strong>{node.tech ? ` (${node.tech})` : ""} — <span className="text-muted-foreground">{node.description}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <section className="rounded-2xl border border-gray-200 dark:border-white/10 p-5">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Estimated Timeline</h3>
                <p className="mt-2 text-2xl font-bold">{totalWeeks} weeks</p>
                <p className="text-xs text-muted-foreground">{top.customization} customization{selectedAddOns.length > 0 ? ` · ${selectedAddOns.length} add-on${selectedAddOns.length > 1 ? "s" : ""}` : ""}</p>
              </section>
              <section className="rounded-2xl border border-gray-200 dark:border-white/10 p-5">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Deliverables</h3>
                <ul className="mt-2 space-y-1">
                  {deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm"><Check className="h-3.5 w-3.5 text-primary" />{d}</li>
                  ))}
                </ul>
              </section>
            </div>

            <p className="text-xs text-muted-foreground print:block">
              This proposal is an automated estimate based on your answers. Final scope, timeline, and pricing are confirmed together in a discovery call.
            </p>

            <div className="flex flex-wrap gap-4 print:hidden">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-label bg-primary text-on-primary hover:opacity-80 transition-opacity"
              >
                <Download className="h-4 w-4" />Download PDF
              </button>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-label border border-primary hover:border-secondary transition"
              >
                <Calendar className="h-4 w-4" />Schedule Discussion
              </Link>
            </div>
          </div>
        )}
      </motion.div>

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between print:hidden">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition"
          >
            <ArrowLeft className="h-4 w-4" />Back
          </button>
        ) : (
          <span />
        )}
        {step < TOTAL_STEPS && (
          <button
            type="button"
            onClick={() => canContinue && setStep(step + 1)}
            disabled={!canContinue}
            className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-label bg-primary text-on-primary hover:opacity-80 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {step === 5 ? "Get Recommendation" : step === 7 ? "Generate Proposal" : "Continue"}
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Print isolation: only the proposal is printed */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #proposal-print, #proposal-print * { visibility: visible; }
          #proposal-print { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>
    </div>
  );
}
