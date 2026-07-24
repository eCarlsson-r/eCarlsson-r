"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { FoundationGroup } from "@/data/caseStudies";

export default function FoundationCoverage({ groups }: { groups: FoundationGroup[] }) {
  if (groups.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-semibold mt-12 mb-2">Foundation Coverage</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Reusable modules from the Carlsson Studio foundation, combined with logic built for this domain.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {groups.map((group, i) => (
          <motion.div
            key={group.group}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-2xl border p-5 ${
              i === 0
                ? "border-primary/40 bg-primary/5"
                : "border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {group.group}
            </p>
            <ul className="mt-3 space-y-3">
              {group.modules.map((module) => {
                const isRich = typeof module !== "string";
                const name = isRich ? module.name : module;
                return (
                  <li key={name} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                    <span>
                      <span className="font-medium">{name}</span>
                      {isRich && (
                        <span className="block text-xs text-muted-foreground mt-0.5">
                          {module.description}
                          {module.portability === "high" && " — highly portable"}
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
