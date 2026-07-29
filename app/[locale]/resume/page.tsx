import { getLiveSignals } from "@/lib/signals/loadLiveSignals";
import { loadResumeMetrics } from "@/lib/hooks/loadResumeMetrics";

import LiveExecutionStatus from "@/components/signals/LiveExecutionStatus";
import ExecutionInsights from "@/components/signals/ExecutionInsights";
import ExecutionBadges from "@/components/signals/ExecutionBadges";
import ExecutionTimeline from "@/components/signals/ExecutionTimeline";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function ResumePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "resume" });
  const live = await getLiveSignals() ?? {
    activityPulse: "Inactive",
    executionVelocity: "Low",
    commitsLast30Days: 0,
    lastCommit: "",
    techFocus: {},
    momentum: "Stable",
    consistencyScore: 0
  };
  const metrics = await loadResumeMetrics();

  return (
    <div className="lg:py-12">
      <div className="mx-auto max-w-6xl space-y-12 p-8 lg:px-0">
        {/* Hero */}
        <section>
          <h1 className="text-5xl font-bold text-primary">{t("title")}</h1>
          <p className="text-gray-600 mt-4">{t("description")}</p>
        </section>

        {/* NEW: Live Intelligence */}
        <LiveExecutionStatus live={live} />

        {/* Metrics */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Metric value={metrics?.projects || 0} label={t("metrics.projectsDelivered")} />
          <Metric value={metrics?.systemsBuilt || 0} label={t("metrics.systemsBuilt")} />
          <Metric value={metrics?.executionScore || 0} label={t("metrics.executionScore")} />
          <Metric value="2 - 4 weeks" label={t("metrics.typicalDeliveryCycle")} />
        </section>

        {/* NEW: AI Insights */}
        <ExecutionInsights />

        {/* NEW: Badges */}
        <ExecutionBadges />
      </div>
      <ExecutionTimeline />
    </div>
  );
}

function Metric({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="p-4 rounded-xl bg-blur bg-linear-to-r from-red-500/10 to-blue-500/10 text-center">
      <p className="text-4xl font-bold">{value}</p>
      <p className="text-gray-500">{label}</p>
    </div>
  );
}