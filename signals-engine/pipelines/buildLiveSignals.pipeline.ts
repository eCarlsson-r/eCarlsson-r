import { projects } from "../../data/projects";
import { fetchRepoData } from "../fetchers/github.fetcher";
import { generateGithubSignals } from "../processors/githubSignals.processor";

export async function buildLiveSignals() {
  const repoResults = [];

  for (const project of projects) {
    for (const repo of project.repositories) {
      const data = await fetchRepoData(repo.owner, repo.name);
      repoResults.push(data);
    }
  }

  return generateGithubSignals(repoResults);
}