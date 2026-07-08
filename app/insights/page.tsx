import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { listInsights } from "@/lib/hooks/loadInsights";

export const metadata = {
  title: "Insights | Carlsson Studio",
  description: "Articles on business software, operations, and the architecture decisions behind Carlsson Studio's production systems.",
};

const upcoming = [
  "Choosing between custom software and SaaS",
  "Lessons from building nine production systems",
  "AI in business operations",
  "Architecture decisions behind Carlsson Studio",
];

export default function InsightsPage() {
  const insights = listInsights();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <span className="text-xs font-semibold uppercase tracking-widest text-primary">Insights</span>
      <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
        Notes from building business software.
      </h1>
      <p className="mt-4 text-muted-foreground">
        What we learn designing, shipping, and running production systems for founders and operators.
      </p>

      <div className="mt-12 space-y-6">
        {insights.map((insight) => (
          <Link
            key={insight.slug}
            href={`/insights/${insight.slug}`}
            className="group block rounded-2xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-6 transition hover:border-primary/60 hover:no-underline"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {new Date(insight.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · {insight.readingTime}
            </p>
            <h2 className="mt-2 text-xl md:text-2xl font-semibold text-on-surface group-hover:text-primary transition">
              {insight.title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{insight.description}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              Read article<ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Coming next</h2>
        <ul className="mt-4 space-y-3">
          {upcoming.map((topic) => (
            <li key={topic} className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary/40" aria-hidden />
              {topic}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
