import { generateInsights } from "@/lib/signals/generateInsights";
import { getAllSignals } from "@/lib/signals/loadSignals";
import { getLiveSignals } from "@/lib/signals/loadLiveSignals";

export default function ExecutionInsights() {
  const signals = getAllSignals();
  const live = getLiveSignals()!;

  const insights = generateInsights(signals, live);

  return (
    <section className="p-8 border rounded-2xl bg-gray-50">
      <h2 className="text-xl font-semibold mb-6">
        Execution Intelligence Insights
      </h2>

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