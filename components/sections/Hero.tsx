"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-headline font-bold leading-tight text-primary mb-6"
          >
            Full-Stack Developer Building Scalable Systems & Modern Web Applications
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-on-surface-variant leading-relaxed max-w-2xl mx-auto mb-8"
          >
            I design and build production-grade systems—from CRM platforms and commerce ecosystems to AI-powered applications.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-4 flex-wrap mt-10"
          >
            <Link
              href="/projects"
              className="rounded-none bg-primary px-6 py-3 text-sm font-label text-on-primary hover:bg-primary-container transition-opacity duration-200"
            >
              View Projects
            </Link>
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-none bg-secondary px-6 py-3 text-sm font-label text-on-primary hover:bg-primary-container transition-opacity duration-200"
            >
              View Resume
            </Link>
          </motion.div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-white/5 backdrop-blur">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-4xl mx-auto px-6 text-center"
        >
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Built 9+ real-world systems across CRM, commerce, AI, and SaaS platforms.
          </p>

          <div className="grid md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-400">
            <p>• CRM Platforms</p>
            <p>• Commerce Ecosystems</p>
            <p>• AI-powered Applications</p>
            <p>• Dashboard Systems</p>
          </div>
        </motion.div>
      </section>
    </>
  );
}
