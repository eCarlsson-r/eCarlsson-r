import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { compileMDX } from "next-mdx-remote/rsc";
import { loadProjectMdx } from "@/lib/hooks/loadProjectMdx";
import { projects } from "@/data/projects";
import ProjectCarousel from "@/components/project/ProjectCarousel";
import DomainBadge from "@/components/project/DomainBadge";
import LinkDropdown from "@/components/project/LinkDropdown";

const mdxComponents = {
  h2: (props: any) => <h2 className="text-2xl md:text-3xl font-semibold mt-12 mb-4" {...props} />,
  h3: (props: any) => <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-3" {...props} />,
  p: (props: any) => <p className="leading-8 text-gray-900 dark:text-gray-100 mb-6" {...props} />,
  a: (props: any) => <a className="text-primary hover:text-secondary transition" {...props} />,
  ul: (props: any) => <ul className="list-disc ml-6 mb-6 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal ml-6 mb-6 space-y-2" {...props} />,
  li: (props: any) => <li className="text-gray-900 dark:text-gray-100" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4" {...props} />,
  code: (props: any) => <code className="rounded bg-red-950 text-red-100 px-1 py-0.5 text-sm" {...props} />,
  pre: (props: any) => <pre className="rounded-xl bg-red-950 p-4 overflow-x-auto my-4" {...props} />,
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return notFound();

  let mdxBody = null;
  if (project.mdxPath) {
    const mdx = await loadProjectMdx(project.mdxPath);
    if (mdx) {
      const { content } = await compileMDX({ source: mdx.content, components: mdxComponents });
      mdxBody = content;
    }
  }

  const slides = project.slides ?? [];
  const demoRepos = project.repositories?.filter((r) => r.url) ?? [];

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
      <Link href="/#solutions" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition">
        <ArrowLeft className="h-4 w-4" />Back to Solutions
      </Link>

      {slides.length > 0 && (
        <div className="mt-8 p-4 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
          <ProjectCarousel slides={slides} />
        </div>
      )}

      <div className="mt-10">
        <DomainBadge domain={project.domain} />
        <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">{project.title}</h1>
        <p className="mt-3 text-sm font-medium text-primary">{project.outcome}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {[...(project.backend || []), ...(project.frontend || [])].map((tech) => (
          <span key={tech} className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-white/10">
            {tech}
          </span>
        ))}
      </div>

      <hr className="my-10 border-border" />

      {mdxBody ?? <p className="text-gray-500">No documentation available.</p>}

      <hr className="my-10 border-border" />

      <div className="flex flex-wrap items-center gap-4">
        <LinkDropdown
          label="Live Demo"
          icon="demo"
          variant="primary"
          items={demoRepos.map((repo) => ({ label: repo.name, href: repo.url! }))}
        />
        <LinkDropdown
          label="GitHub"
          icon="github"
          variant="outline"
          items={(project.repositories ?? []).map((repo) => ({
            label: repo.name,
            href: `https://github.com/${repo.owner}/${repo.name}`,
          }))}
        />
      </div>

      <Link href="/#contact" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary transition">
        Request this for your business<ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
