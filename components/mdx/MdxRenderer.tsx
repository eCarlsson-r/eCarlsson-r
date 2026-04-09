"use client";

import { MDXRemote } from "next-mdx-remote";

const mdxComponents = {
  h1: (props: any) => <h1 className="text-4xl font-bold mt-10 mb-6" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-semibold mt-8 mb-4" {...props} />,
  p: (props: any) => <p className="leading-8 text-gray-900 dark:text-gray-100 mb-6" {...props} />,
  a: (props: any) => <a className="text-primary hover:text-secondary transition" {...props} />,
  ul: (props: any) => <ul className="list-disc ml-6 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal ml-6 space-y-2" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground" {...props} />,
  code: (props: any) => <code className="rounded bg-slate-100 px-1 py-0.5 text-sm" {...props} />,
  pre: (props: any) => <pre className="rounded-xl bg-slate-950 p-4 overflow-x-auto" {...props} />,
};

export default function MDXRenderer({ source }: any) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <MDXRemote {...source} components={mdxComponents} />
    </div>
  );
}