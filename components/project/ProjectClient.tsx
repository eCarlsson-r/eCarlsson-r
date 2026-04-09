"use client";

import { useProjectsWithSignals } from "@/lib/hooks/useProjectsWithSignals";
import ProjectHeader from "./ProjectHeader";
import MDXRenderer from "../mdx/MdxRenderer";

export default function ProjectClient({project, mdxSource}: any) {
    const [enriched] = useProjectsWithSignals([project]);

    const finalProject = enriched || project;

    return (
        <div className="max-w-4xl mx-auto py-20 px-6">
            {/* Title */}
            <ProjectHeader project={finalProject} />
            
            <div className="p-4 rounded-xl bg-sky-50 dark:bg-white/5 my-10 text-center text-sm">
            High execution project with strong ownership and complex domain modelling.
            </div>

            {/* 🔥 MDX CONTENT */}
            {mdxSource ? (
                <MDXRenderer source={mdxSource} />
            ) : (
                <p className="text-gray-500">No documentation available.</p>
            )}
        </div>
    );
};