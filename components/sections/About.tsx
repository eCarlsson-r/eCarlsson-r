"use client";

import { Layers, Target, Workflow } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("about");
  const pillars = [
    { icon: Target, title: t("pillar1Title"), body: t("pillar1Body") },
    { icon: Layers, title: t("pillar2Title"), body: t("pillar2Body") },
    { icon: Workflow, title: t("pillar3Title"), body: t("pillar3Body") },
  ];

  return (
    <section id="studio" className="bg-gray-50 dark:bg-white/5 mx-auto px-6 py-12 md:py-24">
      <div className="max-w-6xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">{t("subtitle")}</span>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">{t("title")}</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-6"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <pillar.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{pillar.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{pillar.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
