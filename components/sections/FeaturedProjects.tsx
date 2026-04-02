import { featuredProjects } from "@/data/projects";
import ProjectCard from "@/components/project/ProjectCard";

export default function FeaturedProjects() {
  return (
    <section className="my-10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-baseline mb-12">
          <h2 className="text-4xl font-headline font-bold text-primary">Featured Systems</h2>
          <div className="h-px bg-outline-variant flex-grow mx-8 opacity-30"></div>
          <span className="font-label text-sm text-tertiary">Archive v4.0</span>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          <div className="flex overflow-x-auto pb-8 gap-8 no-scrollbar snap-x">
            {featuredProjects.map((project) => (
                <ProjectCard key={project.slug} {...project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
