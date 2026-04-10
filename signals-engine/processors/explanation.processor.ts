function joinReasons(reasons: string[]) {
    if (reasons.length === 1) return reasons[0];
    if (reasons.length === 2) return `${reasons[0]} and ${reasons[1]}`;
    return reasons.slice(0, -1).join(', ') + `, and ${reasons[reasons.length - 1]}`;
}

export function generateProjectExplanation(project: any) {
    const scores = project.signals?.scores || {};
    const focusIndex = project.focusIndex * 100 || 0;
    const activity = project.activity?.activityScore || 0;

    const reasons: string[] = [];

    if (scores.execution > 80) {
        reasons.push("high execution quality");
    } else if (scores.execution > 60) {
        reasons.push("solid execution");
    }

    if (scores.complexity > 75) {
        reasons.push("complex system design");
    }

    if (scores.ownership > 80) {
        reasons.push("strong ownership");
    }

    if (focusIndex > 0.4) {
        reasons.push(`deep focus (${Math.round(focusIndex)}% of total work)`);
    } else if (focusIndex > 0.25) {
        reasons.push(`significant investment (${Math.round(focusIndex)}%)`);
    }

    if (activity > 70) {
        reasons.push("high development activity");
    } else if (activity > 40) {
        reasons.push("consistent development activity");
    }

    if (reasons.length === 0) {
        return "Balanced project with moderate execution and activity.";
    }

    return `Ranked highly due to ${joinReasons(reasons)}.`;
}