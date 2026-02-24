import { resumeSignals } from "@/data/resumeSignals";
import ExecutionTimeline from "@/components/signals/ExecutionTimeline";
import TechMap from "@/components/sections/TechMap";

export default function ResumePage() {
  const { metrics } = resumeSignals;

  return (
    <div className="mx-auto max-w-5xl px-6 py-24 space-y-24">
      
      {/* Hero */}
      <section>
        <h1 className="text-5xl font-bold">Execution Resume</h1>
        <p className="text-gray-600 mt-4">
          A signal-driven representation of my engineering capability.
        </p>
      </section>

      {/* Metrics */}
      <section className="grid md:grid-cols-3 gap-8 text-center">
        <div>
          <p className="text-4xl font-bold">{metrics.projects}</p>
          <p className="text-gray-500">Projects Delivered</p>
        </div>
        <div>
          <p className="text-4xl font-bold">{metrics.systemsBuilt}</p>
          <p className="text-gray-500">Systems Built</p>
        </div>
        <div>
          <p className="text-4xl font-bold">
            {metrics.avgDeliverySpeed}
          </p>
          <p className="text-gray-500">Avg Delivery Speed</p>
        </div>
      </section>

      <TechMap />
      <ExecutionTimeline />

      {/* CTA */}
      <section className="text-center">
        <a
          href="/cv.pdf"
          className="px-6 py-3 bg-black text-white rounded-lg"
        >
          Download Traditional CV
        </a>
      </section>
    </div>
  );
}