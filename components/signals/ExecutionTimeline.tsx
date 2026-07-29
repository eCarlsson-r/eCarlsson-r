import { Project } from "@/core/types";
import { loadProjects } from "@/lib/signals/loadProjectSignals";
import { getAllSignals } from "@/lib/signals/loadSignals";
import { getTranslations } from "next-intl/server";

export default async function ExecutionTimeline() {
  const projects = await loadProjects();
  const signals = await getAllSignals();
  const t = await getTranslations("signals");

  return (
    <section className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between px-8 lg:px-0 my-6 gap-4">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary tracking-tight">{t("timeline.title")}</h2>
        <span className="font-label text-xs uppercase tracking-[0.2em] text-tertiary">{t("timeline.signalsTracked", { count: signals.length })}</span>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {signals.map((s) => {
          return (
            <article
              key={s.id}
              className=" bg-blur bg-linear-to-r from-red-500/10 to-blue-500/10 p-6 rounded-md border border-transparent hover:border-primary transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-headline font-bold text-primary mb-2">
                    {projects.find((p: Project) => p.slug === s.id)?.title || s.id}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs leading-relaxed max-w-2xl">
                    <span className="px-3 py-1 bg-surface-container-highest text-tertiary rounded-md">{s.summary.complexityLevel} {t("timeline.complexityLabel")}</span>
                    <span className="px-3 py-1 bg-surface-container-highest text-tertiary rounded-md">{s.summary.executionLevel} {t("timeline.executionLabel")}</span>
                    <span className="px-3 py-1 bg-surface-container-highest text-tertiary rounded-md">{s.summary.ownershipLevel} {t("timeline.ownershipLabel")}</span>
                  </div>
                </div>
                <div className="md:flex justify-end text-right gap-8">
                  <div>
                    <span className="block text-4xl font-headline font-black text-primary mb-1">
                      {s.scores.execution}
                    </span>
                    <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">{t("timeline.executionScoreLabel")}</span>
                  </div>
                  <div>
                    <span className="block text-4xl font-headline font-black text-primary mb-1">
                      {s.scores.complexity}
                    </span>
                    <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">{t("timeline.complexityScoreLabel")}</span>
                  </div>
                  <div>
                    <span className="block text-4xl font-headline font-black text-primary mb-1">
                      {s.scores.ownership}
                    </span>
                    <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary">{t("timeline.ownershipScoreLabel")}</span>
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
