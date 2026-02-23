import { Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";

interface Props {
  title: string;
  projects: Project[];
}

export default function ProjectGroup({ title, projects }: Props) {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
    </section>
  );
}
