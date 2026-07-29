"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export default function Mission() {
  const t = useTranslations("studio");
  return (
    <section className="mx-auto max-w-6xl px-6 pt-16 pb-8 md:pt-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">{t("mission.eyebrow")}</span>
        <h1 className="mt-3 text-4xl md:text-5xl font-headline font-bold tracking-tight text-primary max-w-4xl">
          {t("mission.headline")}
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">{t("mission.body")}</p>
      </motion.div>
    </section>
  );
}
