import { ProjectSignals } from "@/lib/signals/types";
import SignalMeter from "./SignalMeter";

interface Props {
  signals: ProjectSignals;
}

export default function SignalCard({ signals }: Props) {
  return (
    <div className="p-6 border rounded-2xl shadow-sm bg-white space-y-4">
      <h3 className="text-xl font-semibold">Execution Signals</h3>

      <SignalMeter score={signals.scores.execution} label="Execution" />
      <SignalMeter score={signals.scores.complexity} label="Complexity" />
      <SignalMeter score={signals.scores.ownership} label="Ownership" />
    </div>
  );
}
