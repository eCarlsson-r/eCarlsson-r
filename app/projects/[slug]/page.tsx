import { getProject } from "@/data/projects";
import { notFound } from "next/navigation";
import SignalsSection from "./SignalsSection";
import TechBadge from "@/components/project/TechBadge";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-bold">{project.title}</h1>

      <p className="mt-4 text-gray-600">{project.description}</p>

      {/* Stack */}
      <div className="mt-6 flex gap-2 flex-wrap">
        {[...project.backend, ...project.frontend].map((tech) => (
          <TechBadge key={tech} name={tech} />
        ))}
      </div>

      <SignalsSection projectId={project.slug} />
    </div>
  );
}
