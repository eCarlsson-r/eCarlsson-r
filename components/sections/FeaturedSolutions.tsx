"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import ProjectGroup from "../project/ProjectGroup";

export default function FeaturedSolutions() {
  return (
    <section id="solutions" className="max-w-7xl mx-auto px-6 py-12 xl:py-24">
      <ProjectGroup
        subtitle="Solutions"
        title="Production-ready systems across business domains."
        description="Every project represents a real business workflow, designed from the database to deployment. These are production systems — not UI concepts or tutorial applications."
        projects={projects.filter((p) => p.featured)}
      />

      <div className="mt-10 flex justify-center">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-label bg-primary text-on-primary hover:opacity-80 transition-opacity"
        >
          View All Solutions<ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
