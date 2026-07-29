"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export default function Technology() {
  const t = useTranslations("studio");
  const stacks = Object.entries(t("technology.stacks") as Record<string, string[]>);

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <h2 className="text-2xl md:text-3xl font-semibold">{t("technology.title")}</h2>
      <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{t("technology.description")}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stacks.map(([label, items], i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(items as string[]).map((item) => (
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
