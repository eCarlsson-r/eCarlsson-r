"use client";

import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

export default function WorkflowDiagram({ steps }: { steps: string[] }) {
  if (steps.length === 0) return null;

  return (
    <div className="my-8 flex flex-col items-center gap-2 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-6">
      {steps.map((step, i) => (
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
          className="flex flex-col items-center gap-2"
        >
          {i > 0 && <ArrowDown className="h-4 w-4 text-primary" />}
          <span className="rounded-full border border-gray-200 dark:border-white/15 bg-white dark:bg-zinc-900 px-5 py-2 text-sm font-medium text-center">
            {step}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
