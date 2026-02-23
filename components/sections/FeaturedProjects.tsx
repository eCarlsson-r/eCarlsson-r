import { featuredProjects } from "@/data/projects";
import ProjectCard from "@/components/project/ProjectCard";

export default function FeaturedProjects() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-gray-900">Featured Systems</h2>
          <p className="mt-4 text-gray-600">
            Selected flagship projects demonstrating full-stack architecture,
            real business workflows, and production-level system design.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
