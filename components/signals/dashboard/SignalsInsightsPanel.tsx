import { ProjectSignals } from "@/lib/signals/types";

interface Props {
  signals: ProjectSignals[];
}

export default function SignalsInsightsPanel({ signals }: Props) {
  const highestExecution = signals.sort(
    (a, b) => b.scores.execution - a.scores.execution,
  )[0];

  const highestComplexity = signals.sort(
    (a, b) => b.scores.complexity - a.scores.complexity,
  )[0];

  return (
    <div className="p-6 border rounded-2xl bg-gray-50 space-y-4">
      <h2 className="text-xl font-semibold">Execution Insights</h2>

      <ul className="space-y-2 text-sm">
        <li>
          ⭐ Most consistent execution: <b>{highestExecution.id}</b>
        </li>
        <li>
          🧠 Most complex system: <b>{highestComplexity.id}</b>
        </li>
        <li>🛠 Strong ownership across multiple end-to-end projects</li>
      </ul>
    </div>
  );
}
