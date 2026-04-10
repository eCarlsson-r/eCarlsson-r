export function calculateActivityScore(streaks: any) {
    const { currentStreak, longestStreak, totalActiveDays } = streaks;

    let score = 0;

    score += Math.min(currentStreak * 2, 40); // Max 40 points for current streak
    score += Math.min(longestStreak, 30);
    score += Math.min(totalActiveDays / 2, 30); // Max 30 points for total active days

    return Math.round(score);
}

export function activityLevel(score: number) {
    if (score >= 75) return "High";
    if (score >= 40) return "Medium";
    return "Low";
}