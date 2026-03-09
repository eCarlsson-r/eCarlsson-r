import { projects } from "../data/projects";
import { fetchRepoData, fetchRecentCommits } from "./fetchers/githubFetcher";
import { normalizeSignals } from "./processors/normalize";
import { calculateScores } from "./processors/scoring";
import { generateSummary } from "./processors/summary";
import fs from "fs";

export interface FeedItem {
  repo: string;
  message: string;
  date: string | undefined;
  url: string;
}

async function run() {
  const results = [];
  const commitFeed: FeedItem[] = [];

  for (const project of projects) {
    let executionScore = 0;
    let complexityScore = 0;
    let ownershipScore = 0;

    const repos = project.repositories ?? [];

    for (const repo of repos) {
      const repoData = await fetchRepoData(repo.owner, repo.name);

      const normalized = normalizeSignals(repoData);
      const scores = calculateScores(normalized);
      executionScore += scores.execution;
      complexityScore += scores.complexity;
      ownershipScore += scores.ownership;

      const recentCommits = await fetchRecentCommits(repo.owner, repo.name);
      commitFeed.push(...recentCommits);
    }

    const repoCount = repos.length || 1;

    const scores = {
      execution: Math.round(executionScore / repoCount),
      complexity: Math.round(complexityScore / repoCount),
      ownership: Math.round(ownershipScore / repoCount)
    };

    const summary = generateSummary(scores);

    results.push({
      id: project.slug,
      scores,
      summary
    });
  }

  fs.writeFileSync(
    "signals-engine/output/commit-feed.json",
    JSON.stringify(
      commitFeed.sort(
        (a: FeedItem, b: FeedItem) => new Date(b.date!).getTime() - new Date(a.date!).getTime()
      ).slice(0, 20),
      null,
      2
    )
  );

  fs.writeFileSync(
    "signals-engine/output/processed-signals.json",
    JSON.stringify(results, null, 2)
  );
}

run();