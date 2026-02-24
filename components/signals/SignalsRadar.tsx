import { ProjectSignals } from "@/lib/signals/types";
import SignalMeter from "./SignalMeter";

interface Props {
  signals: ProjectSignals;
}

export default function SignalsRadar({ signals }: Props) {
  const data = [
    { label: "Execution", value: signals.scores.execution },
    { label: "Complexity", value: signals.scores.complexity },
    { label: "Ownership", value: signals.scores.ownership }
  ];

  return (
    <div className="p-6 border rounded-2xl space-y-6">
      <h3 className="font-semibold text-lg">Signal Strength</h3>

      {data.map((d) => (
        <SignalMeter key={d.label} score={d.value} label={d.label} />
      ))}
    </div>
  );
}