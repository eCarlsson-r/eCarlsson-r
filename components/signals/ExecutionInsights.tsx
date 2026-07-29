import { generateInsights } from "@/lib/signals/generateInsights";
import { getAllSignals } from "@/lib/signals/loadSignals";
import { getLiveSignals } from "@/lib/signals/loadLiveSignals";
import { getTranslations } from "next-intl/server";

export default async function ExecutionInsights() {
  const signals = await getAllSignals();
  const live = await getLiveSignals();

  if (!live) return null;

  const insights = await generateInsights(signals, live);
  const t = await getTranslations("signals");

  return (
    <section className="p-8 border rounded-2xl bg-gray-50">
      <h2 className="text-xl font-semibold mb-6">{t("livePanel.title")}</h2>

      <ul className="space-y-3">
        {insights.map((insight, i) => (
          <li key={i} className="flex gap-3 text-gray-700">
            <span>⚡</span>
            {insight}
          </li>
        ))}
      </ul>
    </section>
  );
}