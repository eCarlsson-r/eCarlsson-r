"use client";

import { useEffect, useState } from "react";
import { compileMDX, CompileMDXResult } from "next-mdx-remote/rsc";
import ProjectHeader from "./ProjectHeader";
import MDXRenderer from "../mdx/MdxRenderer";
import ProjectCarousel from "./ProjectCarousel";

const mdxComponents = {
  h1: (props: any) => <h1 className="text-4xl font-bold my-5 mb-6" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-semibold my-4 mb-4" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-semibold my-3 mb-3" {...props} />,
  p: (props: any) => <p className="leading-8 text-gray-900 dark:text-gray-100 mt-6 mb-6" {...props} />,
  a: (props: any) => <a className="text-primary hover:text-secondary transition" {...props} />,
  ul: (props: any) => <ul className="list-disc ml-6 mb-6 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal ml-6 mb-6 space-y-2" {...props} />,
  li: (props: any) => <li className="text-gray-900 dark:text-gray-100" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4" {...props} />,
  code: (props: any) => <code className="rounded bg-red-950 text-red-100 px-1 py-0.5 text-sm" {...props} />,
  pre: (props: any) => <pre className="rounded-xl bg-red-950 p-4 overflow-x-auto my-4" {...props} />,
  img: (props: any) => <img className="max-w-full rounded-lg my-4" {...props} />,
  table: (props: any) => <table className="border-collapse w-full my-4" {...props} />,
  th: (props: any) => <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-100 dark:bg-gray-800" {...props} />,
  td: (props: any) => <td className="border border-gray-300 dark:border-gray-600 px-4 py-2" {...props} />,
};

export default function ProjectClient({project, mdxContent}: any) {
    const [mdxSource, setMdxSource] = useState<CompileMDXResult<Record<string, unknown>> | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const compileMdx = async () => {
            if (mdxContent) {
                try {
                    const compiled = await compileMDX({ 
                      source: mdxContent,
                      components: mdxComponents 
                    });
                    setMdxSource(compiled);
                } catch (error) {
                    console.error("Failed to compile MDX:", error);
                }
            }
            setLoading(false);
        };
        compileMdx();
    }, [mdxContent]);

    return (
        <div className="max-w-4xl mx-auto py-20 px-6">
            {/* Title */}
            <ProjectHeader project={project} />
            
            {project.focusIndex && (<div className="p-4 rounded-xl bg-sky-50 dark:bg-white/5 my-10 text-center text-sm">
            This project accounts for <strong>{project.focusIndex * 100}%</strong> of total engineering activity
            </div>)}

            {project.slides && project.slides.length > 0 && (
              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
                <ProjectCarousel slides={project.slides} />
              </div>
            )}

            {/* 🔥 MDX CONTENT */}
            {!loading ? (
                mdxSource ? (
                    <MDXRenderer source={mdxSource} />
                ) : (
                    <p className="text-gray-500">No documentation available.</p>
                )
            ) : (
                <p className="text-gray-500">Loading documentation...</p>
            )}
        </div>
    );
};