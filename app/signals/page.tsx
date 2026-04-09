import { getAllSignals } from "@/lib/signals/loadSignals";
import { getLiveSignals } from "@/lib/signals/loadLiveSignals";

import SignalsStrengthChart from "@/components/signals/dashboard/SignalsStrengthChart";
import LiveSignalsPanel from "@/components/signals/dashboard/LiveSignalsPanel";
import MomentumPanel from "@/components/signals/dashboard/MomentumPanel";
import ExecutionHeatmap from "@/components/signals/dashboard/ExecutionHeatmap";
import TopProjectsLeaderboard from "@/components/signals/dashboard/TopProjectsLeaderboard";
import CommitFeed from "@/components/signals/dashboard/CommitFeed";
import { useProjectsWithSignals } from "@/lib/hooks/useProjectsWithSignals";
import { projects } from "@/data/projects";

export default function SignalsPage() {
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

      <TopProjectsLeaderboard projects={projects} />

      <ExecutionHeatmap />
      
      <CommitFeed />
    </div>
  );
}