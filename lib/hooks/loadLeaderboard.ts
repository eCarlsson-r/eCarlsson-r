import path from "path";
import fs from "fs";

export async function loadLeaderboard() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'leaderboard.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const projects = JSON.parse(data);
    return projects;
  } catch (error) {
    console.error('Error loading all projects:', error);
    return [];
  }
}