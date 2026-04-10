"use server";

import fs from "fs";
import path from "path";

export interface ResumeMetrics {
  projects: number;
  systemsBuilt: number;
  executionScore: number;
}

export async function loadResumeMetrics(): Promise<ResumeMetrics | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "resume-metrics.json"
    );
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading resume metrics:", error);
    return null;
  }
}
