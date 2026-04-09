import path from "path";
import fs from "fs";
import { ProjectSignals } from "./types";

const signalsPath = path.join(
  process.cwd(), "public", "data", "processed-signals.json"
);

export function getAllSignals(): ProjectSignals[] {
    const file = fs.readFileSync(signalsPath, "utf-8");
    return JSON.parse(file);
}

export function getSignalById(id: string): ProjectSignals | null {
    const signals = getAllSignals();
    return signals.find(signal => signal.id === id) || null;
}   