import path from "path";
import * as fs from "fs";
import { ProjectSignals } from "./types";

const signalsPath = path.join(process.cwd(), "signals-engine", "output", "processed-signals.json");

export function getAllSignals(): ProjectSignals[] {
    const file = fs.readFileSync(signalsPath, "utf-8");
    return JSON.parse(file);
}

export function getSignalById(id: string): ProjectSignals | null {
    const signals = getAllSignals();
    return signals.find(signal => signal.id === id) || null;
}   