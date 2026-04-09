import { featuredProjects } from "@/data/projects";
import ProjectGroup from "../project/ProjectGroup";

export default function FeaturedProjects() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 md:py-24">
      <ProjectGroup title="Featured Projects" projects={featuredProjects} />
    </section>
  );
}
