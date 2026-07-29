"use client";

import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, MessageCircle } from "lucide-react";
import { fetchQuestionnaireConfig } from "@/lib/api";

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "https://api.carlssonstudio.com").replace(/\/$/, "");
const WA_NUMBER = process.env.NEXT_PUBLIC_STUDIO_WHATSAPP_NUMBER || "6285111215983";

// Shown only if the industry list can't be fetched — the page must never be
// unusable for ad traffic, so we fall back to the most common domains rather
// than block the visitor behind a retry.
const FALLBACK_INDUSTRIES = [
  "Retail",
  "Restaurant",
  "Cafe",
  "Spa",
  "Wellness",
  "Property",
  "Insurance",
  "HR & Payroll",
  "Education",
  "AI",
];

export default function QuickMatchPage() {
  const t = useTranslations("quickMatch");
  const locale = useLocale();
  type BusinessStatus = "RUNNING" | "PLANNING";

  const [industries, setIndustries] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [status, setStatus] = useState<BusinessStatus | null>(null);
  const [goal, setGoal] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    // Fail fast: on a slow/hanging mobile connection the request would
    // otherwise never resolve and leave the select empty. After 4s we abort
    // and drop to the fallback list so the visitor can always continue.
    const timeout = setTimeout(() => controller.abort(), 4000);

    fetchQuestionnaireConfig(locale ?? "id", controller.signal)
      .then((data) => {
        if (active) setIndustries(data.industries);
      })
      .catch(() => {
        if (active) setIndustries(FALLBACK_INDUSTRIES);
      })
      .finally(() => clearTimeout(timeout));

    return () => {
      active = false;
      controller.abort();
      clearTimeout(timeout);
    };
  }, [locale]);

  const canSubmit = name.trim() !== "" && industry !== "" && !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);

    // Fire-and-forget: logging the lead is nice-to-have, never a gate on
    // the visitor reaching WhatsApp.
    try {
      await fetch(`${API_URL}/api/leads/quick`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ 
          name: name.trim(), 
          industry, 
          businessStatus: status, 
          goal: status === "PLANNING" ? goal : null
        }),
      });
    } catch (err) {
      console.error("quick lead submit failed", err);
    }

    const message =
      status === "RUNNING"
        ? t("waRunning", { name: name.trim(), industry })
        : t("waPlanning", { name: name.trim(), industry, goal });
    window.location.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <p className="text-center font-headline font-bold text-2xl tracking-tighter text-primary">
          Carlsson Studio
        </p>

        <h1 className="mt-8 text-center text-3xl md:text-4xl font-headline font-bold leading-tight text-on-surface">
          {t("headline")}
        </h1>
        <p className="mt-3 text-center text-base text-on-surface-variant leading-relaxed">
          {t("subhead")}
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium">{t("nameLabel")}</span>
            <input
              type="text"
              inputMode="text"
              autoComplete="name"
              maxLength={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("namePlaceholder")}
              className="w-full rounded-lg text-base py-3.5"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">{t("industryLabel")}</span>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full rounded-lg text-base py-3.5"
            >
              <option value="" disabled>
                {industries.length === 0 ? t("loadingIndustries") : t("selectIndustry")}
              </option>
              {industries.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium">{t("statusLabel")}</span>
            <button type="button" className="w-full rounded-lg text-base py-3.5 text-left" onClick={() => setStatus("RUNNING")}>
              <input
                type="radio"
                name="status"
                value="RUNNING"
                checked={status === "RUNNING"}
                onChange={() => setStatus("RUNNING")}
                className="mr-2"
              />
              {t("status.running")}
            </button>
            <button type="button" className="w-full rounded-lg text-base py-3.5 text-left" onClick={() => setStatus("PLANNING")}>
              <input
                type="radio"
                name="status"
                value="PLANNING"
                checked={status === "PLANNING"}
                onChange={() => setStatus("PLANNING")}
                className="mr-2"
              />
              {t("status.planning")}
            </button>
          </label>

          {status === "PLANNING" && (
            <label className="block">
              <span className="mb-2 block text-sm font-medium">{t("goalLabel")}</span>
              <input
                type="text"
                placeholder={t("goalPlaceholder")}
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full rounded-lg text-base py-3.5"
              />
            </label>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-6 py-4 text-base font-label bg-primary text-on-primary transition-opacity duration-200 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <MessageCircle className="h-5 w-5" />
            {submitting ? t("openingWhatsapp") : t("continueButton")}
            {!submitting && <ArrowRight className="h-5 w-5" />}
          </button>
        </form>
      </div>
    </main>
  );
}
