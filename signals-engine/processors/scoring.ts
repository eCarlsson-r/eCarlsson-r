export function calculateScores(normalized: any, manual: any) {
  const executionScore =
    normalized.commitDensity * 40 +
    normalized.longevity * 0.3;

  const complexityScore =
    normalized.languageCount * 25;

  const ownershipScore =
    (manual.ownership_level === "End-to-end" ? 40 : 20) +
    (manual.team_size === "Solo" ? 30 : 10);

  return {
    execution: Math.min(100, Math.round(executionScore)),
    complexity: Math.min(100, Math.round(complexityScore)),
    ownership: Math.min(100, Math.round(ownershipScore))
  };
}