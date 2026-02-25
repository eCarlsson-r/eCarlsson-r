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
    const repoData = await fetchRepoData(
      project.githubOwner,
      project.repo
    );

    const manual = loadManualSignals(project.mdxPath);

    const normalized = normalizeSignals(repoData);
    const scores = calculateScores(normalized, manual);
    const summary = generateSummary(scores);

    const recentCommits = await fetchRecentCommits(
      project.githubOwner,
      project.repo
    );
    commitFeed.push(...recentCommits);

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