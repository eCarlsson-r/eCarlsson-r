export function calculateLeaderboardScore(project: any) {
    const scores = project.signals?.scores || {};

    const execution = scores.execution || 0;
    const complexity = scores.complexity || 0;
    const ownership = scores.ownership || 0;

    const focus = (project.focusIndex || 0) * 100;
    const activityScore = project.activity?.activityScore|| 0;

    const total = execution * 0.4 + complexity * 0.2 + ownership * 0.2 + focus * 0.1 + activityScore * 0.1;

    return Math.round(total);
}