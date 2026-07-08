"use client";
import { projects } from "@/data/projects";
import { domainAccents } from "@/data/brandAccents";
import ProjectGroup from "../project/ProjectGroup";
import { ProjectDomain } from "@/core/types";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

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
  return (
    <div className="flex flex-col col-span-full justify-center rounded-2xl border border-dashed border-primary/40 bg-card/50 p-6 text-center">
      <h3 className="text-lg font-semibold">Don&apos;t see your industry?</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        We build custom systems for any business domain.
      </p>
      <Link
        href="/start"
        className="mt-4 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-primary hover:text-secondary transition"
      >
        Let&apos;s talk about your project<ArrowRight className="h-4 w-4" />
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
      <span className="text-xs font-semibold uppercase tracking-widest text-primary">Solutions</span>
      <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Production-ready systems across business domains.</h2>
      <p className="mt-4 text-muted-foreground">
        Every project represents a real business workflow, designed from the database to deployment.
        These are production systems — not UI concepts or tutorial applications.
      </p>

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
