"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export default function StartProjectCTA() {
  return (
    <section className="border-t border-border px-6 py-16 md:py-24 text-center bg-gray-50 dark:bg-white/5">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl"
      >
        <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-primary">
          Start With a Proven Foundation.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          We don&apos;t start every project from scratch.
        </p>
        <p className="text-lg text-muted-foreground">
          We start from battle-tested business systems — then customize them for your operations.
        </p>
        <Link
          href="/start"
          className="mt-8 inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-label bg-primary text-on-primary transition-opacity duration-200 hover:opacity-80"
        >
          Start a Project<ArrowRight />
        </Link>
      </motion.div>
    </section>
  );
}
