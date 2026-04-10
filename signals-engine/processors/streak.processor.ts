export function calculateStreaks(feed: { date: string }[]) {
    const days = new Set(
        feed.map(item => new Date(item.date).toISOString().split("T")[0])
    );

    const sortedDays = Array.from(days).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    let prevDate: Date | null = null;

    for (const day of sortedDays) {
        const currentDate = new Date(day);

        if (!prevDate) {
            tempStreak = 1;
        } else {
            const diff = (prevDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24);

            if (diff === 1) {
                tempStreak++;
            } else {
                tempStreak = 1;
            }
        }

        if (currentStreak === 0) {
            currentStreak = tempStreak;
        }

        longestStreak = Math.max(longestStreak, tempStreak);

        prevDate = currentDate;
    }
    
    return { currentStreak, longestStreak, totalActiveDays: days.size };
};