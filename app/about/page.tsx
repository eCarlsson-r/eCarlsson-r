import About from "@/components/sections/About";
import ProvenFoundation from "@/components/sections/ProvenFoundation";
import TrustBar from "@/components/sections/TrustBar";

export const metadata = {
  title: "Studio | Carlsson Studio",
  description: "Why Carlsson Studio: business-first systems, end-to-end delivery, and proven foundations adapted to your operations.",
};

export default function AboutPage() {
  return (
    <>
      <About />
      <TrustBar />
      <ProvenFoundation />
    </>
  );
}
