"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Project, Repository } from "@/core/types";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

const domainColors: Record<string, string> = {
  "Retail": "bg-blue-600",
  "Property": "bg-teal-600",
  "AI · Professional Services": "bg-emerald-700",
  "Insurance": "bg-indigo-600",
  "Restaurant": "bg-orange-600",
  "Wellness · Spa": "bg-pink-600",
  "AI · Finance": "bg-violet-600",
  "HR · Payroll": "bg-sky-700",
  "SaaS": "bg-red-500",
};

function DomainBadge({ domain }: {domain: string}) {
  if (!domain) return null;

  return (
    <span className={`text-xs px-2 py-1 mb-5 rounded text-white ${domainColors[domain] ?? "bg-gray-600"}`}>
      {domain}
    </span>
  );
}

export default function ProjectCard({ project, action }: { project: Project; action: (project: Project) => void; }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
      setIsOpen(!isOpen);
  };
  const projectsDemo = project.repositories?.filter(p => p.url);
  const clickProject = () => {
    if (action) action(project);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      className="group relative rounded-2xl border border-gray-200 dark:border-white/10 
                 bg-white/70 dark:bg-white/5 backdrop-blur-xl 
                 p-6 shadow-sm hover:shadow-xl transition"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
                      bg-linear-to-r from-red-500/10 to-blue-500/10 blur-xl" />

      {project.slides && project.slides.length > 0 && (
        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
          {project.slides[0].type === "image" ? (
            <Image
              src={project.slides[0].src}
              alt={project.slides[0].alt || ""}
              width={150} height={50}
              loading="lazy"
              className="w-full transition duration-500"
            />
          ) : (
            <video
              src={project.slides[0].src}
              className="w-full object-fit"
              controls
            />
          )}
        </div>
      )}

      <DomainBadge domain={project.domain} />

      <h3 className="text-lg font-semibold mb-2 relative z-10">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 relative z-10">
        {project.summary}
      </p>

      {/* 🔥 TECH STACK */}
      <div className="flex flex-wrap gap-2 mb-3">
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

      {/* 🔥 LINKS */}
      <div className="flex flex-wrap gap-3 my-3">
        {/* CTA */}
        <button onClick={clickProject} className="p-2 text-xs md:px-4 md:py-2 md:text-sm font-label tracking-tight rounded-lg border bg-primary text-on-primary relative z-10">
          See Case Study
        </button>
        {projectsDemo.length == 1 && projectsDemo[0].url && (
          <Link href={projectsDemo[0].url} target="_blank" className="inline-flex items-center gap-1.5 p-2 text-xs md:px-4 md:py-2 md:text-sm font-label tracking-tight text-on-primary rounded-lg border bg-primary text-on-primary relative z-10">
            <ExternalLink className="h-3 w-3 md:w-4 md:h-4" />Live Demo
          </Link>
        )}

        {projectsDemo.length > 1 && (
          <div className="flex justify-center">
            <div className="relative inline-block text-left">
                {/* Dropdown button */}
                <button
                    type="button"
                    className="inline-flex items-center gap-1.5 p-2 text-xs md:px-4 md:py-2 md:text-sm font-label tracking-tight rounded-lg border bg-primary text-on-primary relative z-10"
                    onClick={toggleDropdown}
                >
                    <ExternalLink className="h-3 w-3 md:w-4 md:h-4" />Live Demo
                </button>

                {/* Dropdown menu */}
                {isOpen && (
                    <div className="origin-top-right absolute
                                    right-0 mt-2 w-48 rounded-md
                                    shadow-lg bg-white focus:outline-none ring-1 ring-black
                                    ring-opacity-5">
                        <div className={"grid grid-cols-"+projectsDemo.length}>
                            {projectsDemo.map((repo: Repository) => repo.url && (
                                <Link
                                  key={repo.url}
                                  href={repo.url}
                                  onClick={toggleDropdown}
                                  target="_blank"
                                  className="p-2 text-xs md:px-4 md:py-2 md:text-sm text-center text-black hover:bg-gray-100"
                                >
                                  {repo.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
        )}
      </div>
    </motion.div>
  );
}