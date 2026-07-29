import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { compileMDX } from "next-mdx-remote/rsc";
import { loadProjectMdx } from "@/lib/hooks/loadProjectMdx";
import { projects } from "@/data/projects";
import ProjectCarousel from "@/components/project/ProjectCarousel";
import DomainBadge from "@/components/project/DomainBadge";
import LinkDropdown from "@/components/project/LinkDropdown";
import ArchitectureDiagram from "@/components/project/ArchitectureDiagram";
import { architectures } from "@/data/architectures";
import { caseStudies } from "@/data/caseStudies";
import BusinessSnapshot from "@/components/project/BusinessSnapshot";
import WorkflowDiagram from "@/components/project/WorkflowDiagram";
import FeatureCards from "@/components/project/FeatureCards";
import TechnicalHighlights from "@/components/project/TechnicalHighlights";
import FutureExtensions from "@/components/project/FutureExtensions";
import FoundationCoverage from "@/components/project/FoundationCoverage";
import IdealFor from "@/components/project/IdealFor";
import { mdxComponents } from "@/components/mdx/mdxComponents";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "projects" });
  const project = projects.find((p) => p.slug === slug);

  if (!project) return notFound();

  const architecture = architectures[project.slug];
  const caseStudy = caseStudies[project.slug];

  let mdxBody = null;
  if (project.mdxPath) {
    const mdx = await loadProjectMdx(project.mdxPath);
    if (mdx) {
      const { content } = await compileMDX({
        source: mdx.content,
        components: {
          ...mdxComponents,
          ArchitectureDiagram: () =>
            architecture ? <ArchitectureDiagram architecture={architecture} /> : null,
          WorkflowDiagram: () =>
            caseStudy ? <WorkflowDiagram steps={caseStudy.workflow} /> : null,
          FeatureCards: () =>
            caseStudy ? <FeatureCards features={caseStudy.features} /> : null,
        },
      });
      mdxBody = content;
    }
  }

  const slides = project.slides ?? [];
  const demoRepos = project.repositories?.filter((r) => r.url) ?? [];

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition">
        <ArrowLeft className="h-4 w-4" />{t("backToSolutions")}
      </Link>

      {slides.length > 0 && (
        <div className="mt-8 p-4 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
          <ProjectCarousel slides={slides} />
        </div>
      )}

      <div className="mt-10">
        <DomainBadge domain={project.domain} />
        <div className="flex flex-wrap justify-between w-full mt-4 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{project.title}</h1>
            <p className="text-sm font-medium text-primary">{project.outcome}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <LinkDropdown
              label={t("liveDemo")}
              icon="demo"
              variant="primary"
              items={demoRepos.map((repo) => ({ label: repo.name, href: repo.url! }))}
            />
            <LinkDropdown
              label={t("github")}
              icon="github"
              variant="outline"
              items={(project.repositories ?? []).map((repo) => ({
                label: repo.name,
                href: `https://github.com/${repo.owner}/${repo.name}`,
              }))}
            />
          </div>
        </div>
      </div>

      {caseStudy ? (
        <BusinessSnapshot rows={caseStudy.snapshot} />
      ) : (
        <div className="mt-6 flex flex-wrap gap-2">
          {[...(project.backend || []), ...(project.frontend || [])].map((tech) => (
            <span key={tech} className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-white/10">
              {tech}
            </span>
          ))}
        </div>
      )}

      <hr className="my-10 border-border" />

      {mdxBody ?? <p className="text-gray-500">{t("noDocumentation")}</p>}

      {caseStudy && (
        <>
          <TechnicalHighlights highlights={caseStudy.highlights} />
          <FutureExtensions extensions={caseStudy.extensions} />
          <FoundationCoverage groups={caseStudy.foundation} />
          <IdealFor items={caseStudy.idealFor} />
        </>
      )}

      <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold">{t("interestedTitle")}</h2>
        <p className="mt-3 text-muted-foreground">{t("interestedBody")}</p>
        <Link
          href="/start-a-project"
          className="mt-6 inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-label bg-primary text-on-primary hover:opacity-80 transition-opacity"
        >
          {t("startFromThis")}<ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
