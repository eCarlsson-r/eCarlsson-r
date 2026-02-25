import fs from "fs";
import path from "path";

const filePath = path.join(
  process.cwd(),
  "signals-engine/output/commit-feed.json"
);

export function getCommitFeed() {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}