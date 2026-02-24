import { getAllSignals } from "@/lib/signals/loadSignals";

export default function ExecutionTimeline() {
  const signals = getAllSignals();

  return (
    <section className="max-w-6xl mx-auto py-20">
      <h2 className="text-2xl font-semibold mb-8">Execution Timeline</h2>

      <div className="space-y-6">
        {signals.map((s) => (
          <div key={s.id} className="flex items-center gap-4">
            <div className="w-4 h-4 bg-blue-600 rounded-full" />
            <div>
              <p className="font-medium">{s.id}</p>
              <p className="text-sm text-gray-500">
                Execution Score: {s.scores.execution}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
