import { Summary } from "../../core/types";

export function generateSummary(scores: any): Summary {
  const level = (score: number) =>
    score > 80 ? "High" : score > 50 ? "Medium" : "Low";

  return {
    executionLevel: level(scores.execution),
    complexityLevel: level(scores.complexity),
    ownershipLevel: level(scores.ownership)
  };
}