"use client";

import { User } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  const stacks = {
    frontend: ["Next.js", "Nuxt.js", "Angular"],
    backend: ["Laravel", ".NET Core", "FastAPI", "MySQL", "REST API"],
    domains: ["Business Suite", "Enterprise", "SaaS", "AI Agents"] 
  };

  return (
    <section id="about" className="bg-gray-50 dark:bg-white/5 mx-auto px-6 py-12 md:py-24">
      <div className="grid lg:grid-cols-4 gap-12 lg:gap-16 max-w-6xl mx-auto">
        <div>
          <div className="mx-auto lg:mx-0 grid h-56 w-56 place-items-center overflow-hidden rounded-2xl border border-border bg-card">
            <User className="h-20 w-20" />
          </div>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-3"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">About</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">One developer. End-to-end. Accountable.</h2>
          <p className="mt-4 text-muted-foreground">
            I work directly with founders and operators to turn messy, manual workflows into clean software they actually use. Most of my projects start as a spreadsheet, a paper book, or three disconnected tools — and end as a single system that runs the business.
          </p>
          <p className="mt-4 text-muted-foreground">
            My focus is on outcomes: fewer errors, faster operations, clearer numbers. I handle the whole stack so there&apos;s one person to talk to, one person who owns it, and one person who ships. If you have a problem worth solving, I&apos;d rather understand it than pitch you a stack.
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-gray-700 dark:text-gray-300 mt-6">
            {Object.entries(stacks).map(([category, techList]) => (
              <motion.div
                key={category}
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-xl text-center bg-white dark:bg-white/5 border dark:border-white/10 transition"
              >
                <strong>{category.charAt(0).toUpperCase() + category.slice(1)}:</strong>
                <ul className="flex flex-wrap gap-x-4 gap-y-2">
                  {techList.map((tech) => (
                    <li key={tech}>
                      {tech}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
