import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
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
            href="//github.com/eCarlsson-r"
            className="rounded-none bg-secondary px-6 py-3 text-sm font-label text-on-primary hover:bg-primary-container transition-opacity duration-200"
          >
            View GitHub
          </Link>
          <Link
            href="//linkedin.com/in/albert-hartanto-b92036396/"
            className="rounded-none bg-secondary px-6 py-3 text-sm font-label text-on-primary hover:bg-primary-container transition-opacity duration-200"
          >
            View LinkedIn
          </Link>
          <Link
            href="/contact"
            className="rounded-none bg-secondary px-6 py-3 text-sm font-label text-on-primary hover:bg-primary-container transition-opacity duration-200"
          >
            Contact Me
          </Link>
        </motion.div>
    </section>
  );
}
