"use client";

import ProjectHeader from "./ProjectHeader";
import MDXRenderer from "../mdx/MdxRenderer";

export default function ProjectClient({project, mdxSource}: any) {
    return (
        <div className="max-w-4xl mx-auto py-20 px-6">
            {/* Title */}
            <ProjectHeader project={project} />
            
            <div className="p-4 rounded-xl bg-sky-50 dark:bg-white/5 my-10 text-center text-sm">
            This project accounts for <strong>{project.focusIndex * 100}%</strong> of total engineering activity
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