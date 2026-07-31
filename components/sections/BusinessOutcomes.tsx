"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import {
  BarChart3,
  Database,
  Eye,
  Layers,
  MinusCircle,
  UserMinus,
} from "lucide-react";

// Icons pair with the six outcome keys in messages/*.json. Each card states a
// business result — no implementation detail.
const CARDS = [
  { key: "1", icon: MinusCircle },
  { key: "2", icon: Layers },
  { key: "3", icon: Eye },
  { key: "4", icon: UserMinus },
  { key: "5", icon: Database },
  { key: "6", icon: BarChart3 },
] as const;

export default function BusinessOutcomes() {
  const t = useTranslations("outcomes");

  return (
    <section id="outcomes" className="bg-gray-50 dark:bg-white/5 px-6 py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">{t("intro")}</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CARDS.map(({ key, icon: Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-6"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{t(`items.${key}.title`)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t(`items.${key}.body`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
