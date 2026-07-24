"use client";

import { ArrowRight, MessageSquare } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ribbonAccents } from "@/data/brandAccents";

const heroWash = `linear-gradient(105deg, ${ribbonAccents.map((c) => `${c}33`).join(", ")})`;

export default function Hero() {
  const t = useTranslations("hero");
  return (
    <section
      id="hero"
      className="relative w-full mx-auto px-6 pt-24 pb-28 text-center overflow-hidden"
      style={{ background: heroWash }}
    >
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs font-medium text-muted-foreground">
        <span className="h-2 w-2 rounded-full bg-primary"></span>{t("badge")}
      </div>
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-headline font-bold leading-tight text-primary mb-6 mx-auto max-w-6xl"
        >
          {t.rich("headline", {
            highlight: (chunks) => <span className="text-tertiary">{chunks}</span>,
          })}
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-on-surface-variant leading-relaxed max-w-5xl mx-auto mb-8"
        >
          <p>{t("subhead")}</p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4 flex-wrap mt-10"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-label bg-primary text-on-primary transition-opacity duration-200"
          >
            {t("seeSolutions")}<ArrowRight />
          </Link>

          <Link
            href="/start-a-project"
            className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-label border border-primary hover:border-secondary transition-opacity duration-200"
          >
            <MessageSquare />{t("startProject")}
          </Link>
        </motion.div>

        {/* Carlsson Studio ribbon — one segment per foundation, closing the hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="absolute bottom-0 inset-x-0 flex h-1.5"
          aria-hidden
        >
          {ribbonAccents.map((color) => (
            <div key={color} className="flex-1" style={{ backgroundColor: color }} />
          ))}
        </motion.div>
    </section>
  );
}
