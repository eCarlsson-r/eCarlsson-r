import { projects } from "./config/projects";
import { fetchRepoData } from "./fetchers/githubFetcher";
import { loadManualSignals } from "./loaders/mdxLoader";
import { normalizeSignals } from "./processors/normalize";
import { calculateScores } from "./processors/scoring";
import { generateSummary } from "./processors/summary";
import fs from "fs";

async function run() {
  const results = [];

  for (const project of projects) {
    const repoData = await fetchRepoData(
      project.githubOwner,
      project.repo
    );

    const manual = loadManualSignals(project.mdxPath);

    const normalized = normalizeSignals(repoData);
    const scores = calculateScores(normalized, manual);
    const summary = generateSummary(scores);

    results.push({
      id: project.id,
      scores,
      summary
    });
  }

  fs.writeFileSync(
    "signals-engine/output/processed-signals.json",
    JSON.stringify(results, null, 2)
  );
}

run();