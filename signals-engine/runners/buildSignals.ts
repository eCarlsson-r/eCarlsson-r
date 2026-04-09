import path from "path";
import fs from "fs";
import { buildSignals } from "../pipelines/buildSignals.pipeline";

const signalsPath = path.join(
  process.cwd(), "public", "data", "processed-signals.json"
);

const filePath = path.join(
  process.cwd(), "public", "data", "commit-feed.json"
);

const contributionsPath = path.join(
  process.cwd(), "public", "data", "contributions.json"
);

async function run() {
  const result = await buildSignals();
  fs.writeFileSync(signalsPath, JSON.stringify(result.processed, null, 2));
  fs.writeFileSync(filePath, JSON.stringify(result.commits.slice(0, 20), null, 2));
  fs.writeFileSync(contributionsPath, JSON.stringify(result.contributions, null, 2));
  console.log("✅ Signals built");
}

run();