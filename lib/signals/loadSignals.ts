"use server";

import path from "path";
import fs from "fs";
import { ProcessedProject } from "@/core/types";

const signalsPath = path.join(
  process.cwd(), "public", "data", "processed-signals.json"
);

export async function getAllSignals(): Promise<ProcessedProject[]> {
    const file = fs.readFileSync(signalsPath, "utf-8");
    return JSON.parse(file);
}

export async function getSignalById(id: string): Promise<ProcessedProject | null> {
    const signals = await getAllSignals();
    return signals.find(signal => signal.id === id) || null;
}