import path from "path";
import * as fs from "fs";
import matter from "gray-matter";

export interface InsightMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
}

const insightsDir = () => path.join(process.cwd(), "content/insights");

export function listInsights(): InsightMeta[] {
  const dir = insightsDir();
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const source = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(source);
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: data.title ?? file,
        description: data.description ?? "",
        date: data.date ?? "",
        readingTime: data.readingTime ?? "",
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function loadInsight(slug: string) {
  const filePath = path.join(insightsDir(), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(source);
  return { content, frontmatter: data };
}
