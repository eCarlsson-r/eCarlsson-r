"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const CONDITION_KEYS = ["1", "2", "3", "4"] as const;

/**
 * Trust section. It exists to say plainly that custom software is often the
 * wrong answer — the qualifying conditions below are the only cases where we
 * think it isn't. Sits before Solutions so the proof that follows reads as
 * evidence rather than a pitch.
 */
export default function WhyCustomSoftware() {
  const t = useTranslations("whyCustom");

  return (
    <section id="why-custom" className="px-6 py-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">{t("intro")}</p>

        <p className="mt-10 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {t("conditionsTitle")}
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {CONDITION_KEYS.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="border-l-2 border-primary/40 pl-5"
            >
              <h3 className="text-lg font-semibold">{t(`conditions.${key}.title`)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(`conditions.${key}.body`)}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8">
          <p className="text-lg md:text-xl font-headline font-semibold">{t("closing1")}</p>
          <p className="text-lg md:text-xl font-headline font-semibold text-primary">
            {t("closing2")}
          </p>
        </div>
      </div>
    </section>
  );
}
