"use client";
import { Project } from "@/core/types";
import { motion } from "motion/react";
import ProjectCard from "./ProjectCard";
import { ReactNode } from "react";

interface Props {
  className?: string;
  title: string;
  subtitle?: string;
  description?: string;
  projects: Project[];
  footerCard?: ReactNode;
}

export default function ProjectGroup({ className, title, subtitle, description, projects, footerCard }: Props) {
  return (
    <section className={className}>
      {subtitle && <span className="text-xs font-semibold uppercase tracking-widest text-primary">{subtitle}</span>}
      {title && <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>}
      {description && <p className="mt-4 text-muted-foreground">{description}</p>}

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
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-linear-to-r from-primary/10 to-primary/5 blur-xl" />

              <ProjectCard project={project} />
            </motion.div>
          ))}
        {footerCard}
      </div>
    </section>
  );
}
