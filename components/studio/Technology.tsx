"use client";

import { motion } from "motion/react";

const stacks = [
  { label: "Frontend", items: ["Next.js", "Nuxt", "Angular", "React", "Vue"] },
  { label: "Backend", items: ["Laravel", "ASP.NET Core", "FastAPI"] },
  { label: "Data", items: ["MySQL", "REST API"] },
  { label: "AI", items: ["Gemini", "IBM Granite", "Python ML"] },
  { label: "Deployment", items: ["Vercel", "Google Cloud Run", "Self-hosted"] },
];

export default function Technology() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <h2 className="text-2xl md:text-3xl font-semibold">Technology</h2>
      <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
        Proven, boring-in-a-good-way technology — chosen for reliability and long-term maintainability,
        not hype.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stacks.map((stack, i) => (
          <motion.div
            key={stack.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{stack.label}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {stack.items.map((item) => (
                <span key={item} className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/10">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
