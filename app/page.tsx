"use client";

import CTA from "@/components/sections/CTA";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Hero from "@/components/sections/Hero";
import TechMap from "@/components/sections/TechMap";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Hero />

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

      <FeaturedProjects />

      <section className="py-10 bg-gray-50 dark:bg-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold mb-10">
            What I Do
          </h2>

          <div className="grid md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
            {[
              "Scalable backend systems",
              "Modern frontend applications",
              "Multi-role platforms",
              "API-driven ecosystems",
            ].map((item, i) => (
              <motion.p
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-xl bg-white dark:bg-white/5 border dark:border-white/10 transition"
              >
                {item}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      <TechMap />
      <CTA />
    </main>
  );
}