import { ProjectSignals } from "@/lib/signals/types";

interface Props {
  signals: ProjectSignals;
}

export default function SignalsBreakdown({ signals }: Props) {
  return (
    <div className="p-6 border rounded-2xl bg-gray-50 space-y-4">
      <h3 className="font-semibold">Execution Breakdown</h3>

      <ul className="text-sm space-y-2">
        <li>✔ Long-term development consistency</li>
        <li>✔ Multi-layer architecture implementation</li>
        <li>✔ End-to-end ownership</li>
        <li>✔ Real-world system complexity</li>
      </ul>
    </div>
  );
}