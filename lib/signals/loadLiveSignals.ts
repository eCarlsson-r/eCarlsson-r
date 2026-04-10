"use server";

import path from "path";
import * as fs from "fs";
import { LiveSignals } from "@/core/types";

const liveSignalsPath = path.join(
  process.cwd(), "public", "data", "live-signals.json"
);

export async function getLiveSignals(): Promise<LiveSignals | null> {
  if (!fs.existsSync(liveSignalsPath)) return null;

  const file = fs.readFileSync(liveSignalsPath, "utf-8");
  return JSON.parse(file);
}