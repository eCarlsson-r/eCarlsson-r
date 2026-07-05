import Contact from "@/components/sections/Contact";
import FooterCTA from "@/components/sections/FooterCTA";
import Projects from "@/components/sections/Projects";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TrustBar from "@/components/sections/TrustBar";

export default function HomePage() {
  return (
    <main className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Hero />
      <TrustBar />
      <Projects />
      <About />
      <Contact />
      <FooterCTA />
    </main>
  );
}