import TechMap from "@/components/sections/TechMap";
import ExecutionTimeline from "@/components/signals/ExecutionTimeline";
import TrustBar from "@/components/sections/TrustBar";
import CTA from "@/components/sections/CTA";

export default function AboutPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl py-12 space-y-12">
        
        {/* Hero */}
        <section className="space-y-6">
          <h1 className="text-5xl font-bold">
            Execution-Driven Engineer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            I design systems that transform ideas into measurable outcomes.
            My work focuses on signal clarity, execution speed,
            and scalable architecture.
          </p>
        </section>

        {/* Philosophy */}
        <section>
          <h2 className="text-3xl font-semibold mb-6">
            Execution Philosophy
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-600">
            <p className="bg-surface-container-low p-6 rounded-md">
              Signals over noise. Decisions must be data-anchored.
            </p>
            <p className="bg-surface-container-low p-6 rounded-md">
              Systems over features. Architecture compounds value.
            </p>
            <p className="bg-surface-container-low p-6 rounded-md">
              Execution over ideas. Delivery creates trust.
            </p>
          </div>
        </section>
      </div>
      <TechMap />
      <TrustBar />
      <ExecutionTimeline />
      <CTA />
    </>
  );
}