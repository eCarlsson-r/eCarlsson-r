"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { domainAccents } from "@/data/brandAccents";

const foundations = [
  { domain: "HR & Payroll", systems: [{ name: "Payroll Agent", slug: "payroll-system" }] },
  { domain: "Restaurant", systems: [{ name: "RestoSystem", slug: "restaurant-ecosystem" }] },
  { domain: "Retail", systems: [{ name: "CommerceSystem", slug: "commerce-ecosystem" }] },
  { domain: "Property", systems: [{ name: "UrusProperti", slug: "property-management" }] },
  { domain: "Wellness", systems: [{ name: "SpaSystem", slug: "spa-ecosystem" }] },
  { domain: "Insurance", systems: [{ name: "InsurancePortal", slug: "insurance-portal" }] },
  {
    domain: "AI",
    systems: [
      { name: "QuotePlot Agent", slug: "quoteplot-agent" },
      { name: "HumanDesign", slug: "human-design" },
    ],
  },
];

export default function ProvenFoundation() {
  return (
    <section id="foundation" className="px-6 py-12 md:py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Start from proven software — not a blank page.
        </h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          Instead of spending months rebuilding common business features, Carlsson Studio begins
          from production-tested systems that are then adapted to your workflow.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {foundations.map((item, i) => (
            <motion.div
              key={item.domain}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-5 py-4"
            >
              <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: domainAccents[item.domain as keyof typeof domainAccents] }}
                  aria-hidden
                />
                {item.domain}
              </span>
              <span className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1">
                {item.systems.map((system) => (
                  <Link
                    key={system.slug}
                    href={`/projects/${system.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-secondary transition"
                  >
                    {system.name}<ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
