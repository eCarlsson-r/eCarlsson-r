export interface SnapshotRow {
  label: string;
  values: string[];
}

export interface Feature {
  emoji: string;
  title: string;
  description: string;
}

export interface Highlight {
  label: string;
  items: string[];
}

export interface FoundationGroup {
  group: string;
  modules: string[];
}

export interface CaseStudy {
  snapshot: SnapshotRow[];
  workflow: string[];
  features: Feature[];
  highlights: Highlight[];
  extensions: string[];
  foundation: FoundationGroup[];
  idealFor: string[];
}

const foundationModules = [
  "Authentication",
  "Roles & Permissions",
  "Dashboard",
  "Notifications",
  "File Uploads",
  "Reporting",
];

export const caseStudies: Record<string, CaseStudy> = {
  "property-management": {
    snapshot: [
      { label: "Industry", values: ["Property Management"] },
      { label: "Users", values: ["Property Managers"] },
      { label: "Platform", values: ["Web Application"] },
      { label: "Tech", values: ["Laravel", "Vue", "Inertia"] },
      { label: "Deployment", values: ["Google Cloud Run"] },
      { label: "Recognition", values: ["Top 100 — Google Cloud GenAI Academy APAC"] },
    ],
    workflow: [
      "Manager creates property",
      "Tenant assigned",
      "Lease created",
      "Payments tracked",
      "AI summarizes portfolio",
    ],
    features: [
      { emoji: "🏠", title: "Property Management", description: "Manage listings and units" },
      { emoji: "👥", title: "Tenant Management", description: "Track tenants and history" },
      { emoji: "📄", title: "Lease Tracking", description: "Terms, renewals, and payment status" },
      { emoji: "🔧", title: "Maintenance", description: "Request intake and resolution" },
      { emoji: "📈", title: "Analytics", description: "Income, occupancy, vacancy" },
      { emoji: "🤖", title: "AI Insights", description: "Portfolio summaries" },
    ],
    highlights: [
      { label: "Authentication", items: ["Laravel Breeze", "Role-based access"] },
      { label: "Deployment", items: ["Google Cloud Run"] },
      { label: "Database", items: ["MySQL"] },
      { label: "Pattern", items: ["SPA", "Inertia"] },
      { label: "API", items: ["Server-driven — no REST layer"] },
      { label: "AI", items: ["Gemini"] },
    ],
    extensions: [
      "Mobile App",
      "Payment Gateway",
      "WhatsApp Reminder",
      "AI Chat Assistant",
      "OCR Receipts",
      "Accounting Export",
    ],
    foundation: [
      { group: "Foundation Modules", modules: foundationModules },
      { group: "Property Modules", modules: ["Properties", "Units", "Leases", "Tenants", "Payments", "Maintenance"] },
      { group: "AI Modules", modules: ["Portfolio Summary", "Occupancy Analysis", "Recommendation Engine"] },
    ],
    idealFor: [
      "Property management companies",
      "Apartment operators",
      "Boarding house owners",
      "Co-working spaces",
      "Commercial landlords",
      "Mixed-use properties",
    ],
  },

  "insurance-portal": {
    snapshot: [
      { label: "Industry", values: ["Insurance"] },
      { label: "Users", values: ["Insurance Agents", "Agency Admins"] },
      { label: "Platform", values: ["Web Application", "Offline PWA"] },
      { label: "Tech", values: ["Laravel", "React", "Inertia"] },
      { label: "Deployment", values: ["insurance.carlssonstudio.com"] },
    ],
    workflow: [
      "Agent uploads policy document",
      "AI extracts policy data",
      "Customer record linked",
      "Monthly production tracked",
      "Team bonus progress updated",
    ],
    features: [
      { emoji: "📄", title: "Policy Management", description: "AI-assisted entry from uploaded documents" },
      { emoji: "👥", title: "Customer Records", description: "Structured, collapsible data entry" },
      { emoji: "📊", title: "Production Tracking", description: "Per-agent monthly numbers" },
      { emoji: "🏆", title: "Team Achievements", description: "Bonus progress at a glance" },
      { emoji: "🤖", title: "AI Dashboard", description: "Bilingual, powered by IBM Granite" },
      { emoji: "📱", title: "Offline PWA", description: "Works without a connection in the field" },
    ],
    highlights: [
      { label: "Authentication", items: ["Laravel", "Role-based access"] },
      { label: "Pattern", items: ["SPA", "Inertia", "PWA"] },
      { label: "Database", items: ["MySQL"] },
      { label: "AI", items: ["IBM Granite"] },
      { label: "Offline", items: ["App-shell cache", "Sync on reconnect"] },
      { label: "Deployment", items: ["Self-hosted"] },
    ],
    extensions: [
      "WhatsApp Renewal Reminders",
      "Claims Workflow",
      "Payment Gateway",
      "Commission Calculator",
      "OCR for Paper Archives",
      "Mobile App",
    ],
    foundation: [
      { group: "Foundation Modules", modules: foundationModules },
      { group: "Insurance Modules", modules: ["Policies", "Customers", "Productions", "Achievements", "Renewals"] },
      { group: "AI Modules", modules: ["Document Extraction", "Bilingual Insights"] },
    ],
    idealFor: [
      "Insurance agencies",
      "Independent brokers",
      "Agent teams with bonus schemes",
      "Financial advisors",
      "Multi-branch agencies",
    ],
  },

  "restaurant-ecosystem": {
    snapshot: [
      { label: "Industry", values: ["Restaurant / F&B"] },
      { label: "Users", values: ["Owners", "Cashiers", "Customers"] },
      { label: "Platform", values: ["POS", "Reservation Portal"] },
      { label: "Tech", values: ["Laravel", "REST API", "Nuxt", "AnalogJS"] },
      { label: "Deployment", values: ["Vercel + API server"] },
    ],
    workflow: [
      "Customer books a table",
      "Order placed at POS",
      "Kitchen prepares",
      "Payment settled",
      "Analytics forecasts demand",
    ],
    features: [
      { emoji: "🧾", title: "POS Terminal", description: "Tables, orders, and menus" },
      { emoji: "📅", title: "Reservations", description: "Public booking per branch" },
      { emoji: "👨‍🍳", title: "Kitchen Workflow", description: "From order to serving" },
      { emoji: "📈", title: "Demand Forecast", description: "14 days ahead" },
      { emoji: "🍽️", title: "Menu Clustering", description: "Stars vs. underperformers" },
      { emoji: "💬", title: "Natural-language Q&A", description: "Ask your data anything" },
    ],
    highlights: [
      { label: "Pattern", items: ["API-first", "Multi-frontend"] },
      { label: "API", items: ["REST"] },
      { label: "Database", items: ["MySQL"] },
      { label: "Analytics", items: ["Demand forecasting", "Menu clustering"] },
      { label: "AI", items: ["Natural-language Q&A"] },
      { label: "Deployment", items: ["Vercel frontends"] },
    ],
    extensions: [
      "Online Ordering & Delivery",
      "QR Table Ordering",
      "Kitchen Display System",
      "Loyalty Program",
      "Inventory & Purchasing",
      "WhatsApp Reminders",
    ],
    foundation: [
      { group: "Foundation Modules", modules: foundationModules },
      { group: "Restaurant Modules", modules: ["Orders", "Tables", "Menus", "Reservations", "Branches"] },
      { group: "AI Modules", modules: ["Demand Forecast", "Menu Clustering", "Q&A"] },
    ],
    idealFor: [
      "Restaurants & cafés",
      "Multi-branch chains",
      "Restaurants taking reservations",
      "Cloud kitchens",
      "Bars & bistros",
      "Food courts",
    ],
  },

  "commerce-ecosystem": {
    snapshot: [
      { label: "Industry", values: ["Retail"] },
      { label: "Users", values: ["Owners", "Cashiers", "Online Customers"] },
      { label: "Platform", values: ["POS", "Online Storefront"] },
      { label: "Tech", values: ["Laravel", "REST API", "Angular", "Next.js"] },
      { label: "Deployment", values: ["Vercel + API server"] },
    ],
    workflow: [
      "Product added to catalog",
      "Stock synced everywhere",
      "Sale at POS or storefront",
      "Inventory updates in real time",
      "Sales reported across channels",
    ],
    features: [
      { emoji: "🛒", title: "POS", description: "Fast counter checkout" },
      { emoji: "🌐", title: "Storefront", description: "Commission-free online store" },
      { emoji: "📦", title: "Inventory Sync", description: "One source of stock truth" },
      { emoji: "🏷️", title: "Catalog & Pricing", description: "Central administration" },
      { emoji: "📊", title: "Sales Reporting", description: "All channels combined" },
      { emoji: "🔐", title: "Role-based Access", description: "Owners, admins, cashiers" },
    ],
    highlights: [
      { label: "Pattern", items: ["API-first", "Multi-frontend"] },
      { label: "API", items: ["REST"] },
      { label: "Database", items: ["MySQL"] },
      { label: "Frontends", items: ["Angular POS", "Next.js storefront"] },
      { label: "Deployment", items: ["Vercel frontends"] },
    ],
    extensions: [
      "Payment Gateway",
      "Barcode Scanning",
      "Supplier & Purchasing",
      "Loyalty Points",
      "Marketplace Integration",
      "Accounting Export",
    ],
    foundation: [
      { group: "Foundation Modules", modules: foundationModules },
      { group: "Retail Modules", modules: ["Products", "Inventory", "Sales", "Customers", "Channels"] },
      { group: "Analytics Modules", modules: ["Cross-channel Reporting"] },
    ],
    idealFor: [
      "Retail stores",
      "Boutiques & specialty shops",
      "Sellers leaving marketplaces",
      "Minimarkets",
      "Wholesalers",
      "Brands selling direct",
    ],
  },

  "spa-ecosystem": {
    snapshot: [
      { label: "Industry", values: ["Wellness / Spa"] },
      { label: "Users", values: ["Owners", "Front Desk", "Customers"] },
      { label: "Platform", values: ["POS", "Booking Portal"] },
      { label: "Tech", values: ["Laravel", "REST API", "Next.js", "Nuxt"] },
      { label: "Deployment", values: ["Vercel + API server"] },
    ],
    workflow: [
      "Customer books online",
      "Availability computed centrally",
      "Staff scheduled",
      "Service paid at POS",
      "Inventory adjusted",
    ],
    features: [
      { emoji: "📅", title: "Online Booking", description: "Real-time availability" },
      { emoji: "💆", title: "Service Catalog", description: "Treatments per branch" },
      { emoji: "🧑‍🤝‍🧑", title: "Staff Scheduling", description: "Per-branch rosters" },
      { emoji: "💳", title: "Cashier POS", description: "Walk-ins and checkout" },
      { emoji: "📦", title: "Inventory", description: "Products and consumables" },
      { emoji: "🏢", title: "Multi-branch", description: "One consolidated view" },
    ],
    highlights: [
      { label: "Pattern", items: ["API-first", "Micro-system"] },
      { label: "API", items: ["REST"] },
      { label: "Database", items: ["MySQL"] },
      { label: "Scheduling", items: ["Central availability engine"] },
      { label: "Deployment", items: ["Vercel frontends"] },
    ],
    extensions: [
      "Membership Packages",
      "WhatsApp Reminders",
      "Staff Commissions",
      "Payment Gateway",
      "Gift Vouchers",
      "Mobile App",
    ],
    foundation: [
      { group: "Foundation Modules", modules: foundationModules },
      { group: "Wellness Modules", modules: ["Bookings", "Services", "Staff Rosters", "Inventory", "Branches"] },
    ],
    idealFor: [
      "Spas & massage studios",
      "Beauty salons",
      "Wellness clinics",
      "Barbershops",
      "Multi-branch wellness brands",
      "Fitness & yoga studios",
    ],
  },

  "payroll-system": {
    snapshot: [
      { label: "Industry", values: ["HR & Payroll"] },
      { label: "Users", values: ["HR Teams", "Managers", "Employees"] },
      { label: "Platform", values: ["Web Application"] },
      { label: "Tech", values: ["Laravel", "Blade"] },
      { label: "Deployment", values: ["payroll.carlssonstudio.com"] },
    ],
    workflow: [
      "Employee data validated",
      "Gross salary calculated",
      "PPh 21 + BPJS applied",
      "UMR compliance checked",
      "Disbursement-ready in 13 seconds",
    ],
    features: [
      { emoji: "👥", title: "Employee Management", description: "Roles, teams, salary components" },
      { emoji: "🧮", title: "Salary Calculation", description: "Gross to net, automated" },
      { emoji: "🏛️", title: "Tax Compliance", description: "PPh 21, BPJS, UMR" },
      { emoji: "🤖", title: "4-Agent Pipeline", description: "Each stage owns one concern" },
      { emoji: "📄", title: "Payslips & Reports", description: "Per employee, per period" },
      { emoji: "🔐", title: "Role-based Access", description: "HR, managers, employees" },
    ],
    highlights: [
      { label: "Pattern", items: ["Server-rendered", "Staged pipeline"] },
      { label: "Compliance", items: ["PPh 21", "BPJS", "UMR"] },
      { label: "Database", items: ["MySQL"] },
      { label: "Performance", items: ["13-second full run"] },
      { label: "Authentication", items: ["Role-based access"] },
    ],
    extensions: [
      "Attendance Integration",
      "Bank Disbursement API",
      "Employee Self-service",
      "e-SPT Export",
      "Overtime Rules",
      "Mobile Payslips",
    ],
    foundation: [
      { group: "Foundation Modules", modules: foundationModules },
      { group: "Payroll Modules", modules: ["Employees", "Salary Components", "Deductions", "Statutory Rules", "Payslips"] },
      { group: "Agent Modules", modules: ["Validation", "Calculation", "Compliance", "Disbursement"] },
    ],
    idealFor: [
      "SMEs running Indonesian payroll",
      "Companies leaving spreadsheets",
      "HR consultancies",
      "Outsourcing companies",
      "Growing startups",
      "Multi-team organizations",
    ],
  },

  "human-design": {
    snapshot: [
      { label: "Industry", values: ["AI · Professional Services"] },
      { label: "Users", values: ["Practitioners", "Clients"] },
      { label: "Platform", values: ["Web Application"] },
      { label: "Tech", values: ["ASP.NET Core", "MySQL", "Angular", "AnalogJS"] },
      { label: "Deployment", values: ["Vercel + API server"] },
      { label: "Recognition", values: ["Top 30 — Nusantara Elevate AI Talent Challenge"] },
    ],
    workflow: [
      "Birth data entered",
      "Chart computed deterministically",
      "Chart visualized",
      "AI writes personality analysis",
      "Compatibility report generated",
    ],
    features: [
      { emoji: "🧮", title: "Chart Calculation", description: "Precision domain logic" },
      { emoji: "📊", title: "Interactive Charts", description: "Explore every element" },
      { emoji: "🤖", title: "AI Reports", description: "Grounded personality analysis" },
      { emoji: "🤝", title: "Compatibility", description: "Business matching between profiles" },
      { emoji: "🗂️", title: "Client Records", description: "Built for practitioners" },
    ],
    highlights: [
      { label: "Backend", items: ["ASP.NET Core"] },
      { label: "Frontend", items: ["Angular", "AnalogJS"] },
      { label: "Database", items: ["MySQL"] },
      { label: "AI", items: ["Grounded report generation"] },
      { label: "Pattern", items: ["API + SPA"] },
    ],
    extensions: [
      "PDF Report Export",
      "Payment Gateway",
      "Multi-language Reports",
      "Team Compatibility Matrix",
      "Practitioner Marketplace",
    ],
    foundation: [
      { group: "Foundation Modules", modules: ["Authentication", "Dashboard", "Reporting", "File Uploads"] },
      { group: "Domain Modules", modules: ["Charts", "Profiles", "Reports", "Clients"] },
      { group: "AI Modules", modules: ["Personality Analysis", "Compatibility Engine"] },
    ],
    idealFor: [
      "Human Design practitioners",
      "Coaches & consultants",
      "Wellness professionals",
      "HR & team-building consultants",
      "Analysis service providers",
    ],
  },

  "quoteplot-agent": {
    snapshot: [
      { label: "Industry", values: ["AI · Finance"] },
      { label: "Users", values: ["Retail Investors"] },
      { label: "Platform", values: ["Web Application"] },
      { label: "Tech", values: ["Python", "FastAPI", "Next.js"] },
      { label: "Deployment", values: ["Vercel + FastAPI service"] },
    ],
    workflow: [
      "User asks in plain language",
      "Market data ingested",
      "SVM pipeline classifies the signal",
      "Agent grounds the answer",
      "Chart and answer delivered",
    ],
    features: [
      { emoji: "💬", title: "Natural-language Q&A", description: "Ask about any stock" },
      { emoji: "📈", title: "Live Charts", description: "Prices and trends" },
      { emoji: "🧠", title: "SVM Pipeline", description: "86% classification accuracy" },
      { emoji: "🔄", title: "Real-time Data", description: "Market API integrations" },
      { emoji: "🤖", title: "Grounded Agent", description: "Answers backed by the model" },
    ],
    highlights: [
      { label: "Backend", items: ["Python", "FastAPI"] },
      { label: "ML", items: ["SVM", "86% accuracy"] },
      { label: "Frontend", items: ["Next.js"] },
      { label: "Data", items: ["Market API integrations"] },
      { label: "Pattern", items: ["Model service + UI"] },
    ],
    extensions: [
      "Portfolio Tracking",
      "Alerts & Watchlists",
      "Backtesting",
      "More Asset Classes",
      "Sentiment Analysis",
    ],
    foundation: [
      { group: "Foundation Modules", modules: ["Dashboard", "Charts", "Chat UI"] },
      { group: "Finance Modules", modules: ["Stocks", "Signals", "Queries"] },
      { group: "AI Modules", modules: ["SVM Classifier", "NL Agent"] },
    ],
    idealFor: [
      "Retail investors",
      "Trading communities",
      "Financial content platforms",
      "Fintech startups",
      "Investment clubs",
    ],
  },
};
