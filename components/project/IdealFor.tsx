"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";

export default function IdealFor({ items }: { items: string[] }) {
  if (items.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-semibold mt-12 mb-2">Is this suitable for your business?</h2>
      <p className="mb-6 text-sm text-muted-foreground">This foundation is ideal for:</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 px-4 py-3"
          >
            <Check className="h-4 w-4 shrink-0 text-primary" />
            <span className="text-sm font-medium">{item}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
