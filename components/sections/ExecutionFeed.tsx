import { getAllSignals } from "@/lib/signals/loadSignals";

export default function ExecutionFeed() {
  const signals = getAllSignals();

  return (
    <section className="max-w-6xl mx-auto py-20">
      <h2 className="text-2xl font-semibold mb-8">Execution Feed</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {signals.map((s) => (
          <div key={s.id} className="p-6 border rounded-xl">
            <h3 className="font-semibold mb-2">{s.id}</h3>
            <p className="text-sm">Execution: {s.scores.execution}</p>
            <p className="text-sm">Complexity: {s.scores.complexity}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
