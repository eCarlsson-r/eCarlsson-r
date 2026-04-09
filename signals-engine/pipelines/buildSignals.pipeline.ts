import { projects } from "../../data/projects";
import { fetchRepoData, fetchRecentCommits } from "../fetchers/github.fetcher";
import { normalizeSignals } from "../processors/normalize.processor";
import { calculateScores } from "../processors/scoring.processor";
import { generateSummary } from "../processors/summary.processor";
import { ProcessedProject } from "../../core/types";

export async function buildSignals() {
  const results: ProcessedProject[] = [];
  const commitFeed: any[] = [];
  const contributions: Record<string, number> = {};

  for (const project of projects) {
    let execution = 0;
    let complexity = 0;
    let ownership = 0;

    for (const repo of project.repositories) {
      const data = await fetchRepoData(repo.owner, repo.name);

      const normalized = normalizeSignals(data);
      const scores = calculateScores(normalized);

      execution += scores.execution;
      complexity += scores.complexity;
      ownership += scores.ownership;

      const commits = await fetchRecentCommits(repo.owner, repo.name);
      commitFeed.push(...commits);
    }

    const avgScores = {
      execution: Math.round(execution / project.repositories.length),
      complexity: Math.round(complexity / project.repositories.length),
      ownership: Math.round(ownership / project.repositories.length),
    };

    results.push({
      id: project.slug,
      scores: avgScores,
      summary: generateSummary(avgScores),
    });
  }

  commitFeed.forEach(commit => {
    const date = new Date(commit.date).toISOString().split("T")[0];

    contributions[date] = (contributions[date] || 0) + 1;
  });

  return {
    processed: results,
    commits: commitFeed,
    contributions: contributions
  };
}