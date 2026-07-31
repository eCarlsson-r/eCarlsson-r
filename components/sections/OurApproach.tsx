"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const STEP_KEYS = ["1", "2", "3", "4", "5", "6", "7"] as const;

/**
 * Seven steps as a connected sequence — the arrows matter, because the point is
 * that understanding comes before building. Every step carries a "why" written
 * as risk removed, not as a deliverable.
 */
export default function OurApproach() {
  const t = useTranslations("approach");

  return (
    <section id="approach" className="px-6 py-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">{t("intro")}</p>

        <ol className="mt-10">
          {STEP_KEYS.map((key, i) => (
            <motion.li
              key={key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="relative"
            >
              <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 md:p-6">
                <div className="flex items-baseline gap-4">
                  <span className="font-headline text-2xl font-bold text-primary/40 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold">{t(`steps.${key}.title`)}</h3>
                </div>
                <p className="mt-3 pl-0 md:pl-12 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{t("whyLabel")}: </span>
                  {t(`steps.${key}.why`)}
                </p>
              </div>

              {/* Connector — the sequence is the argument, so keep it visible. */}
              {i < STEP_KEYS.length - 1 && (
                <span
                  className="mx-auto block h-6 w-px bg-primary/30"
                  aria-hidden
                />
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
