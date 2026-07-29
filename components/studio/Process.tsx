"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export default function Process() {
  const t = useTranslations("studio");
  const stages = [1,2,3,4,5,6].map((i) => ({
    ...{
      label: t(`process.stages.${i}.label`),
      title: t(`process.stages.${i}.title`),
      body: t(`process.stages.${i}.body`),
    },
  }));

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <h2 className="text-2xl md:text-3xl font-semibold">{t("process.title")}</h2>
      <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{t("process.intro")}</p>
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
