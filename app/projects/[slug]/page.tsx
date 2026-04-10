import { notFound } from "next/navigation";
import { loadProjectMdx } from "@/lib/hooks/loadProjectMdx";
import { serialize } from "next-mdx-remote/serialize";
import ProjectClient from "@/components/project/ProjectClient";
import { loadProjects } from "@/lib/signals/loadProjectSignals";
import { Project } from "@/core/types";

export async function generateStaticParams() {
  const projects = await loadProjects();
  return projects.map((p: Project) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: any) {
  const projects = await loadProjects();
  const project = projects.find((p: Project) => p.slug === params.slug);
  
  if (!project) return notFound();

  let mdxSource = null;

  if (project.mdxPath) {
    const mdx = await loadProjectMdx(project.mdxPath);
    if (mdx) mdxSource = await serialize(mdx.content);
  }
  return (
    <ProjectClient project={project} mdxSource={mdxSource} />
  );
}