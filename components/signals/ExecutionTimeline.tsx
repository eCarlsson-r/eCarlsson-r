import { getAllSignals } from "@/lib/signals/loadSignals";
import { projects } from "@/data/projects";

export default function ExecutionTimeline() {
  const signals = getAllSignals();

  return (
    <section className="max-w-6xl mx-auto p-8 md:py-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary tracking-tight">
          Execution Timeline
        </h2>
        <span className="font-label text-xs uppercase tracking-[0.2em] text-tertiary">
          {signals.length} Signals Tracked
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {signals.map((s) => {
          return (
            <article
              key={s.id}
              className="bg-surface-container-low p-6 rounded-md border border-transparent hover:border-primary transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-headline font-bold text-primary mb-2">
                    {projects.find((p) => p.slug === s.id)?.title || s.id}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs leading-relaxed max-w-2xl">
                    <span className="px-3 py-1 bg-surface-container-highest text-tertiary rounded-md">{s.summary.complexityLevel} Complexity</span>
                    <span className="px-3 py-1 bg-surface-container-highest text-tertiary rounded-md">{s.summary.executionLevel} Execution</span>
                    <span className="px-3 py-1 bg-surface-container-highest text-tertiary rounded-md">{s.summary.ownershipLevel} Ownership</span>
                  </div>
                </div>
                <div className="md:flex justify-end text-right gap-8">
                  <div>
                    <span className="block text-4xl font-headline font-black text-primary mb-1">
                      {s.scores.execution}
                    </span>
                    <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">
                      Execution Score
                    </span>
                  </div>
                  <div>
                    <span className="block text-4xl font-headline font-black text-primary mb-1">
                      {s.scores.complexity}
                    </span>
                    <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">
                      Complexity Score
                    </span>
                  </div>
                  <div>
                    <span className="block text-4xl font-headline font-black text-primary mb-1">
                      {s.scores.ownership}
                    </span>
                    <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">
                      Ownership Score
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
