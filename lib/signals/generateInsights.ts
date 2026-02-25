import { LiveEngineerSignals } from "./loadLiveSignals";
import { ProjectSignals } from "./types";

export function generateInsights(
  signals: ProjectSignals[],
  live: LiveEngineerSignals
): string[] {
  const insights: string[] = [];

  const avgExecution =
    signals.reduce((sum, s) => sum + s.scores.execution, 0) /
    signals.length;

  const avgComplexity =
    signals.reduce((sum, s) => sum + s.scores.complexity, 0) /
    signals.length;

  if (avgExecution > 75) {
    insights.push(
      "Demonstrates consistently strong execution capability across multiple production systems."
    );
  }

  if (avgComplexity > 70) {
    insights.push(
      "Owns high-complexity architectures including multi-service ecosystems and end-to-end platforms."
    );
  }

  if (live.executionVelocity === "High") {
    insights.push(
      "Currently in a high-velocity development phase with active system delivery."
    );
  }

  if (live.commitsLast30Days > 50) {
    insights.push(
      "Shows sustained hands-on engineering activity with frequent commits."
    );
  }

  insights.push(
    "Maintains full-stack ownership from backend architecture to modern frontend systems."
  );

  return insights;
}