import { ProjectSignals } from "@/lib/signals/types";

interface Props {
  signals: ProjectSignals;
}

export default function SignalSummary({ signals }: Props) {
  return (
    <div className="p-6 border rounded-2xl bg-gray-50 space-y-3">
      <h4 className="font-semibold">Execution Insights</h4>
      <ul className="text-sm space-y-2">
        <li>
          Execution Level:&emsp;
          <b>{signals.summary.executionLevel}</b>
        </li>
        <li>
          Complexity Level:&emsp;
          <b>{signals.summary.complexityLevel}</b>
        </li>
        <li>
          Ownership Level:&emsp;
          <b>{signals.summary.ownershipLevel}</b>
        </li>
      </ul>
    </div>
  );
}
