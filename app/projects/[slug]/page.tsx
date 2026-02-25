import { getProject, projects } from "@/data/projects";
import SignalsSection from "./SignalsSection";
import TechBadge from "@/components/project/TechBadge";

export function generateStaticParams() {
  return projects.map(p => ({
    slug: p.slug,
  }));
}
  
interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  console.info(slug);
  const project = getProject(slug);
  if (!project) {
    throw new Error(`Project not found: ${slug}`);
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
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
