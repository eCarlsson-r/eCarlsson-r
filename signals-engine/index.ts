import { projects } from "./config/projects";
import { fetchRepoData, fetchRecentCommits } from "./fetchers/githubFetcher";
import { loadManualSignals } from "./loaders/mdxLoader";
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
    for (const repo of project.repo) {
      const repoData = await fetchRepoData(
        project.githubOwner,
        repo
      );
      
      const normalized = normalizeSignals(repoData);
      let scores: { execution: number; complexity: number; ownership: number } = {
        execution: 0,
        complexity: 0,
        ownership: 0
      };
      if (project.mdxPath) {
        scores = calculateScores(normalized, loadManualSignals(project.mdxPath));
      } else {
        scores = calculateScores(normalized);
      }
      executionScore += scores.execution;
      complexityScore += scores.complexity;
      ownershipScore += scores.ownership;

      const recentCommits = await fetchRecentCommits(
        project.githubOwner,
        repo
      );
      commitFeed.push(...recentCommits);
    }

    const scores = {
      execution: Math.round(executionScore / project.repo.length),
      complexity: Math.round(complexityScore / project.repo.length),
      ownership: Math.round(ownershipScore / project.repo.length)
    };

    const summary = generateSummary(scores);

    results.push({
      id: project.id,
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