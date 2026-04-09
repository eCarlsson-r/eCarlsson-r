"use client";
import { useEffect, useState } from 'react';

export function useProjectsWithSignals(projects: any[]) {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetch('../../data/processed-signals.json')
            .then((response) => response.json())
            .then((signals) => {
                const merged = projects.map((project) => {
                    const signal = signals.find((s: any) => s.id === project.slug);
                    return { ...project, signals: signal || null };
                });
                setData(merged);
            });
    }, [projects]);

    return data;
}