"use client";

import ProjectCard from "@/components/project/ProjectCard";
import { useProjectsWithSignals } from "@/lib/hooks/useProjectsWithSignals";
import { useMemo } from "react";

export default function TopProjectsLeaderboard({ projects }: any) {
  projects = useProjectsWithSignals(projects);
  const ranked = useMemo(() => {
    return [...projects]
      .filter(p => p.signals)
      .sort((a, b) => b.signals.scores.execution - a.signals.scores.execution)
      .slice(0, 5);
  }, [projects]);

  return (
    <section>
      <h2 className="text-2xl font-semibold text-center text-primary mb-10">
        Top Projects by Execution
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {ranked.map((p, i) => (
          <ProjectCard key={p.id} {...p} title={(i+1) + ". " + p.title} />
        ))}
      </div>
    </section>
  );
}