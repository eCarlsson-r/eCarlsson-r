"use server";

import path from "path";
import * as fs from "fs";
import matter from "gray-matter";

export async function loadProjectMdx(slug: string) {
  const filePath = path.join(
    process.cwd(),
    "content/projects",
    `${slug}.mdx`
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(source);

  return {
    content,
    frontmatter: data
  };
}