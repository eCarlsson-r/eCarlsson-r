import fs from "fs";
import path from "path";
import { projects } from "../../data/projects";
import { calculateLeaderboardScore } from "../processors/leaderboard.processor";
import { generateProjectExplanation } from "../processors/explanation.processor";

const signalsPath = path.join(process.cwd(), "public", "data", "processed-signals.json");
const commitFeedPath = path.join(process.cwd(), "public", "data", "commit-feed.json");

const signals = JSON.parse(fs.readFileSync(signalsPath, "utf-8"));
const commitFeed = JSON.parse(fs.readFileSync(commitFeedPath, "utf-8"));

function groupCommitsByProject() {
    const map: Record<string, any[]> = {};
    commitFeed.forEach((item: any) => {
        const repo = item.repo;
        const project = projects.find(p => p.repositories.some(r => r.name === repo));
        
        if (!project) return;

        if (!map[project.slug]) {
            map[project.slug] = [];
        }
        map[project.slug].push(item);
    });
    return map;
}

function calculateProjectActivity(commits: any[]) {
    if (!commits || commits.length === 0) return {commitCount: 0, activityScore: 0, lastActive: null};

    const now = new Date();
    const commitCount = commits.length;

    const sorted = commits.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const lastActiveDate = new Date(sorted[0].date);

    const daysSinceLast = (now.getTime() - lastActiveDate.getTime()) / (1000 * 60 * 60 * 24);

    let recencyScore = 0;
    if (daysSinceLast < 3) {
        recencyScore= 40;
    } else if (daysSinceLast < 7) {
        recencyScore = 30;
    } else if (daysSinceLast < 30) {
        recencyScore = 20;
    } else {
        recencyScore = 10;
    }

    const volumeScore = Math.min(commitCount, 50);

    const activityScore = recencyScore + volumeScore;

    return {
        commitCount: commits.length,
        activityScore: activityScore,
        lastActive: sorted[0].date
    };
}

function calculateFocusIndex(projectCommits: number, totalCommits: number) {
    if (totalCommits === 0) return 0;
    return Number((projectCommits / totalCommits).toFixed(2));
}

function build() {
    const commitsByProject = groupCommitsByProject();
    const totalCommits = commitFeed.length;

    const enriched = projects.map(project => {
        const signal = signals.find((s: any) => s.id === project.slug);
        const commits = commitsByProject[project.slug] || [];
        const activity = calculateProjectActivity(commits);
        const focusIndex = calculateFocusIndex(activity.commitCount, totalCommits);
        const leaderboardScore = calculateLeaderboardScore({
            signals: signal,
            activity,
            focusIndex
        });
        const explanation = generateProjectExplanation({
            signals: signal,
            activity,
            focusIndex
        });

        return {
            ...project,
            signals: signal || null,
            activity,
            focusIndex,
            leaderboardScore,
            explanation
        };
    });

    const leaderboard = [...enriched].sort((a, b) => b.leaderboardScore - a.leaderboardScore).map((p, index) => ({
        rank: index + 1,
        ...p
    }));

    fs.writeFileSync(
        "public/data/enriched-projects.json",
        JSON.stringify(enriched, null, 2)
    );

    fs.writeFileSync(
        "public/data/leaderboard.json",
        JSON.stringify(leaderboard, null, 2)
    );
}

build();