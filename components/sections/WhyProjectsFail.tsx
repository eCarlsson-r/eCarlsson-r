"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { X, Check } from "lucide-react";

const ITEM_KEYS = ["1", "2", "3", "4"] as const;

/**
 * Educational, not promotional. Each row pairs a common failure with the thing
 * we do instead, so the reader can judge the reasoning rather than take a claim
 * on faith. Sits immediately before Our Approach, which is the long answer.
 */
export default function WhyProjectsFail() {
  const t = useTranslations("projectsFail");

  return (
    <section id="why-projects-fail" className="bg-gray-50 dark:bg-white/5 px-6 py-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">{t("intro")}</p>

        <div className="mt-10 hidden md:grid md:grid-cols-2 md:gap-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            {t("mistakesTitle")}
          </p>
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            {t("avoidTitle")}
          </p>
        </div>

        <ul className="mt-6 space-y-6">
          {ITEM_KEYS.map((key, i) => (
            <motion.li
              key={key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="grid gap-3 border-t border-gray-200 dark:border-white/10 pt-6 md:grid-cols-2 md:gap-8"
            >
              <div className="flex items-start gap-3">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500/80" aria-hidden />
                <span className="text-sm md:text-base font-medium">
                  {t(`items.${key}.mistake`)}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span className="text-sm md:text-base text-muted-foreground">
                  {t(`items.${key}.avoid`)}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
