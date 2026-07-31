import Mission from "@/components/studio/Mission";
import OurApproach from "@/components/sections/OurApproach";
import Technology from "@/components/studio/Technology";
import Process from "@/components/studio/Process";
import Faq from "@/components/studio/Faq";
import About from "@/components/sections/About";
import ProvenFoundation from "@/components/sections/ProvenFoundation";
import SocialProof from "@/components/sections/SocialProof";
import TrustBar from "@/components/sections/TrustBar";

export const metadata = {
  title: "Studio | Carlsson Studio",
  description: "How Carlsson Studio works: business-first discovery, proven foundations, end-to-end delivery, and long-term support.",
};

export default function AboutPage() {
  return (
    <>
      <Mission />
      <About />
      <TrustBar />
      {/* Replaced the generic four-step agency process with the risk-framed one. */}
      <OurApproach />
      <ProvenFoundation />
      <Technology />
      <Process />
      <SocialProof />
      <Faq />
    </>
  );
}
