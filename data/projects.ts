import { Project } from "../core/types";

export const projects: Project[] = [
    {
        slug: "payroll-system",
        title: "Payroll Management System",
        category: "signal",

        summary: "Full payroll processing platform with role-based workflows.",
        description: "Enterprise-style payroll system covering employee management, salary calculations, and reporting workflows.",

        backend: ["Laravel"],
        frontend: ["Blade"],

        repositories: [
            {
                name: "PayrollManagementLaravel",
                type: "backend",
                owner: "eCarlsson-r",
                stack: ["Laravel", "Blade"]
            }
        ],

        highlights: [
            "Role-based access control",
            "Complex business workflow",
            "Production-style CRUD architecture"
        ],

        featured: false,
        year: 2025,
        mdxPath: "payroll-system"
    },
    {
        slug: "spa-ecosystem",
        title: "Spa Management Ecosystem",
        category: "depth",

        summary: "Full ecosystem with API, POS, and booking system.",
        description: "Micro-system architecture including API backend, cashier POS, and customer booking portal.",

        backend: ["Laravel", "REST API"],
        frontend: ["Next.js", "Nuxt"],

        repositories: [
            {
                name: "SpaInformationSystem-API",
                type: "backend",
                owner: "eCarlsson-r",
                stack: ["Laravel", "REST API"]
            },
            {
                name: "SpaCashier",
                type: "frontend",
                owner: "eCarlsson-r",
                url: "https://carlsson-spa-cashier.vercel.app",
                stack: ["Next.js"]
            },
            {
                name: "SpaBooking",
                type: "frontend",
                owner: "eCarlsson-r",
                url: "https://carlsson-spa-booking.vercel.app",
                stack: ["Nuxt"]
            }
        ],

        highlights: [
            "Multi-application architecture",
            "API-first system design",
            "Cross-platform workflows"
        ],

        slides: [
            {
                type: "image",
                src: "/images/screenshots/spa-ecosystem/spa1.png",
                alt: "Public homepage of the spa booking site"
            },
            {
                type: "image",
                src: "/images/screenshots/spa-ecosystem/spa2.png",
                alt: "Customer area with chatbot once logged in"
            },
            {
                type: "image",
                src: "/images/screenshots/spa-ecosystem/spa3.png",
                alt: "Dashboard of spa POS"
            },
            {
                type: "image",
                src: "/images/screenshots/spa-ecosystem/spa4.png",
                alt: "Sales form of POS terminal"
            }
        ],

        featured: true,
        year: 2025,
        mdxPath: "spa-ecosystem"
    },
    {
        slug: "controlmoney",
        title: "ControlMoney Finance Tracker",
        category: "edge",

        summary: "Personal finance tracking application.",
        description: "Application for managing expenses, income, and financial tracking.",

        backend: [],
        frontend: ["React Native"],

        repositories: [
            {
                name: "ControlMoney",
                type: "frontend",
                owner: "eCarlsson-r",
                stack: ["React Native"]
            }
        ],

        highlights: [
            "Personal productivity tool",
            "Clean UI architecture"
        ],

        featured: false,
        year: 2026,
        mdxPath: "control-money"
    },
    {
        slug: "insurance-portal",
        title: "Insurance Management Portal",
        category: "signal",

        summary: "Business workflow system for insurance operations.",
        description: "Admin portal managing insurance policies, client records, and operational workflows.",

        backend: ["Laravel"],
        frontend: ["Inertia", "React"],

        repositories: [
            {
                name: "InsurancePortal",
                type: "backend",
                owner: "eCarlsson-r",
                stack: ["Laravel", "Inertia", "React"]
            }
        ],

        highlights: [
            "Business data modeling",
            "Structured admin workflows",
            "Scalable Laravel architecture"
        ],

        featured: false,
        year: 2026,
        mdxPath: "insurance-portal"
    },
    {
        slug: "quoteplot-agent",
        title: "QuotePlot AI Agent",
        category: "edge",

        summary: "AI-powered content analysis agent.",
        description: "Experimentation project using AI pipelines and API integrations.",

        backend: ["Python", "FastAPI"],
        frontend: ["Next.js"],

        repositories: [
            {
                name: "QuotePlot-Agent",
                type: "service",
                owner: "eCarlsson-r",
                stack: ["Python", "FastAPI", "Next.js"]
            }
        ],

        highlights: [
            "AI integration",
            "Experimental architecture"
        ],

        featured: false,
        year: 2026,
        mdxPath: "quoteplot-agent"
    },
    {
        slug: "commerce-ecosystem",
        title: "Retail Management Ecosystem",
        category: "depth",

        summary: "End-to-end commerce platform with POS and storefront.",
        description: "Integrated commerce system covering admin API, POS operations, and public online store.",

        backend: ["Laravel", "REST API"],
        frontend: ["Angular", "Next.js"],

        repositories: [
            {
                name: "CommerceSystem-API",
                type: "backend",
                owner: "eCarlsson-r",
                stack: ["Laravel", "REST API"]
            },
            {
                name: "CommercePOS",
                type: "frontend",
                owner: "eCarlsson-r",
                url: "https://carlsson-commerce-pos.vercel.app",
                stack: ["Angular"]
            },
            {
                name: "CommerceStore",
                type: "frontend",
                owner: "eCarlsson-r",
                url: "https://carlsson-commerce-store.vercel.app",
                stack: ["Next.js"]
            }
        ],

        highlights: [
            "Multi-frontend ecosystem",
            "Complex transaction workflows",
            "Scalable system modularization"
        ],

        featured: true,
        year: 2026,
        mdxPath: "commerce-system"
    },
    {
        slug: "human-design",
        title: "Human Design Analysis System",
        category: "edge",

        summary: "System for generating human design charts.",
        description: "Application using complex calculation logic and visualization.",

        backend: ["ASP.NET Core"],
        frontend: ["Angular"],

        repositories: [
            {
                name: "HumanDesign-API",
                type: "backend",
                owner: "eCarlsson-r",
                stack: ["ASP.NET Core", "MySQL"]
            },
            {
                name: "HumanDesign",
                type: "frontend",
                owner: "eCarlsson-r",
                url: "https://carlsson-human-design.vercel.app",
                stack: ["Angular", "AnalogJS"]
            }
        ],

        highlights: [
            "Complex domain logic",
            "Cross-platform architecture",
            "Non-standard business domain"
        ],

        featured: false,
        year: 2026,
        mdxPath: "human-design"
    },
    {
        slug: "restaurant-ecosystem",
        title: "Restaurant Management System",
        category: "depth",

        summary: "Integrated restaurant operations and reservation platform.",
        description: "System covering POS operations, menu management, and customer reservation workflows.",

        backend: ["Laravel", "REST API"],
        frontend: ["Nuxt", "AnalogJS"],
        repositories: [
            {
                name: "RestoSystem-API",
                type: "backend",
                owner: "eCarlsson-r",
                stack: ["Laravel", "REST API"]
            },
            {
                name: "RestoPOS",
                type: "frontend",
                owner: "eCarlsson-r",
                url: "https://carlsson-resto-pos.vercel.app",
                stack: ["Nuxt"]
            },
            {
                name: "RestoReserve",
                type: "frontend",
                owner: "eCarlsson-r",
                url: "https://carlsson-resto-reserve.vercel.app",
                stack: ["AnalogJS"]
            }
        ],

        highlights: [
            "POS architecture",
            "Multi-frontend system",
            "Real-world business workflows"
        ],

        featured: false,
        year: 2026,
        mdxPath: "restaurant-ecosystem"
    },
    {
        slug: "property-management",
        title: "Property Management System",
        category: "signal",

        summary: "Modern property management platform using Laravel + Inertia.",
        description: "System for managing tenants, leases, payments, and property records with modern SPA architecture.",

        backend: ["Laravel"],
        frontend: ["Inertia", "Vue"],
        repositories: [
            {
                name: "PropertyManagement",
                type: "backend",
                owner: "eCarlsson-r",
                url: "",
                stack: ["Laravel", "Inertia", "Vue"]
            }
        ],

        highlights: [
            "Modern Laravel stack",
            "SPA architecture",
            "Real estate domain modeling"
        ],

        slides: [
            {
                type: "image",
                src: "/images/screenshots/property/property1.png",
                alt: "Form for editing property details."
            },
            {
                type: "image",
                src: "/images/screenshots/property/property2.png",
                alt: "Place to enquire AI regarding status of the properties."
            }
        ],

        featured: true,
        year: 2026,
        mdxPath: "property-management"
    }
];

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