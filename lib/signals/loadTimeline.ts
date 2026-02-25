import path from "path";
import fs from "fs";

const timelinePath = path.join(
  process.cwd(),
  "signals-engine",
  "output",
  "execution-timeline.json"
);

export interface TimelinePoint {
  date: string;
  count: number;
}

export function getExecutionTimeline(): TimelinePoint[] {
  if (!fs.existsSync(timelinePath)) return [];
  return JSON.parse(fs.readFileSync(timelinePath, "utf-8"));
}