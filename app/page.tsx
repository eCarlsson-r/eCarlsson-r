import CTA from "@/components/sections/CTA";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Hero from "@/components/sections/Hero";
import StreakCard from "@/components/sections/StreakCard";
import TechMap from "@/components/sections/TechMap";

export default function HomePage() {
  return (
    <main className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Hero />

      <FeaturedProjects />
      
      <StreakCard />

      <TechMap />
      <CTA />
    </main>
  );
}