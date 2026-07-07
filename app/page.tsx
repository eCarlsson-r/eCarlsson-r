import Contact from "@/components/sections/Contact";
import Projects from "@/components/sections/Projects";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import SocialProof from "@/components/sections/SocialProof";
import ProvenFoundation from "@/components/sections/ProvenFoundation";

export default function HomePage() {
  return (
    <main className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Hero />
      <SocialProof />
      <Projects />
      <About />
      <ProvenFoundation />
      <Contact />
    </main>
  );
}
