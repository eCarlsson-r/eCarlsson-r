import { resumeSignals } from "@/data/resumeSignals";
import ExecutionTimeline from "@/components/signals/ExecutionTimeline";
import TechMap from "@/components/sections/TechMap";
import { getLiveSignals } from "@/lib/signals/loadLiveSignals";

import LiveExecutionStatus from "@/components/signals/LiveExecutionStatus";
import ExecutionInsights from "@/components/signals/ExecutionInsights";
import ExecutionBadges from "@/components/signals/ExecutionBadges";
import LiveCommitStream from "@/components/signals/LiveCommitStream";

export default function ResumePage() {
  const { metrics } = resumeSignals;
  const live = getLiveSignals()!;

  return (
    <div className="mx-auto max-w-6xl py-12 space-y-12">

      {/* Hero */}
      <section>
        <h1 className="text-5xl font-bold">Execution Resume</h1>
        <p className="text-gray-600 mt-4">
          A signal-driven representation of my engineering capability.
        </p>
      </section>

      {/* NEW: Live Intelligence */}
      <LiveExecutionStatus live={live} />

      <LiveCommitStream />

      {/* Metrics */}
      <section className="grid md:grid-cols-3 gap-8 text-center">
        <Metric value={metrics.projects} label="Projects Delivered" />
        <Metric value={metrics.systemsBuilt} label="Systems Built" />
        <Metric value={metrics.avgDeliverySpeed} label="Avg Delivery Speed" />
      </section>

      {/* NEW: AI Insights */}
      <ExecutionInsights />

      <TechMap />

      {/* NEW: Badges */}
      <ExecutionBadges />

      <ExecutionTimeline />
    </div>
  );
}

function Metric({ value, label }: { value: string | number; label: string }) {
  return (
    <div>
      <p className="text-4xl font-bold">{value}</p>
      <p className="text-gray-500">{label}</p>
    </div>
  );
}