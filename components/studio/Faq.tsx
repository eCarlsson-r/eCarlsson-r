"use client";

import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How long does a project take?",
    a: "Most foundation-based projects ship in 6–10 weeks. Starting from a production-tested system removes months of groundwork — the timeline is spent on your workflows, not on rebuilding login screens.",
  },
  {
    q: "Do I own the system?",
    a: "Yes. You receive the source code, the deployment, and the documentation. No lock-in, no license fees on your own software.",
  },
  {
    q: "My industry isn't listed. Can you still help?",
    a: "Very likely. The foundations share a library of reusable modules — authentication, roles, dashboards, reporting, payments — that recombine into systems for any business domain.",
  },
  {
    q: "How does pricing work?",
    a: "Fixed-scope proposals. After discovery you get a written proposal with the recommended foundation, the customizations, the timeline, and the price — before any commitment.",
  },
  {
    q: "Who maintains the system after launch?",
    a: "We do, if you want us to. Every project includes a handover period, and ongoing maintenance and feature development are available as a retainer.",
  },
  {
    q: "Where does Carlsson Studio work from?",
    a: "An independent software studio based in Indonesia, working remotely with founders and operators across Southeast Asia.",
  },
];

export default function Faq() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <h2 className="text-2xl md:text-3xl font-semibold">Frequently Asked Questions</h2>
      <div className="mt-8 divide-y divide-gray-200 dark:divide-white/10 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5">
        {faqs.map((faq) => (
          <details key={faq.q} className="group px-5 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold">
              {faq.q}
              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
