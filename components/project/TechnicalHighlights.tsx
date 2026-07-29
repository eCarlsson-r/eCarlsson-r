"use client";

import { motion } from "motion/react";
import { Highlight } from "@/data/caseStudies";
import { useTranslations } from "next-intl";

export default function TechnicalHighlights({ highlights }: { highlights: Highlight[] }) {
  const t = useTranslations("project");
  if (highlights.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-semibold mt-12 mb-4">{t("technicalHighlights.title")}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((highlight, i) => (
          <motion.div
            key={highlight.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {highlight.label}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {highlight.items.map((item) => (
                <span key={item} className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/10">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
