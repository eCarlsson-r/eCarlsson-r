import { projects } from "@/data/projects";

export function getRepositoryCount() {
  return projects.reduce((total, p) => {
    return total + (p.repositories?.length || 0);
  }, 0);
}

export function getTechStack() {
  const stack = new Set<string>();

  projects.forEach(p => {
    p.backend.forEach(t => stack.add(t));
    p.frontend.forEach(t => stack.add(t));

    p.repositories?.forEach(r => {
      r.stack.forEach(t => stack.add(t));
    });
  });

  return [...stack];
}

export function getProjectStats() {
  const repoCount = getRepositoryCount();
  const techStack = getTechStack();

  return {
    projectCount: projects.length,
    repositoryCount: repoCount,
    techStackCount: techStack.length,
    techStack
  };
}