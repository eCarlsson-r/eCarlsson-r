"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

const ITEM_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8"] as const;

/**
 * Recognition section — the visitor should see their own operation described
 * before any solution is offered. Deliberately sits above Solutions.
 */
export default function OperationalSymptoms() {
  const t = useTranslations("symptoms");

  return (
    <section id="symptoms" className="px-6 py-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">{t("intro")}</p>

        <ul className="mt-10 grid gap-x-8 gap-y-4 md:grid-cols-2">
          {ITEM_KEYS.map((key, i) => (
            <motion.li
              key={key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 border-b border-gray-200 dark:border-white/10 pb-4"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span className="text-sm md:text-base">{t(`items.${key}`)}</span>
            </motion.li>
          ))}
        </ul>

        <p className="mt-10 max-w-3xl text-base font-medium">{t("closing")}</p>
      </div>
    </section>
  );
}
