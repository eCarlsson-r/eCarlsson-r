import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import FeaturedSolutions from "@/components/sections/FeaturedSolutions";
import StartProjectCTA from "@/components/sections/StartProjectCTA";

export default function HomePage() {
  return (
    <main className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Hero />
      <SocialProof />
      <FeaturedSolutions />
      <StartProjectCTA />
    </main>
  );
}
