"use client";
import { projects } from "@/data/projects";
import { domainAccents } from "@/data/brandAccents";
import ProjectGroup from "../project/ProjectGroup";
import { ProjectDomain } from "@/core/types";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const domains: ProjectDomain[] = [
  "Retail",
  "Restaurant",
  "Property",
  "Insurance",
  "Wellness",
  "HR & Payroll",
  "AI",
];

type Tab = "All" | ProjectDomain;

function MetaCard() {
  const t = useTranslations("featuredSolutions");
  return (
    <div className="flex flex-col col-span-full justify-center rounded-2xl border border-dashed border-primary/40 bg-card/50 p-6 text-center">
      <h3 className="text-lg font-semibold">{t("noIndustry")}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{t("weBuild")}</p>
      <Link
        href="/start-a-project"
        className="mt-4 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-primary hover:text-secondary transition"
      >
        {t("talkProject")}<ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

export default function FeaturedProjects() {
  const [activeTab, setActiveTab] = useState<Tab>("All");

  const filtered = activeTab === "All"
    ? projects
    : projects.filter((p) => p.domain === activeTab);

  return (
    <section id="solutions" className="max-w-7xl mx-auto px-6 py-12 xl:py-24">
      <span className="text-xs font-semibold uppercase tracking-widest text-primary">{t("subtitle")}</span>
      <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">{t("title")}</h2>
      <p className="mt-4 text-muted-foreground">{t("description")}</p>

      {/* Industry tabs — active domain tab takes its foundation's accent */}
      <div className="mt-8 flex flex-wrap gap-2">
        {(["All", ...domains] as Tab[]).map((tab) => {
          const isActive = activeTab === tab;
          const accent = tab !== "All" ? domainAccents[tab] : undefined;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={isActive && accent ? { backgroundColor: accent } : undefined}
              className={`rounded-full px-4 py-1.5 text-sm font-label transition ${
                isActive
                  ? tab === "All" ? "bg-primary text-on-primary" : "text-white"
                  : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <ProjectGroup
        title=""
        projects={filtered}
        footerCard={activeTab === "All" ? <MetaCard /> : undefined}
      />
    </section>
  );
}
