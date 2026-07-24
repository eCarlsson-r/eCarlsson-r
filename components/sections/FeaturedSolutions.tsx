"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { projects } from "@/data/projects";
import ProjectGroup from "../project/ProjectGroup";

export default function FeaturedSolutions() {
  const t = useTranslations("featuredSolutions");
  return (
    <section id="solutions" className="max-w-7xl mx-auto px-6 py-12 xl:py-24">
      <ProjectGroup
        subtitle={t("subtitle")}
        title={t("title")}
        description={t("description")}
        projects={projects.filter((p) => p.featured)}
      />

      <div className="mt-10 flex justify-center">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-label bg-primary text-on-primary hover:opacity-80 transition-opacity"
        >
          {t("viewAll")}<ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
