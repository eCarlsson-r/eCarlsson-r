"use client";

import { motion } from "motion/react";

const stages = [
  { label: "Week 0", title: "Discovery & requirements", body: "Understand the business, the workflows, and what success looks like." },
  { label: "Weeks 1–2", title: "Foundation setup & data model", body: "Stand up the matched foundation and shape the domain model around your data." },
  { label: "Weeks 3–6", title: "Custom modules & integrations", body: "Build what makes your operation unique — workflows, integrations, AI features." },
  { label: "Week 7", title: "Testing & training", body: "Real data, real users, real scenarios. Your team learns the system before launch." },
  { label: "Week 8", title: "Deployment & handover", body: "Production deployment, documentation, and source code handover." },
  { label: "Ongoing", title: "Maintenance & support", body: "The system keeps running — and keeps evolving as the business grows." },
];

export default function Process() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <h2 className="text-2xl md:text-3xl font-semibold">Development Process</h2>
      <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
        A typical foundation-based project. Timelines shift with scope, but the shape stays the same.
      </p>
      <ol className="relative mt-8 ml-3 border-l border-gray-200 dark:border-white/10">
        {stages.map((stage, i) => (
          <motion.li
            key={stage.label}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="mb-8 ml-6 last:mb-0"
          >
            <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-white dark:border-zinc-900 bg-primary" />
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{stage.label}</p>
            <p className="mt-1 text-sm font-semibold">{stage.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stage.body}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
