import { getAllSignals } from "@/lib/signals/loadSignals";
import { getLiveSignals } from "@/lib/signals/loadLiveSignals";

import SignalsStrengthChart from "@/components/signals/dashboard/SignalsStrengthChart";
import LiveSignalsPanel from "@/components/signals/dashboard/LiveSignalsPanel";
import MomentumPanel from "@/components/signals/dashboard/MomentumPanel";
import ExecutionHeatmap from "@/components/signals/dashboard/ExecutionHeatmap";
import Leaderboard from "@/components/signals/dashboard/Leaderboard";
import CommitFeed from "@/components/signals/dashboard/CommitFeed";

export default async function SignalsPage() {
  const signals = await getAllSignals();

  const live = await getLiveSignals() ?? {
    activityPulse: "Inactive",
    executionVelocity: "Low",
    commitsLast30Days: 0,
    lastCommit: "",
    techFocus: {},
    momentum: "Stable",
    consistencyScore: 0
  };

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-16">
      <h1 className="text-4xl font-bold text-primary">
        Developer Execution Dashboard
      </h1>

      <LiveSignalsPanel live={live} />
      <MomentumPanel
        momentum={live.momentum}
        consistencyScore={live.consistencyScore}
      />
      <SignalsStrengthChart signals={signals} />

      <Leaderboard />

      <ExecutionHeatmap />
      
      <CommitFeed />
    </div>
  );
}