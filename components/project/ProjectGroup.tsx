"use client";
import { Project } from "@/core/types";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { useProjectsWithSignals } from "@/lib/hooks/useProjectsWithSignals";

interface Props {
  title: string;
  projects: Project[];
}

export default function ProjectGroup({ title, projects }: Props) {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

      <div className="md:grid md:grid-cols-3 overflow-x-auto pt-8 gap-8 no-scrollbar snap-x">
        {useProjectsWithSignals(projects).map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl backdrop-blur hover:shadow-xl hover:-translate-y-1 transition"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-xl" />

              <ProjectCard key={project.slug} {...project} />
            </motion.div>
          ))}
      </div>
    </section>
  );
}
