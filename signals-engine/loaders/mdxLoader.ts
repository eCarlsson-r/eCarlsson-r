import fs from "fs";
import matter from "gray-matter";

export function loadManualSignals(path: string) {
  const file = fs.readFileSync(path, "utf-8");
  const { data } = matter(file);

  return data.signals?.manual || {};
}