"use client";

import { motion } from "motion/react";
import { Square } from "lucide-react";
import { useTranslations } from "next-intl";

export default function FutureExtensions({ extensions }: { extensions: string[] }) {
  const t = useTranslations("project");
  if (extensions.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-semibold mt-12 mb-4">{t("futureExtensions.title")}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {extensions.map((extension, i) => (
          <motion.div
            key={extension}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 rounded-xl border border-dashed border-gray-300 dark:border-white/15 px-4 py-3"
          >
            <Square className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="text-sm font-medium">{extension}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
