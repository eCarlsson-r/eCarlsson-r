"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Project, Repository } from "@/core/types";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import DomainBadge from "./DomainBadge";
import { useTranslations } from "next-intl";

export default function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
      setIsOpen(!isOpen);
  };
  const projectsDemo = project.repositories?.filter(p => p.url) ?? [];
  const openCaseStudy = () => router.push(`/projects/${project.slug}`);
  const t = useTranslations("project");

  // Card copy lives in the message catalogs so it reads as a business result in
  // both locales. Falls back to the data file for any project not yet written up.
  const copyKey = `copy.${project.slug}` as const;
  const description = t.has(`${copyKey}.description`)
    ? t(`${copyKey}.description`)
    : project.description;
  const outcome = t.has(`${copyKey}.outcome`)
    ? t(`${copyKey}.outcome`)
    : project.outcome;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      onClick={openCaseStudy}
      className="group relative flex flex-col rounded-2xl border border-gray-200 dark:border-white/10
                 bg-white/70 dark:bg-white/5 backdrop-blur-xl
                 p-6 shadow-sm hover:shadow-xl transition cursor-pointer"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
                      bg-linear-to-r from-primary/10 to-primary/5 blur-xl" />

      {project.slides && project.slides.length > 0 && (
        <div className="pb-4 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
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

      <h3 className="text-lg font-semibold mt-4 mb-2 relative z-10">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 relative z-10">
        {description}
      </p>

      {/* Outcome stat */}
      <p className="text-xs text-muted-foreground mb-4 relative z-10">
        {outcome}
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
        <Link href={`/projects/${project.slug}`} onClick={(e) => e.stopPropagation()} className="p-2 text-xs md:px-4 md:py-2 md:text-sm font-label tracking-tight rounded-lg border bg-primary text-on-primary relative z-10">{t("seeCaseStudy")}</Link>
        {projectsDemo.length == 1 && projectsDemo[0].url && (
          <Link href={projectsDemo[0].url} target="_blank" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1.5 p-2 text-xs md:px-4 md:py-2 md:text-sm font-label tracking-tight text-on-primary rounded-lg border bg-primary text-on-primary relative z-10">
            <ExternalLink className="h-3 w-3 md:w-4 md:h-4" />{t("liveDemo")}
          </Link>
        )}

        {projectsDemo.length > 1 && (
          <div className="flex justify-center">
            <div className="relative inline-block text-left">
                {/* Dropdown button */}
                <button
                    type="button"
                    className="inline-flex items-center gap-1.5 p-2 text-xs md:px-4 md:py-2 md:text-sm font-label tracking-tight rounded-lg border bg-primary text-on-primary relative z-10"
                    onClick={(e) => { e.stopPropagation(); toggleDropdown(); }}
                >
                  <ExternalLink className="h-3 w-3 md:w-4 md:h-4" />{t("liveDemo")}
                </button>

                {/* Dropdown menu */}
                {isOpen && (
                    <div className="origin-top-right absolute
                                    right-0 mt-2 w-48 rounded-md
                                    shadow-lg bg-white focus:outline-none ring-1 ring-black
                                    ring-opacity-5 z-20">
                        <div className={"grid grid-cols-"+projectsDemo.length}>
                            {projectsDemo.map((repo: Repository) => repo.url && (
                                <Link
                                  key={repo.url}
                                  href={repo.url}
                                  onClick={(e) => { e.stopPropagation(); toggleDropdown(); }}
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

      <Link href={`/start-a-project?industry=${encodeURIComponent(project.domain)}`} onClick={(e) => e.stopPropagation()} className="mt-auto inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-secondary transition relative z-10">{t("requestThis")}<ArrowRight className="h-3 w-3" /></Link>
    </motion.div>
  );
}
