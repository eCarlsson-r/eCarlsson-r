"use client";

import { motion } from "motion/react";

export default function Mission() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-16 pb-8 md:pt-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Studio</span>
        <h1 className="mt-3 text-4xl md:text-5xl font-headline font-bold tracking-tight text-primary max-w-4xl">
          Software should fit the business — not the other way around.
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
          Carlsson Studio builds custom business systems for founders and operators who have outgrown
          spreadsheets, disconnected tools, and manual workflows. Every system starts from how your
          team actually works — and ships production-ready, end-to-end, with one person accountable
          for the whole stack.
        </p>
      </motion.div>
    </section>
  );
}
