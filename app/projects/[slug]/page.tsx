import { notFound } from "next/navigation";
import { loadProjectMdx } from "@/lib/hooks/loadProjectMdx";
import ProjectClient from "@/components/project/ProjectClient";
import { loadProjects } from "@/lib/signals/loadProjectSignals";
import { Project } from "@/core/types";

export default async function ProjectPage({ params }: any) {
  const { slug } = await params;
  const projects = await loadProjects();
  const project = projects.find((p: Project) => p.slug === slug);
  
  if (!project) return notFound();

  let mdxContent = null;

  if (project.mdxPath) {
    const mdx = await loadProjectMdx(project.mdxPath);
    if (mdx) mdxContent = mdx.content;
  }
  return (
    <ProjectClient project={project} mdxContent={mdxContent} />
  );
}