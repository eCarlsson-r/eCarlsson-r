import { projects } from "./config/projects";
import { fetchRepoData } from "./fetchers/githubFetcher";
import { generateGithubSignals } from "./processors/githubSignals";
import fs from "fs";

async function run() {
  const repoResults = [];

  for (const project of projects) {
    if (!project.repo) continue;

    const data = await fetchRepoData(
      project.githubOwner,
      project.repo
    );

    repoResults.push(data);
  }

  const liveSignals = generateGithubSignals(repoResults);

  fs.writeFileSync(
    "signals-engine/output/live-engineer-signals.json",
    JSON.stringify(liveSignals, null, 2)
  );

  console.log("✅ Live signals generated");
}

run();