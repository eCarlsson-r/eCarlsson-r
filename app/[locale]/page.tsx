import Hero from "@/components/sections/Hero";
import OperationalSymptoms from "@/components/sections/OperationalSymptoms";
import BusinessOutcomes from "@/components/sections/BusinessOutcomes";
import WhyCustomSoftware from "@/components/sections/WhyCustomSoftware";
import FeaturedSolutions from "@/components/sections/FeaturedSolutions";
import Industries from "@/components/sections/Industries";
import WhyProjectsFail from "@/components/sections/WhyProjectsFail";
import OurApproach from "@/components/sections/OurApproach";
import WhoWeWorkBestWith from "@/components/sections/WhoWeWorkBestWith";
import About from "@/components/sections/About";
import ProvenFoundation from "@/components/sections/ProvenFoundation";
import SocialProof from "@/components/sections/SocialProof";
import StartProjectCTA from "@/components/sections/StartProjectCTA";

// Order tells one argument: name the problem, let the visitor recognise it,
// state the outcome, admit when software is the wrong answer, then prove it.
// The second half answers the buyer's real question — not "can you build it"
// but "will this go wrong": why projects fail, how we work against that, and
// who we are honestly not for. Business proof (case studies) sits above the
// hackathon certificates, which are supporting credibility.
export default function HomePage() {
  return (
    <main className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Hero />
      <OperationalSymptoms />
      <BusinessOutcomes />
      <WhyCustomSoftware />
      <FeaturedSolutions />
      <Industries />
      <WhyProjectsFail />
      <OurApproach />
      <WhoWeWorkBestWith />
      <About />
      <ProvenFoundation />
      <SocialProof />
      <StartProjectCTA />
    </main>
  );
}
