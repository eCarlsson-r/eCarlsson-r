import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { compileMDX } from "next-mdx-remote/rsc";
import { listInsights, loadInsight } from "@/lib/hooks/loadInsights";
import { mdxComponents } from "@/components/mdx/mdxComponents";

export function generateStaticParams() {
  return listInsights().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = loadInsight(slug);
  if (!insight) return {};
  return {
    title: `${insight.frontmatter.title} | Carlsson Studio`,
    description: insight.frontmatter.description,
  };
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = loadInsight(slug);

  if (!insight) return notFound();

  const { content } = await compileMDX({ source: insight.content, components: mdxComponents });
  const { title, date, readingTime } = insight.frontmatter;

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-20">
      <Link href="/insights" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition">
        <ArrowLeft className="h-4 w-4" />All insights
      </Link>

      <p className="mt-10 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · {readingTime}
      </p>
      <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>

      <div className="mt-6">{content}</div>

      <div className="mt-16 rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
        <h2 className="text-xl md:text-2xl font-semibold">Recognize your business in this?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Two minutes of questions, one concrete recommendation.
        </p>
        <Link
          href="/start"
          className="mt-5 inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-label bg-primary text-on-primary hover:opacity-80 transition-opacity"
        >
          Start a Project<ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
