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
          className="text-4xl md:text-5xl font-headline font-bold leading-tight text-primary mb-6"
        >
          I build the <span className="text-tertiary">business systems</span> founders actually need.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-on-surface-variant leading-relaxed max-w-2xl mx-auto mb-8"
        >
          Hi, I&apos;m Albert — a freelance full-stack developer. I design, build and ship custom software end-to-end: POS, CRM, payroll, internal tools and AI-powered workflows. One person, one point of accountability, real systems that run your business.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4 flex-wrap mt-10"
        >
          <Link
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-label bg-primary text-on-primary transition-opacity duration-200"
          >
            See My Work<ArrowRight />
          </Link>

          <Link
            href="#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-label border border-primary hover:border-secondary transition-opacity duration-200"
          >
            <MessageSquare />Let&apos;s Discuss Your Project
          </Link>
        </motion.div>
    </section>
  );
}
