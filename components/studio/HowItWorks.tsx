"use client";

import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    body: "You tell us what you want to build, your industry, and the problems slowing your team down — through the Start a Project flow or a direct conversation.",
  },
  {
    number: "02",
    title: "Foundation Match",
    body: "We map your needs to one of our production-tested foundations — the closest system that already solves most of your workflow.",
  },
  {
    number: "03",
    title: "Customization",
    body: "The foundation is adapted to your operations: your workflows, your rules, your integrations. Nothing generic survives.",
  },
  {
    number: "04",
    title: "Delivery & Support",
    body: "We deploy to production, train your team, and stay accountable for keeping the system running.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <h2 className="text-2xl md:text-3xl font-semibold">How Carlsson Studio Works</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-6"
          >
            <span className="text-3xl font-headline font-bold text-primary/30">{step.number}</span>
            <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
