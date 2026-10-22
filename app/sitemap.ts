import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { listInsights } from "@/lib/hooks/loadInsights";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://carlssonstudio.com";
  const now = new Date();

  const staticRoutes = ["", "/projects", "/insights", "/start-a-project"];

  const entries: MetadataRoute.Sitemap = [];

  // Generate localized URLs with alternates for static routes
  for (const route of staticRoutes) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: now,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((loc) => [loc, `${baseUrl}/${loc}${route}`])
          ),
        },
      });
    }
  }

  // Projects
  for (const project of projects) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${baseUrl}/${locale}/projects/${project.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((loc) => [
              loc,
              `${baseUrl}/${loc}/projects/${project.slug}`,
            ])
          ),
        },
      });
    }
  }

  // Insights
  const insights = listInsights();
  for (const insight of insights) {
    const lastModified = insight.date ? new Date(insight.date) : now;
    for (const locale of routing.locales) {
      entries.push({
        url: `${baseUrl}/${locale}/insights/${insight.slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((loc) => [
              loc,
              `${baseUrl}/${loc}/insights/${insight.slug}`,
            ])
          ),
        },
      });
    }
  }

  // Standalone non-localized landing page
  entries.push({
    url: `${baseUrl}/quick-match`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  });

  return entries;
}
