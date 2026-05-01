export type ProjectCategory = "signal" | "depth" | "edge";
export type ProjectDomain = "Business Suite" | "Enterprise" | "SaaS" | "AI Agents";

export interface Repository {
  name: string;
  owner: string;
  url?: string;
  type: "backend" | "frontend" | "mobile" | "api" | "service";
  stack: string[];
}

export type Slide = {
  type: "image" | "video";
  src: string;
  alt?: string;
};

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  domain: ProjectDomain;

  summary: string;
  description: string;

  repositories: Repository[];

  backend: string[];
  frontend: string[];

  highlights: string[];

  featured: boolean;
  year: number;
  signals?: ProcessedProject | null;
  activity?: {
    currentStreak: number,
    longestStreak: number,
    totalActiveDays: number,
    score: number,
    level: string
  } | null;
  mdxPath?: string;
  focusIndex?: number;
  slides?: Slide[];
}

export interface RepoData {
  commitCount: number;
  firstCommit: string;
  lastCommit: string;
  languages: string[];
}

export interface Scores {
  execution: number;
  complexity: number;
  ownership: number;
}

export interface Summary {
  executionLevel: "High" | "Medium" | "Low";
  complexityLevel: "High" | "Medium" | "Low";
  ownershipLevel: "High" | "Medium" | "Low";
}

export interface ProcessedProject {
  id: string;
  scores: Scores;
  summary: Summary;
}

export interface LiveSignals {
  activityPulse: string;
  executionVelocity: string;
  momentum: string;
  consistencyScore: number;
  commitsLast30Days: number;
  techFocus: Record<string, number>;
}