import Hero from "@/components/sections/Hero";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import ExecutionSnapshot from "@/components/sections/ExecutionSnapshot";
import TrustBar from "@/components/sections/TrustBar";
import ExecutionFeed from "@/components/sections/ExecutionFeed";
import ExecutionTimeline from "@/components/signals/ExecutionTimeline";
import TechMap from "@/components/sections/TechMap";
import AboutPreview from "@/components/sections/AboutPreview";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ExecutionSnapshot />
      <TrustBar />
      <FeaturedProjects />
      <ExecutionFeed />
      <ExecutionTimeline />
      <TechMap />
      <AboutPreview />
      <CTA />
    </>
  );
}
