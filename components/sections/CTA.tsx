"use client";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="text-center py-20 bg-surface-container-high text-on-surface">
      <h2 className="text-3xl font-headline font-bold mb-4 text-primary">
        Let’s Build Something Meaningful
      </h2>

      <p className="mb-6 text-on-surface-variant">Open to full-stack and system architecture roles.</p>

      <motion.a
        whileHover={{ scale: 1.05 }} href="/contact"
        className="px-6 py-3 bg-secondary text-white dark:bg-white dark:text-secondary rounded-xl shadow-lg transition"
      >
        Contact Me
      </motion.a>
    </section>
  );
}
