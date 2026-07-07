"use client";

import { motion } from "motion/react";
import { Feature } from "@/data/caseStudies";

export default function FeatureCards({ features }: { features: Feature[] }) {
  if (features.length === 0) return null;

  return (
    <div className="my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, i) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-5"
        >
          <span className="text-2xl" aria-hidden>{feature.emoji}</span>
          <h3 className="mt-3 text-base font-semibold">{feature.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
