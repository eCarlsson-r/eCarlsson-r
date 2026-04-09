import { getLiveSignals } from "@/lib/signals/loadLiveSignals";

import LiveExecutionStatus from "@/components/signals/LiveExecutionStatus";
import ExecutionInsights from "@/components/signals/ExecutionInsights";
import ExecutionBadges from "@/components/signals/ExecutionBadges";
import { projects } from "@/data/projects";

export default function ResumePage() {
  const live = getLiveSignals()!;

  return (
    <div className="mx-auto max-w-6xl py-12 space-y-12 p-8 lg:p-0">

      {/* Hero */}
      <section>
        <h1 className="text-5xl font-bold">Execution Resume</h1>
        <p className="text-gray-600 mt-4">
          A signal-driven representation of my engineering capability.
        </p>
      </section>

      {/* NEW: Live Intelligence */}
      <LiveExecutionStatus live={live} />

      {/* Metrics */}
      <section className="grid md:grid-cols-3 gap-8 text-center">
        <Metric value={projects.length} label="Projects Delivered" />
        <Metric value={projects.filter((p) => p.category == "depth" || p.category == "edge").length} label="Systems Built" />
        <Metric value="2 - 4 weeks" label="Typical Delivery Cycle" />
      </section>

      {/* NEW: AI Insights */}
      <ExecutionInsights />

      {/* NEW: Badges */}
      <ExecutionBadges />
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