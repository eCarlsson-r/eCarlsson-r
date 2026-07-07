export type ArchNodeKind = "frontend" | "backend" | "database" | "ai" | "external";

export interface ArchNode {
  id: string;
  label: string;
  tech?: string;
  kind: ArchNodeKind;
  description: string;
}

export interface ArchEdge {
  from: string;
  to: string;
}

export interface Architecture {
  nodes: ArchNode[];
  edges: ArchEdge[];
}

export const architectures: Record<string, Architecture> = {
  "commerce-ecosystem": {
    nodes: [
      { id: "pos", label: "CommercePOS", tech: "Angular", kind: "frontend", description: "In-store point-of-sale used by cashiers. Optimized for fast product lookup and checkout at the counter." },
      { id: "store", label: "CommerceStore", tech: "Next.js", kind: "frontend", description: "Commission-free online storefront where customers browse the catalog and place orders." },
      { id: "api", label: "CommerceSystem-API", tech: "Laravel · REST", kind: "backend", description: "Single source of truth for products, stock, pricing, and transactions. All writes flow through here." },
      { id: "db", label: "MySQL", kind: "database", description: "Relational store for the catalog, inventory, and transaction history." },
    ],
    edges: [
      { from: "pos", to: "api" },
      { from: "store", to: "api" },
      { from: "api", to: "db" },
    ],
  },
  "restaurant-ecosystem": {
    nodes: [
      { id: "pos", label: "RestoPOS", tech: "Nuxt", kind: "frontend", description: "Floor terminal for orders, tables, and kitchen workflow." },
      { id: "reserve", label: "RestoReserve", tech: "AnalogJS", kind: "frontend", description: "Public reservation site where customers book tables per branch." },
      { id: "api", label: "RestoSystem-API", tech: "Laravel · REST", kind: "backend", description: "Owns orders, menus, tables, reservations, and the accumulated analytics data." },
      { id: "db", label: "MySQL", kind: "database", description: "Relational store for orders, reservations, menus, and branches." },
      { id: "ai", label: "Analytics Engine", kind: "ai", description: "14-day demand forecasting, menu clustering, and natural-language Q&A over sales history." },
    ],
    edges: [
      { from: "pos", to: "api" },
      { from: "reserve", to: "api" },
      { from: "api", to: "db" },
      { from: "api", to: "ai" },
    ],
  },
  "spa-ecosystem": {
    nodes: [
      { id: "cashier", label: "SpaCashier", tech: "Next.js", kind: "frontend", description: "Front-desk POS for walk-ins, payments, and service checkout." },
      { id: "booking", label: "SpaBooking", tech: "Nuxt", kind: "frontend", description: "Customer booking portal with real-time availability." },
      { id: "api", label: "SpaInformationSystem-API", tech: "Laravel · REST", kind: "backend", description: "Computes availability from staff schedules and existing bookings; owns services, inventory, and branches." },
      { id: "db", label: "MySQL", kind: "database", description: "Relational store for bookings, rosters, services, and stock." },
    ],
    edges: [
      { from: "cashier", to: "api" },
      { from: "booking", to: "api" },
      { from: "api", to: "db" },
    ],
  },
  "insurance-portal": {
    nodes: [
      { id: "app", label: "InsurancePortal PWA", tech: "React · Inertia", kind: "frontend", description: "Installable, offline-capable app agents use in the field. Syncs when back online." },
      { id: "backend", label: "Laravel Backend", kind: "backend", description: "Server-owned business rules for policies, customers, production, and bonus tracking." },
      { id: "ai", label: "IBM Granite", kind: "ai", description: "Reads uploaded policy documents to pre-fill data and powers the bilingual dashboard." },
      { id: "db", label: "MySQL", kind: "database", description: "Relational store for policies, customers, and production records." },
    ],
    edges: [
      { from: "app", to: "backend" },
      { from: "backend", to: "ai" },
      { from: "backend", to: "db" },
    ],
  },
  "property-management": {
    nodes: [
      { id: "app", label: "UrusProperti App", tech: "Vue · Inertia", kind: "frontend", description: "Single-page app for listings, tenants, leases, payments, and maintenance requests." },
      { id: "backend", label: "Laravel Backend", tech: "Cloud Run", kind: "backend", description: "Domain logic for the real-estate model, deployed on Google Cloud Run." },
      { id: "ai", label: "AI Insights", kind: "ai", description: "Generates portfolio health summaries from live property data." },
      { id: "db", label: "MySQL", kind: "database", description: "Relational store enforcing the property → unit → lease → tenant model." },
    ],
    edges: [
      { from: "app", to: "backend" },
      { from: "backend", to: "ai" },
      { from: "backend", to: "db" },
    ],
  },
  "payroll-system": {
    nodes: [
      { id: "dash", label: "HR Dashboard", tech: "Laravel Blade", kind: "frontend", description: "Web interface where HR manages employees, salary components, and payroll runs." },
      { id: "core", label: "Laravel Core", kind: "backend", description: "Models employees, components, deductions, and statutory rules as first-class records." },
      { id: "agents", label: "4-Agent Pipeline", kind: "ai", description: "Validation → calculation → compliance → disbursement. A full payroll run takes ~13 seconds." },
      { id: "db", label: "MySQL", kind: "database", description: "Relational store for employees, payroll history, and payslips." },
    ],
    edges: [
      { from: "dash", to: "core" },
      { from: "core", to: "agents" },
      { from: "core", to: "db" },
    ],
  },
  "human-design": {
    nodes: [
      { id: "app", label: "HumanDesign App", tech: "Angular · AnalogJS", kind: "frontend", description: "Interactive chart visualization and report reading for practitioners." },
      { id: "api", label: "HumanDesign-API", tech: "ASP.NET Core", kind: "backend", description: "Deterministic chart calculation engine — the precision-critical core of the domain." },
      { id: "ai", label: "AI Report Generator", kind: "ai", description: "Turns computed chart data into personalized written analyses, grounded in the calculated results." },
      { id: "db", label: "MySQL", kind: "database", description: "Relational store for client records and computed charts." },
    ],
    edges: [
      { from: "app", to: "api" },
      { from: "api", to: "ai" },
      { from: "api", to: "db" },
    ],
  },
  "quoteplot-agent": {
    nodes: [
      { id: "ui", label: "QuotePlot UI", tech: "Next.js", kind: "frontend", description: "Stock list, interactive charts, and the chat panel." },
      { id: "api", label: "FastAPI Service", tech: "Python", kind: "backend", description: "Hosts the agent that translates natural-language questions into analyses." },
      { id: "svm", label: "SVM Pipeline", kind: "ai", description: "Signal classification at 86% accuracy backing the agent's assessments with a real model." },
      { id: "market", label: "Market Data APIs", kind: "external", description: "Real-time price and stock data ingestion from external providers." },
    ],
    edges: [
      { from: "ui", to: "api" },
      { from: "api", to: "svm" },
      { from: "api", to: "market" },
    ],
  },
};
