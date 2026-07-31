"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function StartProjectCTA() {
  const t = useTranslations("startCta");
  return (
    <section className="border-t border-border px-6 py-16 md:py-24 text-center bg-gray-50 dark:bg-white/5">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl"
      >
        <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-primary">
          {t("title")}
        </h2>
        {/* line1 lowers the commitment, line2 explains what the conversation is for. */}
        <p className="mt-4 text-lg font-medium">
          {t("line1")}
        </p>
        <p className="mt-2 text-lg text-muted-foreground">
          {t("line2")}
        </p>
        <Link
          href="/start-a-project"
          className="mt-8 inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-label bg-primary text-on-primary transition-opacity duration-200 hover:opacity-80"
        >
          {t("button")}<ArrowRight />
        </Link>
      </motion.div>
    </section>
  );
}
