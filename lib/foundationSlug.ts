import { projects } from "@/data/projects";

/**
 * The API refers to foundations by its own slugs/names (e.g. "resto-system",
 * "RestoSystem") which differ from this site's project slugs
 * (e.g. "restaurant-ecosystem"). Resolve an API recommendation to a local
 * project slug so we can link to the case study, or null if there's no page.
 */

const slugAliases: Record<string, string> = {
  "resto-system": "restaurant-ecosystem",
  "restaurant-system": "restaurant-ecosystem",
  "restaurant-ecosystem": "restaurant-ecosystem",
  "commerce-system": "commerce-ecosystem",
  "commerce-ecosystem": "commerce-ecosystem",
  "retail-system": "commerce-ecosystem",
  "spa-system": "spa-ecosystem",
  "spa-ecosystem": "spa-ecosystem",
  "insurance-portal": "insurance-portal",
  "insurance-system": "insurance-portal",
  "property-management": "property-management",
  "property-system": "property-management",
  "urus-properti": "property-management",
  "payroll-system": "payroll-system",
  "payroll-agent": "payroll-system",
  "quoteplot-agent": "quoteplot-agent",
  "quoteplot": "quoteplot-agent",
  "human-design": "human-design",
  "carlsson-studio": "carlsson-studio",
  "software-platform": "carlsson-studio",
};

const nameAliases: Record<string, string> = {
  restosystem: "restaurant-ecosystem",
  commercesystem: "commerce-ecosystem",
  spasystem: "spa-ecosystem",
  insuranceportal: "insurance-portal",
  urusproperti: "property-management",
  payrollagent: "payroll-system",
  quoteplotagent: "quoteplot-agent",
  quoteplot: "quoteplot-agent",
  humandesign: "human-design",
  carlssonstudio: "carlsson-studio",
};

const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

export function resolveProjectSlug(foundationSlug: string, foundationName?: string): string | null {
  const validSlugs = new Set(projects.map((p) => p.slug));

  if (foundationSlug && validSlugs.has(foundationSlug)) return foundationSlug;

  const bySlug = foundationSlug && slugAliases[foundationSlug.toLowerCase()];
  if (bySlug && validSlugs.has(bySlug)) return bySlug;

  if (foundationName) {
    const byName = nameAliases[normalize(foundationName)];
    if (byName && validSlugs.has(byName)) return byName;
  }

  return null;
}
