import { getAllSignals } from "@/lib/signals/loadSignals";
import { getLiveSignals } from "@/lib/signals/loadLiveSignals";

import SignalsOverview from "@/components/signals/dashboard/SignalsOverview";
import SignalsComparisonGrid from "@/components/signals/dashboard/SignalsComparisonGrid";
import SignalsStrengthChart from "@/components/signals/dashboard/SignalsStrengthChart";
import SignalsInsightsPanel from "@/components/signals/dashboard/SignalsInsightsPanel";
import LiveSignalsPanel from "@/components/signals/dashboard/LiveSignalsPanel";
import LiveExecutionPanel from "@/components/signals/dashboard/LiveExecutionPanel";
import MomentumPanel from "@/components/signals/dashboard/MomentumPanel";
import { getExecutionTimeline } from "@/lib/signals/loadTimeline";
import ExecutionHeatmap from "@/components/signals/dashboard/ExecutionHeatmap";

export default function SignalsPage() {
  const timeline = getExecutionTimeline();
  const signals = getAllSignals();

  const live = getLiveSignals() ?? {
    activityPulse: "Inactive",
    executionVelocity: "Low",
    commitsLast30Days: 0,
    lastCommit: "",
    techFocus: {},
    momentum: "Stable",
    consistencyScore: 0
  };

  return (
    <div className="max-w-6xl mx-auto py-16 space-y-16">
      <h1 className="text-4xl font-bold">
        Developer Execution Dashboard
      </h1>

      <LiveSignalsPanel live={live} />

      <ExecutionHeatmap data={timeline} />

      {/* NEW LIVE PANEL */}
      <LiveExecutionPanel live={live} />

      <MomentumPanel
        momentum={live.momentum}
        consistencyScore={live.consistencyScore}
      />

      {/* EXISTING ANALYTICS */}
      <SignalsOverview signals={signals} />
      <SignalsStrengthChart signals={signals} />

      {/* PROJECT INTELLIGENCE */}
      <SignalsComparisonGrid signals={signals} />
      <SignalsInsightsPanel signals={signals} />
    </div>
  );
}