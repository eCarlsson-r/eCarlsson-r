"use client";

import Link from "next/link";
import SignalBadge from "./SignalBadge";
import { motion } from "motion/react";
import { Project, Repository } from "@/core/types";

export default function ProjectHeader({project}: {project: Project}) {
  return (
    <div className="mb-12">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold mb-4"
      >
        {project.title}
      </motion.h1>

      {/* Summary */}
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">
        {project.summary}
      </p>

      {/* 🔥 SIGNALS */}
      {project.signals && (
        <div className="flex flex-wrap gap-3 mb-6">
          <SignalBadge label="Execution" value={project.signals.summary.executionLevel} />
          <SignalBadge label="Complexity" value={project.signals.summary.complexityLevel} />
          <SignalBadge label="Ownership" value={project.signals.summary.ownershipLevel} />
        </div>
      )}

      {/* 🔥 LINKS */}
      <div className="flex flex-wrap gap-3 mb-6">
        {project.repositories?.map((repo: Repository) => repo.url && (
          <Link
            key={repo.url}
            href={repo.url}
            target="_blank"
            className="px-4 py-2 text-sm rounded-lg border 
                       hover:bg-gray-100 dark:hover:bg-white/10 transition"
          >
            {repo.name}
          </Link>
        ))}
      </div>

      {/* 🔥 TECH STACK */}
      <div className="flex flex-wrap gap-2">
        {[...(project.backend || []), ...(project.frontend || [])].map(
          (tech: string) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 rounded-full 
                         bg-gray-100 dark:bg-white/10"
            >
              {tech}
            </span>
          )
        )}
      </div>
    </div>
  );
}