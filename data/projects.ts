import { Project } from "../core/types";

export const projects: Project[] = [
    {
        slug: "human-design",
        title: "Human Design Platform",
        category: "edge",
        domain: "AI",

        summary: "Practitioners needed personalised written analyses for every client but were producing them by hand from raw chart data.",
        description: "Generates personality analysis and business compatibility reports using AI.",
        outcome: "Top 30 · Nusantara Elevate AI Talent Challenge",
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
        slug: "property-management",
        title: "Property Management Tool",
        category: "signal",
        domain: "Property",

        summary: "Property managers were tracking leases, tenants and maintenance requests across spreadsheets and email threads.",
        description: "Manages property listings, tenant records, and lease tracking end-to-end.",
        outcome: "Top 100 · Google Gen AI Academy APAC Cohort 1",
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
        slug: "restaurant-ecosystem",
        title: "Restaurant Business Suite",
        category: "depth",
        domain: "Restaurant",

        summary: "Restaurant owners could not see what was happening across the floor, the kitchen and the reservation book without walking between tools.",
        description: "Combine POS, reservations, kitchen workflow & analytics into 1 platform.",
        outcome: "14-day demand forecast. Menu clustering. Natural language Q&A.",

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

        featured: true,
        year: 2026,
        mdxPath: "restaurant-ecosystem"
    },
    {
        slug: "spa-ecosystem",
        title: "Spa Business Suite",
        category: "depth",
        domain: "Wellness",

        summary: "Spa owners were losing bookings to no-shows and double-bookings while staff manually tracked services across paper schedules.",
        description: "Covers bookings, staff scheduling, and payments for wellness businesses.",
        outcome: "Multi-branch booking, staff scheduling, and inventory in one system.",

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
        slug: "insurance-portal",
        title: "Insurance Portal",
        category: "signal",
        domain: "Insurance",

        summary: "Brokers were drowning in policy paperwork and couldn't quickly answer client questions about coverage or renewals.",
        description: "Centralizes policy, claim, and customer management for insurance agencies.",
        outcome: "IBM Granite bilingual AI dashboard. Offline PWA.",

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
        slug: "commerce-ecosystem",
        title: "Retail Business Suite",
        category: "depth",
        domain: "Retail",

        summary: "Independent retailers were juggling separate tools for in-store sales and their online storefront, leading to inventory drift and lost revenue.",
        description: "Automates retail sales, inventory, and storefront across multiple channels.",
        outcome: "Zero commission. Full inventory sync across POS and storefront.",

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

        featured: true,
        year: 2026,
        mdxPath: "commerce-system"
    },
    {
        slug: "quoteplot-agent",
        title: "QuotePlot AI Agent",
        category: "edge",
        domain: "AI",

        summary: "Agent where users enquire about the status and condition of current Web3 stocks to, other than checking price and trends.",
        description: "Delivers real-time stock intelligence through natural language queries.",
        outcome: "SVM pipeline, 86% accuracy. Real-time stock intelligence.",

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
        slug: "payroll-system",
        title: "Payroll Management System",
        category: "signal",
        domain: "HR & Payroll",

        summary: "An HR team was spending days each month on spreadsheet payroll calculations that were error-prone and hard to audit.",
        description: "Automates payroll calculation, tax compliance, and salary disbursement.",
        outcome: "PPh 21 + BPJS + UMR compliance. 4 agents. 13-second pipeline.",

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