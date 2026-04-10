import { loadProjects } from "@/lib/signals/loadProjectSignals";
import ProjectGroup from "../project/ProjectGroup";

export default async function FeaturedProjects() {
  const featuredProjects = await loadProjects();
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 md:py-24">
      <ProjectGroup title="Featured Projects" projects={featuredProjects.filter((p: any) => p.featured)} />
    </section>
  );
}
