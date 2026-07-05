"use client";
import { projects } from "@/data/projects";
import ProjectGroup from "../project/ProjectGroup";
import { Project } from "@/core/types";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function FeaturedProjects() {
  const [showProjects, setShowProjects] = useState(false);

  const showFullProject = function() {
    if (!showProjects) setShowProjects(true);
  }
  return (
    <section id="solutions" className="max-w-6xl mx-auto px-6 py-12 md:py-24">
      <ProjectGroup
        title="Production-ready systems across 9 business domains."
        subtitle="Solutions"
        description="Every system below is live, real, and built end-to-end. Each one is a foundation — not a portfolio piece."
        projects={(showProjects) ? projects : projects.filter((p: Project) => p.featured)}
      />

      {!showProjects && (<div className="flex w-full mt-10 justify-center"><button onClick={showFullProject}
        className="group inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-label bg-primary text-on-primary transition-opacity duration-200"
      >
        Load More Projects<ArrowUpRight />
      </button></div>)}
    </section>
  );
}
