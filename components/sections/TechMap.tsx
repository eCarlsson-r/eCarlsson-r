"use client";

import { motion } from "motion/react";

export default function TechMap() {
  const stacks = {
    frontend: ["Next.js", "Nuxt.js", "Angular"],
    backend: ["Laravel", ".NET Core", "FastAPI"],
    other: ["MySQL", "REST API"] 
  };

  return (
    <>
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

      <section className="max-w-4xl mx-auto px-2 py-8 text-center">
        <h2 className="text-2xl font-semibold">
          Tech Stack
        </h2>

        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          {Object.entries(stacks).map(([category, techList]) => (
            <div key={category}>
              <div className="md:flex md:flex-wrap gap-4 pt-3 justify-center items-center">
                <strong>{category.charAt(0).toUpperCase() + category.slice(1)}:</strong>
                <div className="flex flex-wrap gap-3 justify-center items-center">
                  {techList.map((tech) => (
                    <span key={tech} className="font-headline text-secondary italic text-on-surface-variant px-4 py-2 border rounded-full text-lg">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
