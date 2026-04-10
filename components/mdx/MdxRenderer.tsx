"use client";

import { CompileMDXResult } from "next-mdx-remote/rsc";

export default function MDXRenderer({ source }: { source: CompileMDXResult<Record<string, unknown>> | null }) {
  if (!source) return null;
  
  return (
    <div className="prose dark:prose-invert max-w-none">
      {source.content}
    </div>
  );
}