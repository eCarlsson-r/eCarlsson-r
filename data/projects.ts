export type ProjectCategory = "signal" | "depth" | "edge";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;

  summary: string;
  description: string;

  backend: string[];
  frontend: string[];

  highlights: string[];

  featured: boolean;
  year: number;
}

export const projects = [
    {
        slug: "payroll-system",
        title: "Payroll Management System",
        category: "signal",

        summary: "Full payroll processing platform with role-based workflows.",
        description: "Enterprise-style payroll system covering employee management, salary calculations, and reporting workflows.",

        backend: ["Laravel"],
        frontend: ["Blade"],

        highlights: [
            "Role-based access control",
            "Complex business workflow",
            "Production-style CRUD architecture"
        ],

        featured: false,
        year: 2025
    },
    {
        slug: "insurance-portal",
        title: "Insurance Management Portal",
        category: "signal",

        summary: "Business workflow system for insurance operations.",
        description: "Admin portal managing insurance policies, client records, and operational workflows.",

        backend: ["Laravel"],
        frontend: ["Inertia", "React"],

        highlights: [
            "Business data modeling",
            "Structured admin workflows",
            "Scalable Laravel architecture"
        ],

        featured: false,
        year: 2026
    },
    {
        slug: "spa-ecosystem",
        title: "Spa Management Ecosystem",
        category: "depth",

        summary: "Full ecosystem with API, POS, and booking system.",
        description: "Micro-system architecture including API backend, cashier POS, and customer booking portal.",

        backend: ["Laravel", "REST API"],
        frontend: ["Next.js", "Nuxt"],

        highlights: [
            "Multi-application architecture",
            "API-first system design",
            "Cross-platform workflows"
        ],

        featured: true,
        year: 2025
    },
    {
        slug: "commerce-ecosystem",
        title: "Retail Management Ecosystem",
        category: "depth",

        summary: "End-to-end commerce platform with POS and storefront.",
        description: "Integrated commerce system covering admin API, POS operations, and public online store.",

        backend: ["Laravel", "REST API"],
        frontend: ["Angular", "Next.js"],

        highlights: [
            "Multi-frontend ecosystem",
            "Complex transaction workflows",
            "Scalable system modularization"
        ],

        featured: true,
        year: 2026
    },
    {
        slug: "restaurant-ecosystem",
        title: "Restaurant POS & Reservation System",
        category: "depth",

        summary: "Integrated restaurant operations and reservation platform.",
        description: "System covering POS operations, menu management, and customer reservation workflows.",

        backend: ["Laravel", "REST API"],
        frontend: ["Nuxt", "AnalogJS"],

        highlights: [
            "POS architecture",
            "Multi-frontend system",
            "Real-world business workflows"
        ],

        featured: true,
        year: 2026
    },
    {
        slug: "controlmoney",
        title: "ControlMoney Finance Tracker",
        category: "edge",

        summary: "Personal finance tracking application.",
        description: "Application for managing expenses, income, and financial tracking.",

        backend: [],
        frontend: ["React Native"],

        highlights: [
            "Personal productivity tool",
            "Clean UI architecture"
        ],

        featured: false,
        year: 2026
    },
    {
        slug: "quoteplot-agent",
        title: "QuotePlot AI Agent",
        category: "edge",

        summary: "AI-powered content analysis agent.",
        description: "Experimentation project using AI pipelines and API integrations.",

        backend: ["Python", "FastAPI"],
        frontend: ["Next.js"],

        highlights: [
            "AI integration",
            "Experimental architecture"
        ],

        featured: false,
        year: 2026
    },
    {
        slug: "human-design",
        title: "Human Design Analysis System",
        category: "edge",

        summary: "System for generating human design charts.",
        description: "Application using complex calculation logic and visualization.",

        backend: ["ASP.NET Core"],
        frontend: ["Angular"],

        highlights: [
            "Complex domain logic",
            "Cross-platform architecture",
            "Non-standard business domain"
        ],

        featured: false,
        year: 2026
    },
    {
        slug: "property-management",
        title: "Property Management System",
        category: "signal",

        summary: "Modern property management platform using Laravel + Inertia.",
        description: "System for managing tenants, leases, payments, and property records with modern SPA architecture.",

        backend: ["Laravel"],
        frontend: ["Inertia", "Vue"],

        highlights: [
            "Modern Laravel stack",
            "SPA architecture",
            "Real estate domain modeling"
        ],

        featured: true,
        year: 2026
    }
] as Project[];

export const featuredProjects = projects.filter(
  (p) => p.featured === true
);

export const groupedProjects = {
  signal: projects.filter(p => p.category === "signal"),
  depth: projects.filter(p => p.category === "depth"),
  edge: projects.filter(p => p.category === "edge"),
};

export function getProject(slug: string) {
  return projects.find(p => p.slug === slug);
}