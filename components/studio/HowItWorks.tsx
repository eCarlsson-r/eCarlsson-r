"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export default function HowItWorks() {
  const t = useTranslations("studio");

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <h2 className="text-2xl md:text-3xl font-semibold">{t("howItWorks.title")}</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[1,2,3,4].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i - 1) * 0.1 }}
            className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-6"
          >
            <span className="text-3xl font-headline font-bold text-primary/30">{t(`howItWorks.steps.${i}.number`)}</span>
            <h3 className="mt-3 text-lg font-semibold">{t(`howItWorks.steps.${i}.title`)}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t(`howItWorks.steps.${i}.body`)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
