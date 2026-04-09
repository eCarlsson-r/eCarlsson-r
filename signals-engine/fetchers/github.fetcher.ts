import { Octokit } from "@octokit/rest";
require('dotenv').config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

import { RepoData } from "../../core/types";

export async function fetchRepoData(
  owner: string,
  repo: string
): Promise<RepoData> {
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
    firstCommit: commits.data[commits.data.length - 1]?.commit.author?.date || "",
    lastCommit: commits.data[0]?.commit.author?.date || "",
    languages: Object.keys(languages.data)
  };
}

export async function fetchRecentCommits(owner: string, repo: string) {
  const commits = await octokit.repos.listCommits({
    owner,
    repo,
    per_page: 5
  });

  return commits.data.map(c => ({
    repo,
    message: c.commit.message.split("\n")[0],
    date: c.commit.author?.date,
    url: c.html_url
  }));
}