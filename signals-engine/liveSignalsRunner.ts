import { projects } from "./config/projects";
import { fetchRepoData } from "./fetchers/githubFetcher";
import { generateGithubSignals } from "./processors/githubSignals";
import fs from "fs";

async function run() {
  const repoResults: {commitCount: number, firstCommit: string, lastCommit: string, languages: string[]}[] = [];

  for (const project of projects) {
    if (!project.repo) continue;

    let commitCount = 0;
    const firstCommits: Date[] = [];
    const lastCommits: Date[] = [];
    const languages: string[] = [];

    for (const repo of project.repo) {
      const data = await fetchRepoData(
        project.githubOwner,
        repo
      );
      commitCount += data.commitCount;
      firstCommits.push(new Date(data.firstCommit!));
      lastCommits.push(new Date(data.lastCommit!));
      data.languages.forEach(language => (!languages.includes(language)) && languages.push(language));
    }

    repoResults.push({
      commitCount: commitCount,
      firstCommit: firstCommits.reduce((a, b) => (a < b ? a : b)).toISOString(),
      lastCommit: lastCommits.reduce((a, b) => (a > b ? a : b)).toISOString(),
      languages: languages
    });
  }

  const liveSignals = generateGithubSignals(repoResults);

  fs.writeFileSync(
    "signals-engine/output/live-engineer-signals.json",
    JSON.stringify(liveSignals, null, 2)
  );

  console.log("✅ Live signals generated");
}

run();