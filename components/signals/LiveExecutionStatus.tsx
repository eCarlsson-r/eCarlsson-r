interface LiveSignals {
  activityPulse: string;
  executionVelocity: string;
  commitsLast30Days: number;
  techFocus: Record<string, number>;
}

import { getTranslations } from "next-intl/server";

export default async function LiveExecutionStatus({
  live,
}: {
  live: LiveSignals;
}) {
  const topTech = Object.entries(live.techFocus).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const t = await getTranslations("signals");

  return (
    <section className="p-8 border rounded-2xl bg-blur bg-linear-to-r from-red-500/10 to-blue-500/10">
      <h2 className="text-xl font-semibold mb-6">{t("liveStatus.title")}</h2>

      <div className="grid md:grid-cols-4 gap-6 text-center">
        <Stat label={t("liveStatus.activityPulse")} value={live.activityPulse} />
        <Stat label={t("liveStatus.executionVelocity")} value={live.executionVelocity} />
        <Stat label={t("liveStatus.commits30")} value={live.commitsLast30Days} />
        <div>
          <p className="text-sm text-gray-500 mb-2">{t("liveStatus.currentFocus")}</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {topTech.map(([tech]) => (
              <span key={tech} className="px-3 py-1 bg-chart-1 text-white rounded-full text-xs">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}