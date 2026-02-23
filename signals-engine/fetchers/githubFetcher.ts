import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

export async function fetchRepoData(owner: string, repo: string) {
  const commits = await octokit.repos.listCommits({
    owner,
    repo,
    per_page: 100
  });

  const languages = await octokit.repos.listLanguages({
    owner,
    repo
  });

  return {
    commitCount: commits.data.length,
    firstCommit: commits.data[commits.data.length - 1]?.commit.author?.date,
    lastCommit: commits.data[0]?.commit.author?.date,
    languages: Object.keys(languages.data)
  };
}