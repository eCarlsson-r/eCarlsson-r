import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { loadProjectMdx } from "@/lib/hooks/loadProjectMdx";
import { serialize } from "next-mdx-remote/serialize";
import MDXRenderer from "@/components/mdx/MdxRenderer";
import ProjectHeader from "@/components/project/ProjectHeader";
import ProjectClient from "@/components/project/ProjectClient";

export async function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: any) {
  const projectInfo = await params;
  const project = projects.find(p => p.slug === projectInfo.slug);
  
  if (!project) return notFound();

  let mdxSource = null;

  if (project.mdxPath) {
    const mdx = loadProjectMdx(project.mdxPath);
    if (mdx) mdxSource = await serialize(mdx.content);
  }

  return (
    <ProjectClient project={project} mdxSource={mdxSource} />
  );
}