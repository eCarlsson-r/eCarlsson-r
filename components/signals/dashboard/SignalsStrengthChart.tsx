import ScoreBar from "@/components/project/ScoreBar";
import { ProjectSignals } from "@/lib/signals/types";

interface Props {
  signals: ProjectSignals[];
}

export default function SignalsStrengthChart({ signals }: Props) {
  const total = (key: keyof ProjectSignals["scores"]) =>
    Math.round(
      signals.reduce((sum, s) => sum + s.scores[key], 0) / signals.length,
    );

  const data = [
    { label: "Execution", value: total("execution") },
    { label: "Complexity", value: total("complexity") },
    { label: "Ownership", value: total("ownership") },
  ];

  return (
    <div className="p-6 border rounded-2xl space-y-6">
      <h2 className="text-xl font-semibold text-secondary">Core Strengths</h2>

      {data.map((d) => (
        <ScoreBar key={d.label} label={d.label} value={d.value} size="md" height={3} />
      ))}
    </div>
  );
}
