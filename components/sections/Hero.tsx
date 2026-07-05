"use client";

import { ArrowRight, MessageSquare } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" className="w-full mx-auto px-6 py-24 text-center bg-linear-to-b md:bg-linear-to-r from-sky-500/30 via-yellow-800/30 to-red-500/30">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs font-medium text-muted-foreground">
        <span className="h-2 w-2 rounded-full bg-primary"></span>Available for new projects
      </div>
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-headline font-bold leading-tight text-primary mb-6 mx-auto max-w-6xl"
        >
          <span className="text-tertiary">Business Software</span> Built Around Your Operations.
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-on-surface-variant leading-relaxed max-w-5xl mx-auto mb-8"
        >
          <p>Custom internal systems, customer portals, AI tools, dashboards, and automation — designed, built and shipped end-to-end.</p>
          <p>One developer. One point of accountability. Production systems that run your business.</p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4 flex-wrap mt-10"
        >
          <Link
            href="#solutions"
            className="group inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-label bg-primary text-on-primary transition-opacity duration-200"
          >
            See Solutions<ArrowRight />
          </Link>

          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-label border border-primary hover:border-secondary transition-opacity duration-200"
          >
            <MessageSquare />Start a Project
          </Link>
        </motion.div>
    </section>
  );
}
