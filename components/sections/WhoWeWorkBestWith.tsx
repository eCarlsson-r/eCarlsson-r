"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Check, Minus } from "lucide-react";

const GOOD_KEYS = ["1", "2", "3", "4", "5"] as const;
const BAD_KEYS = ["1", "2", "3"] as const;

/**
 * Qualification, not industries — Industries says where our experience is
 * deepest, this says where we are actually useful. The "not a fit" column is
 * the point of the section; keep it as prominent as the other one.
 */
export default function WhoWeWorkBestWith() {
  const t = useTranslations("fit");

  return (
    <section id="fit" className="px-6 py-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">{t("intro")}</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8"
          >
            <h3 className="text-base font-semibold">{t("goodTitle")}</h3>
            <ul className="mt-5 space-y-3">
              {GOOD_KEYS.map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span className="text-sm md:text-base">{t(`good.${key}`)}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-6 md:p-8"
          >
            <h3 className="text-base font-semibold">{t("badTitle")}</h3>
            <ul className="mt-5 space-y-3">
              {BAD_KEYS.map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <Minus className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                  <span className="text-sm md:text-base text-muted-foreground">
                    {t(`bad.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <p className="mt-8 max-w-3xl text-base font-medium">{t("closing")}</p>
      </div>
    </section>
  );
}
