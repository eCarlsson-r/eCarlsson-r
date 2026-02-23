import fs from "fs";
import path from "path";

export function getMDXContent(slug: string) {
  const filePath = path.join(
    process.cwd(),
    "content/projects",
    `${slug}.mdx`
  );

  if (!fs.existsSync(filePath)) return null;

  return fs.readFileSync(filePath, "utf-8");
}