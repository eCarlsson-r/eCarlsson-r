import { ProjectDomain } from "@/core/types";

// One accent per foundation, sampled from each project's own brand and
// normalized so white text passes WCAG AA (>= 4.5:1) on every swatch.
export const projectAccents: Record<string, string> = {
  "commerce-ecosystem": "#9A4D1F",
  "restaurant-ecosystem": "#94221F",
  "spa-ecosystem": "#1D64AD",
  "property-management": "#1B7BB3",
  "insurance-portal": "#2B3A96",
  "payroll-system": "#147A5F",
  "quoteplot-agent": "#4A37A8",
  "human-design": "#2F6E75",
  "carlsson-studio": "#D4AF37",
};

export const domainAccents: Record<ProjectDomain, string> = {
  "Retail": projectAccents["commerce-ecosystem"],
  "Restaurant": projectAccents["restaurant-ecosystem"],
  "Wellness": projectAccents["spa-ecosystem"],
  "Property": projectAccents["property-management"],
  "Insurance": projectAccents["insurance-portal"],
  "HR & Payroll": projectAccents["payroll-system"],
  "AI": projectAccents["quoteplot-agent"],
  "Software Platform": projectAccents["carlsson-studio"],
};

// The "Carlsson Studio ribbon" — all eight foundations side by side.
export const ribbonAccents: string[] = Object.values(projectAccents);
