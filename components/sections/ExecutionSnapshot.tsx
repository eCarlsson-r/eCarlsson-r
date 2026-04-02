import { getAllSignals } from "@/lib/signals/loadSignals";

export default function ExecutionSnapshot() {
  const signals = getAllSignals();

  const avg = (key: "execution" | "complexity" | "ownership") =>
    Math.round(
      signals.reduce((sum, s) => sum + s.scores[key], 0) / signals.length,
    );

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
      <Stat label="Execution Score" value={avg("execution")} tone="low" />
      <Stat label="System Complexity" value={avg("complexity")} tone="high" />
      <Stat label="Operational Ownership" value={avg("ownership")} tone="highest" />
    </section>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: 'low' | 'high' | 'highest' }) {
  const bgClass = {
    low: "bg-surface-container-low",
    high: "bg-surface-container-high",
    highest: "bg-surface-container-highest",
  }[tone];

  return (
    <div className={`${bgClass} p-10 flex flex-col items-center justify-center text-center rounded-md`}> 
      <span className="text-5xl font-headline font-bold text-primary mb-2">{value}</span>
      <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">{label}</span>
    </div>
  );
}
