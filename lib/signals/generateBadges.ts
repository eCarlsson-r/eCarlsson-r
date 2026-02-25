import { ProjectSignals } from "./types";

export function generateBadges(signals: ProjectSignals[]) {
  const avgExec =
    signals.reduce((sum, s) => sum + s.scores.execution, 0) /
    signals.length;

  const avgComplex =
    signals.reduce((sum, s) => sum + s.scores.complexity, 0) /
    signals.length;

  const badges: string[] = [];

  if (avgExec > 75) badges.push("High Execution Reliability");
  if (avgComplex > 70) badges.push("Complex System Architect");

  badges.push("End-to-End System Ownership");
  badges.push("Full-Stack Engineering");

  return badges;
}