import path from "path";
import * as fs from "fs";

export interface LiveEngineerSignals {
  lastCommit: string;
  activityPulse: string;
  executionVelocity: string;
  commitsLast30Days: number;
  momentum: string;
  consistencyScore: number;
  techFocus: Record<string, number>;
}

const liveSignalsPath = path.join(
  process.cwd(),
  "signals-engine",
  "output",
  "live-engineer-signals.json"
);

export function getLiveSignals(): LiveEngineerSignals | null {
  if (!fs.existsSync(liveSignalsPath)) return null;

  const file = fs.readFileSync(liveSignalsPath, "utf-8");
  return JSON.parse(file);
}