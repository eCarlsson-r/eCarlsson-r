export function generateSummary(scores: any) {
  const level = (score: number) =>
    score > 80 ? "High" : score > 50 ? "Medium" : "Low";

  return {
    executionLevel: level(scores.execution),
    complexityLevel: level(scores.complexity),
    ownershipLevel: level(scores.ownership)
  };
}