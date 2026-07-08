"use server";

import { Project } from '@/core/types';
import fs from 'fs';
import path from 'path';

export async function loadProjectSignals(projectSlug: string) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'processed-signals.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const signals = JSON.parse(data);
    const signal = signals.find((s: { id: string }) => s.id === projectSlug);
    return signal || null;
  } catch (error) {
    console.error('Error loading project signals:', error);
    return null;
  }
}

export async function loadProjects(grouped = false) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'enriched-projects.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const projects = JSON.parse(data);
    if (grouped) {
      const groupedProjects: Record<string, Project[]> = {};
      projects.forEach((project: Project) => {
        const category = project.category || 'Uncategorized';
        if (!groupedProjects[category]) {
          groupedProjects[category] = [];
        }
        groupedProjects[category].push(project);
      });
      return groupedProjects;
    }
    return projects;
  } catch (error) {
    console.error('Error loading all projects:', error);
    return [];
  }
}