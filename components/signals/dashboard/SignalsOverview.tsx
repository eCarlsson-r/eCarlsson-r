import { ProjectSignals } from "@/lib/signals/types";

interface Props {
  signals: ProjectSignals[];
}

export default function SignalsOverview({ signals }: Props) {
  const avg = (key: "execution" | "complexity" | "ownership") =>
    Math.round(
      signals.reduce((sum, s) => sum + s.scores[key], 0) / signals.length,
    );

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Stat title="Execution Strength" value={avg("execution")} />
      <Stat title="System Complexity" value={avg("complexity")} />
      <Stat title="Ownership Level" value={avg("ownership")} />
    </div>
  );
}

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div className="p-6 border rounded-2xl text-center">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold">{value}/100</p>
    </div>
  );
}
