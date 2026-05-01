"use client";
import { Project } from "@/core/types";
import { motion } from "motion/react";
import ProjectCard from "./ProjectCard";
import { useState } from "react";
import ProjectClient from "../project/ProjectClient";
import { X } from "lucide-react";

interface Props {
  className?: string;
  title: string;
  subtitle?: string;
  description?: string;
  projects: Project[];
}

function ProjectModal({project, hideModal}: {project: Project | undefined, hideModal: ()=>void;}) {
  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center overflow-y-auto bg-background/80 backdrop-blur-sm p-4 md:p-8">
      <div className="relative w-full max-w-3xl rounded-2xl border border-border bg-card shadow-2xl fade-in-up">
        <button aria-label="Close" onClick={hideModal} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-md border border-border bg-background-elevated text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
        <ProjectClient project={project} close={hideModal} />
      </div>
    </div>
  )
}

export default function ProjectGroup({ className, title, subtitle, description, projects }: Props) {
  const [showingProject, setShowingProject] = useState<Project>();
  const openProjectModal = (project: Project) => {
    setShowingProject(project);
  }

  const closeProjectModal = () => {
    setShowingProject(undefined);
  }
  return (
    <section className={className}>
      <span className="text-xs font-semibold uppercase tracking-widest text-primary">{subtitle}</span>
      <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      <p className="mt-4 text-muted-foreground">{description}</p>

      <div className="grid md:grid-cols-3 pt-8 gap-8 no-scrollbar snap-x">
        {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl backdrop-blur hover:shadow-xl hover:-translate-y-1 transition"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-linear-to-r from-purple-500/10 to-blue-500/10 blur-xl" />

              <ProjectCard project={project} action={openProjectModal} />
            </motion.div>
          ))}
      </div>

      {showingProject && <ProjectModal project={showingProject} hideModal={closeProjectModal} />}
    </section>
  );
}
