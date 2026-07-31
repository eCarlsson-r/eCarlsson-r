"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const ITEM_KEYS = ["1", "2", "3", "4", "5", "6", "7"] as const;

/**
 * Highlighted band naming where our experience is deepest. Phrased as
 * strongest experience, not exclusivity — the intro copy says so explicitly,
 * so the list must never read as a filter on who we work with.
 */
export default function Industries() {
  const t = useTranslations("industries");

  return (
    <section
      id="industries"
      className="border-y border-primary/20 bg-primary/5 px-6 py-12 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-primary">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">{t("intro")}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          {ITEM_KEYS.map((key, i) => (
            <motion.span
              key={key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-full border border-primary/30 bg-white dark:bg-white/5 px-5 py-2.5 text-sm md:text-base font-medium"
            >
              {t(`items.${key}`)}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
