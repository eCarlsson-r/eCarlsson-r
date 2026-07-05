"use client";

import { Check, User } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  const stacks = {
    frontend: ["Next.js", "Nuxt.js", "Angular"],
    backend: ["Laravel", ".NET Core", "FastAPI", "MySQL", "REST API"],
    domains: ["Retail", "Property", "Insurance", "Restaurant", "Wellness", "HR · Payroll", "AI"]
  };

  const capabilities = [
    "Management Systems",
    "Customer Portals",
    "POS & Cashier Tools",
    "Booking Systems",
    "ERP Modules",
    "AI Agents",
    "Dashboards",
    "Reporting & Analytics",
    "Payroll & HR Tools",
    "Workflow Automation",
  ];

  return (
    <section id="studio" className="bg-gray-50 dark:bg-white/5 mx-auto px-6 py-12 md:py-24">
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
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Studio</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">What Carlsson Studio Builds.</h2>
          <p className="mt-4 text-muted-foreground">
            Carlsson Studio builds custom business software from scratch — and ships it production-ready. Every system is designed around the specific workflows of the business, not adapted from a generic template.
          </p>
          <p className="mt-6 font-semibold">What we build:</p>
          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-muted-foreground">
            {capabilities.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-primary" />{item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-muted-foreground">
            One developer handles the whole stack — so there&apos;s one person to talk to, one person who owns it, and one person who ships.
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
