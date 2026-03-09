import { projects } from "../data/projects";
import { fetchRepoData } from "./fetchers/githubFetcher";
import { generateGithubSignals } from "./processors/githubSignals";
import fs from "fs";

async function run() {
  const repoResults: {
    project: string;
    commitCount: number; 
    firstCommit: string; 
    lastCommit: string; 
    languages: string[];
  }[] = [];

  for (const project of projects) {
    if (!project.repositories) continue;

    let commitCount = 0;
    const firstCommits: Date[] = [];
    const lastCommits: Date[] = [];
    const languages = new Set<string>();

    for (const repo of project.repositories) {
      const data = await fetchRepoData(repo.owner, repo.name);
      commitCount += data.commitCount;
      if (data.firstCommit) firstCommits.push(new Date(data.firstCommit));
      if (data.lastCommit) lastCommits.push(new Date(data.lastCommit));
      data.languages.forEach(language => languages.add(language));
    }

    repoResults.push({
      project: project.slug,
      commitCount: commitCount,
      firstCommit: firstCommits.length > 0 ? firstCommits.reduce((a, b) => (a < b ? a : b)).toISOString() : new Date().toISOString(),
      lastCommit: lastCommits.reduce((a, b) => (a > b ? a : b)).toISOString(),
      languages: Array.from(languages)
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