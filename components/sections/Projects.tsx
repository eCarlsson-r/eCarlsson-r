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
    <section id="projects" className="max-w-6xl mx-auto px-6 py-12 md:py-24">
      <ProjectGroup 
        title="Real systems running real businesses." 
        subtitle="Selected Work" 
        description="Each project below is a custom system I designed, built and shipped end-to-end for a founder or operator. Click any card for the full case study."
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
