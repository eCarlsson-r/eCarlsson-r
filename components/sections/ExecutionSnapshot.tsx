import { getAllSignals } from "@/lib/signals/loadSignals";

export default function ExecutionSnapshot() {
  const signals = getAllSignals();

  const avg = (key: "execution" | "complexity" | "ownership") =>
    Math.round(
      signals.reduce((sum, s) => sum + s.scores[key], 0) / signals.length,
    );

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 mt-10">
      <Stat label="Execution" value={avg("execution")} />
      <Stat label="Complexity" value={avg("complexity")} />
      <Stat label="Ownership" value={avg("ownership")} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
