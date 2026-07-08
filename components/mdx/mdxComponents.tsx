/* Shared typography map for server-compiled MDX (case studies + insights). */
export const mdxComponents = {
  h2: (props: any) => <h2 className="text-2xl md:text-3xl font-semibold mt-12 mb-4" {...props} />,
  h3: (props: any) => <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-3" {...props} />,
  p: (props: any) => <p className="leading-8 text-gray-900 dark:text-gray-100 mb-6" {...props} />,
  a: (props: any) => <a className="text-primary hover:text-secondary transition" {...props} />,
  ul: (props: any) => <ul className="list-disc ml-6 mb-6 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal ml-6 mb-6 space-y-2" {...props} />,
  li: (props: any) => <li className="text-gray-900 dark:text-gray-100" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4" {...props} />,
  code: (props: any) => <code className="rounded bg-[var(--code-background)] text-[var(--code-foreground)] px-1 py-0.5 text-sm" {...props} />,
  pre: (props: any) => <pre className="rounded-xl bg-[var(--code-background)] p-4 overflow-x-auto my-4" {...props} />,
};
