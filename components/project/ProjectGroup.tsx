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

      <div className="flex overflow-x-auto pb-8 gap-8 no-scrollbar snap-x">
        {projects.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
    </section>
  );
}
