import path from "path";
import * as fs from "fs";
import { buildLiveSignals } from "../pipelines/buildLiveSignals.pipeline";

async function run() {
  const liveSignalsPath = path.join(
    process.cwd(), "public", "data", "live-signals.json"
  );
  
  const signals = await buildLiveSignals();
  fs.writeFileSync(liveSignalsPath, JSON.stringify(signals, null, 2));
  console.log("✅ Live signals built");
}

run();