import dayjs from "dayjs";

export function normalizeSignals(repoData: any) {
  const start = dayjs(repoData.firstCommit);
  const end = dayjs(repoData.lastCommit);

  const activeDays = end.diff(start, "day") || 1;

  return {
    commitDensity: repoData.commitCount / activeDays,
    longevity: activeDays,
    languageCount: repoData.languages.length
  };
}