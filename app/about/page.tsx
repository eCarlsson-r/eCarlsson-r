import ExecutionTimeline from "@/components/signals/ExecutionTimeline";
import TrustBar from "@/components/sections/TrustBar";
import CTA from "@/components/sections/CTA";

export default function AboutPage() {
  return (
    <>
      <div className="py-12 lg:space-y-12">     
        {/* Hero */}
        <section className="mx-auto max-w-6xl space-y-6 p-8 lg:p-0">
          <h1 className="text-5xl font-bold text-primary">
            How I Build Systems
          </h1>
          <p className="text-lg text-gray-600 w-full">
            I focus on :
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-gray-600">
              <p className="bg-surface-container-low p-6 rounded-md">
                Clean architecture
              </p>
              <p className="bg-surface-container-low p-6 rounded-md">
                Real-world domain modelling
              </p>
              <p className="bg-surface-container-low p-6 rounded-md">
                Measurable engineering output (signals-driven development)
              </p>
            </div>
        </section>

        <section className="mx-auto max-w-6xl p-8 lg:p-0">
          <p className="text-lg text-gray-600 max-w-2xl">
            This portfolio includes a custom-built signals engine that analyzes:
          </p>
          <ul className="text-lg text-gray-600 max-w-2xl list-disc list-inside mt-4 space-y-2">
            <li>execution velocity</li>
            <li>project complexity</li>
            <li>development consistency</li>
          </ul>
        </section>
        
        <TrustBar />
        <ExecutionTimeline />
      </div>
      <CTA />
    </>
  );
}