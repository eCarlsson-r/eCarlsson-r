import { RepoData } from "../../core/types";
export function generateGithubSignals(repoDataList: RepoData[]) {
  const allDates = repoDataList.map(r => r.lastCommit);
  if (!allDates.length) return null;

  const now = new Date();
  const timestamps = allDates.map(d => new Date(d).getTime());

  const lastCommit = new Date(Math.max(...timestamps));

  const daysSinceLast =
    (now.getTime() - lastCommit.getTime()) / (1000 * 60 * 60 * 24);

  // ---------- ACTIVITY PULSE ----------
  let activityPulse = "Inactive";
  if (daysSinceLast < 1) activityPulse = "Very Active";
  else if (daysSinceLast < 7) activityPulse = "Active";
  else if (daysSinceLast < 30) activityPulse = "Moderate";

  // ---------- VELOCITY ----------
  const commitsLast30Days = repoDataList.reduce((sum, r) => sum + r.commitCount, 0);

  let executionVelocity = "Low";
  if (commitsLast30Days > 80) executionVelocity = "High";
  else if (commitsLast30Days > 30) executionVelocity = "Medium";

  // ---------- MOMENTUM ----------
  const commitsRecent = timestamps.filter(ts => {
    const diff = (now.getTime() - ts) / (1000 * 60 * 60 * 24);
    return diff <= 30;
  }).length;

  const commitsPast = timestamps.filter(ts => {
    const diff = (now.getTime() - ts) / (1000 * 60 * 60 * 24);
    return diff > 30 && diff <= 60;
  }).length;

  let momentum = "Stable";
  if (commitsRecent > commitsPast * 1.2) momentum = "Accelerating";
  else if (commitsRecent < commitsPast * 0.8) momentum = "Slowing";

  // ---------- CONSISTENCY ----------
  const activeWeeks = new Set(
    timestamps.map(ts => {
      const date = new Date(ts);
      return `${date.getFullYear()}-${Math.floor(date.getDate() / 7)}`;
    })
  );

  const consistencyScore = Math.min(
    100,
    Math.round((activeWeeks.size / 12) * 100)
  );

  // ---------- TECH FOCUS ----------
  const techMap: Record<string, number> = {};
  repoDataList.forEach(r => {
    (r.languages || []).forEach((lang: string) => {
      techMap[lang] = (techMap[lang] || 0) + 1;
    });
  });

  return {
    lastCommit: lastCommit.toISOString(),
    activityPulse,
    executionVelocity,
    commitsLast30Days,
    momentum,
    consistencyScore,
    techFocus: techMap
  };
}