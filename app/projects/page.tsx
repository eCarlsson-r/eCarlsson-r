import { groupedProjects } from "@/data/projects";
import ProjectGroup from "@/components/project/ProjectGroup";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl py-24">
      <h1 className="text-4xl font-bold text-gray-900">Projects</h1>

      <p className="mt-4 text-gray-600">
        A collection of production systems, ecosystem architectures, and
        experimental engineering projects.
      </p>

      <ProjectGroup title="Signal Projects" projects={groupedProjects.signal} />

      <ProjectGroup title="Depth Systems" projects={groupedProjects.depth} />

      <ProjectGroup title="Edge Experiments" projects={groupedProjects.edge} />
    </div>
  );
}
