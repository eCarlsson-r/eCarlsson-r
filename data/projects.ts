import { Project } from "../core/types";

export const projects: Project[] = [
    {
        slug: "payroll-system",
        title: "Payroll Management System",
        category: "signal",
        domain: "HR & Payroll",

        summary: "HR teams were losing hours to spreadsheet payroll calculations that were error-prone, manual, and impossible to audit accurately.",
        description: "Automates payroll calculation, tax compliance, and salary disbursement globally.",
        outcome: "PPh 21 + BPJS + UMR compliance. 4 AI agents. 13-second pipeline.",

        backend: ["Laravel"],
        frontend: ["Blade"],

        repositories: [
            {
                name: "PayrollManagementLaravel",
                type: "backend",
                owner: "eCarlsson-r",
                url: "https://payroll.carlssonstudio.com/",
                stack: ["Laravel", "Blade"]
            }
        ],

        highlights: [
            "Role-based access control",
            "Complex business workflow",
            "Production-style CRUD architecture"
        ],

        slides: [
            {
                type: "image",
                src: "/images/PayrollManagement.png",
                alt: "PayrollManagement system overview showing the dashboard and AI workflow."
            },
            {
                type: "image",
                src: "/images/screenshots/payroll/payroll1.png",
                alt: "User gets to modify their own profile once logged in."
            },
            {
                type: "image",
                src: "/images/screenshots/payroll/payroll2.png",
                alt: "Managers get to organize their own team, who to recruit to team and terminate from team."
            }
        ],

        featured: false,
        year: 2025,
        mdxPath: "payroll-system"
    },
    {
        slug: "quoteplot-agent",
        title: "QuotePlot AI Agent",
        category: "edge",
        domain: "AI",

        summary: "Users needed quick answers about Web3 stock status and conditions beyond price checks, but lacked real-time intelligent research tools.",
        description: "Delivers real-time stock intelligence through natural language queries.",
        outcome: "SVM-powered pipeline with 86% accuracy on stock predictions and insights.",

        backend: ["Python", "FastAPI"],
        frontend: ["Next.js"],

        repositories: [
            {
                name: "QuotePlot-Agent",
                type: "service",
                owner: "eCarlsson-r",
                url: "https://carlsson-quoteplot-agent.vercel.app",
                stack: ["Python", "FastAPI", "Next.js"]
            }
        ],

        highlights: [
            "AI integration",
            "Experimental architecture"
        ],

        slides: [
            {
                type: "image",
                src: "/images/QuotePlot-Agent.png",
                alt: "QuotePlot Agent product image."
            },
            {
                type: "image",
                src: "/images/screenshots/quoteplot.png",
                alt: "The QuotePlot Agent page featuring stock list, stock chart, and chat panel."
            }
        ],

        featured: false,
        year: 2026,
        mdxPath: "quoteplot-agent"
    },
    {
        slug: "restaurant-ecosystem",
        title: "Restaurant Business Suite",
        category: "depth",
        domain: "Restaurant",

        summary: "Restaurant operators juggled separate tools for POS, kitchen orders, and reservations, losing visibility and operational efficiency daily.",
        description: "Combines POS, reservations, kitchen workflow, and analytics into one platform.",
        outcome: "14-day demand forecast, menu clustering, and natural language Q&A capabilities.",

        backend: ["Laravel"],
        frontend: ["Nuxt", "AnalogJS"],
        repositories: [
            {
                name: "RestoSystem-API",
                type: "backend",
                owner: "eCarlsson-r",
                stack: ["Laravel"]
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

        slides: [
            {
                type: "image",
                src: "/images/RestoSystem.png",
                alt: "RestoSystem ecosystem overview showing the cashier POS, and customer booking portal."
            },
            {
                type: "image",
                src: "/images/screenshots/resto-system/resto1.png",
                alt: "Public homepage of the restaurant's site below banner"
            },
            {
                type: "image",
                src: "/images/screenshots/resto-system/resto2.png",
                alt: "Category page for each branch"
            },
            {
                type: "image",
                src: "/images/screenshots/resto-system/pos1.png",
                alt: "Dashboard of the POS (for admin)"
            },
            {
                type: "image",
                src: "/images/screenshots/resto-system/pos2.png",
                alt: "Table view on POS terminal"
            }
        ],

        featured: false,
        year: 2026,
        mdxPath: "restaurant-ecosystem"
    },
    {
        slug: "insurance-portal",
        title: "Insurance Portal",
        category: "signal",
        domain: "Insurance",

        summary: "Insurance brokers drowned in policy paperwork and couldn't quickly answer client questions about coverage, renewals, or claims.",
        description: "Centralizes policy, claim, and customer management for insurance agencies.",
        outcome: "IBM Granite bilingual AI dashboard with offline PWA capabilities enabled.",

        backend: ["Laravel"],
        frontend: ["Inertia", "React"],

        repositories: [
            {
                name: "InsurancePortal",
                type: "backend",
                owner: "eCarlsson-r",
                url: "https://insurance.carlssonstudio.com",
                stack: ["Laravel", "Inertia", "React"]
            }
        ],

        highlights: [
            "Business data modeling",
            "Structured admin workflows",
            "Scalable Laravel architecture"
        ],

        slides: [
            {
                type: "image",
                src: "/images/InsurancePortal.png",
                alt: "Insurance Portal interface."
            },
            {
                type: "image",
                src: "/images/screenshots/insurance/insurance1.png",
                alt: "Get updated with the productions of the agent for the given month."
            },
            {
                type: "image",
                src: "/images/screenshots/insurance/insurance2.png",
                alt: "Get updated with the achievement of the team for bonuses."
            },
            {
                type: "image",
                src: "/images/screenshots/insurance/insurance3.png",
                alt: "Adding new policy only with uploading and AI will read the data."
            },
            {
                type: "image",
                src: "/images/screenshots/insurance/insurance4.png",
                alt: "Entering customer data becomes easier with collapsible subgroups of fields."
            }
        ],

        featured: false,
        year: 2026,
        mdxPath: "insurance-portal"
    },
    {
        slug: "carlsson-studio",
        title: "Carlsson Studio",
        category: "edge",
        domain: "Software Platform",

        summary: "Companies couldn't easily discover which proven business systems matched their needs, leading to wasted time and misaligned software decisions.",

        description: "Matches company needs to proven business foundations through discovery and recommendation engine.",

        outcome: "AI recommendation engine, interactive discovery, and proposal generation system built.",

        backend: ["Java", "Spring Boot"],
        frontend: ["Next.js"],

        repositories: [
            {
                name: "Carlsson-Studio",
                type: "frontend",
                owner: "eCarlsson-r",
                url: "https://carlssonstudio.com",
                stack: ["Next.js", "Java", "Spring Boot"]
            },
            {
                name: "CarlssonStudio-API",
                type: "backend",
                owner: "eCarlsson-r",
                stack: ["Java", "Spring Boot"]
            }
        ],

        highlights: [
            "AI-assisted business discovery",
            "Foundation recommendation engine",
            "Interactive software architecture",
            "Proposal generation",
            "Reusable software ecosystem"
        ],

        slides: [
            {
                type: "image",
                src: "/images/CarlssonStudio.png",
                alt: "Carlsson Studio homepage."
            }
        ],

        featured: true,
        year: 2026,
        mdxPath: "carlsson-studio"
    },
    {
        slug: "spa-ecosystem",
        title: "Spa Business Suite",
        category: "depth",
        domain: "Wellness",

        summary: "Spa operators lost bookings to no-shows and double-bookings, with staff manually tracking services across paper and disconnected systems.",
        description: "Covers bookings, staff scheduling, and payments for multi-location wellness businesses.",
        outcome: "Multi-branch booking, staff scheduling, inventory system in one platform.",

        backend: ["Laravel"],
        frontend: ["Next.js", "Nuxt"],

        repositories: [
            {
                name: "SpaInformationSystem-API",
                type: "backend",
                owner: "eCarlsson-r",
                stack: ["Laravel"]
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
                src: "/images/SpaSystem.png",
                alt: "SpaSystem ecosystem overview showing the cashier POS, and customer booking portal."
            }
        ],

        featured: false,
        year: 2025,
        mdxPath: "spa-ecosystem"
    },
    {
        slug: "property-management",
        title: "Property Management Tool",
        category: "signal",
        domain: "Property",

        summary: "Property managers tracked leases, tenants, and maintenance across spreadsheets and email threads with no unified system or visibility.",
        description: "Manages property listings, tenant records, and lease tracking end-to-end efficiently.",
        outcome: "Top 100 · Google Gen AI Academy APAC Cohort 1 finalist and award winner.",
        certificateFile: "/certificates/apac-genai-top100.pdf",

        backend: ["Laravel"],
        frontend: ["Inertia", "Vue"],
        repositories: [
            {
                name: "PropertyManagement",
                type: "backend",
                owner: "eCarlsson-r",
                url: "https://property-management-81090249533.asia-southeast1.run.app",
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
                src: "/images/UrusProperti.png",
                alt: "UrusProperti at a glance."
            },
            {
                type: "image",
                src: "/images/screenshots/property/dashboard.png",
                alt: "Dashboard of user logged into UrusProperti showing overview of properties, tenants, and maintenance requests."
            },
            {
                type: "image",
                src: "/images/screenshots/property/edit-property.png",
                alt: "Edit property page in UrusProperti."
            },
            {
                type: "image",
                src: "/images/screenshots/property/ai-insight.png",
                alt: "AI insights page in UrusProperti."
            }
        ],

        featured: true,
        year: 2026,
        mdxPath: "property-management"
    },  
    {
        slug: "human-design",
        title: "Human Design Platform",
        category: "edge",
        domain: "AI",

        summary: "Human Design practitioners manually created personalized analyses for each client from raw chart data, a time-consuming manual process.",
        description: "Generates personalized analysis and business compatibility reports using AI-powered insights.",
        outcome: "Top 30 · Nusantara Elevate AI Talent Challenge finalist and recognized winner.",
        certificatePending: true,

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

        slides: [
            {
                type: "image",
                src: "/images/HumanDesign.png",
                alt: "HumanDesign at a glance"
            }
        ],

        featured: true,
        year: 2026,
        mdxPath: "human-design"
    },
    {
        slug: "commerce-ecosystem",
        title: "Retail Business Suite",
        category: "depth",
        domain: "Retail",

        summary: "Retailers juggled separate tools for POS and e-commerce, causing inventory drift, double-selling, and lost revenue from channel conflicts.",
        description: "Automates retail sales, inventory management, and storefront across multiple channels.",
        outcome: "Zero commission model with full real-time inventory sync across channels.",

        backend: ["Laravel"],
        frontend: ["Angular", "Next.js"],

        repositories: [
            {
                name: "CommerceSystem-API",
                type: "backend",
                owner: "eCarlsson-r",
                stack: ["Laravel"]
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

        slides: [
            {
                type: "image",
                src: "/images/CommerceSystem.png",
                alt: "CommerceSystem ecosystem overview showing the cashier POS, and e-commerce."
            }
        ],

        featured: false,
        year: 2026,
        mdxPath: "commerce-system"
    }
];

export const featuredProjects = projects.filter(
  (p) => p.featured === true
);

export function getProject(slug: string) {
  return projects.find(p => p.slug === slug);
}