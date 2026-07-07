
import ProjectGroup from "@/components/project/ProjectGroup";
import { groupedProjects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl p-8 md:py-24">
      <h1 className="text-4xl font-bold text-gray-900">Projects</h1>

      <p className="mt-4 text-gray-600">
        A collection of production systems, ecosystem architectures, and
        experimental engineering projects.
      </p>

      <ProjectGroup className="mt-10" title="Signal Projects" projects={groupedProjects.signal} />

      <ProjectGroup className="mt-10" title="Depth Systems" projects={groupedProjects.depth} />

      <ProjectGroup className="mt-10" title="Edge Experiments" projects={groupedProjects.edge} />
    </div>
  );
}
