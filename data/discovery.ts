export const buildTypes = [
  "Internal System",
  "Customer Portal",
  "POS",
  "Booking System",
  "ERP",
  "Dashboard",
  "AI Assistant",
  "Something Else",
] as const;

export const industries = [
  "Retail",
  "Restaurant",
  "Spa & Wellness",
  "Insurance",
  "Property",
  "HR & Payroll",
  "Education",
  "Other",
] as const;

export const companySizes = ["1–5", "5–20", "20–100", "100+"] as const;

export const problems = [
  "Manual spreadsheets",
  "Duplicate work",
  "WhatsApp chaos",
  "No reporting",
  "No inventory tracking",
  "No booking system",
  "No HR system",
  "No dashboard",
] as const;

export const featureOptions = [
  "Authentication",
  "Roles & Permissions",
  "Payments",
  "Notifications",
  "Reports",
  "Dashboard",
  "API",
  "AI",
  "Mobile",
  "Invoices",
  "Scheduling",
  "Inventory",
  "Bookings",
  "Multi-branch",
] as const;

export const addOns = [
  "WhatsApp Integration",
  "OCR",
  "AI Assistant",
  "Multi-branch",
  "Accounting Export",
  "Mobile App",
] as const;

export interface FoundationProfile {
  slug: string;
  name: string;
  baseWeeks: number;
  industries: string[];
  buildTypes: string[];
  problems: string[];
  features: string[];
  covers: string[];
}

export const foundationProfiles: FoundationProfile[] = [
  {
    slug: "commerce-ecosystem",
    name: "CommerceSystem",
    baseWeeks: 8,
    industries: ["Retail"],
    buildTypes: ["POS", "ERP", "Internal System", "Customer Portal", "Dashboard"],
    problems: ["Manual spreadsheets", "No inventory tracking", "No reporting", "Duplicate work", "No dashboard"],
    features: ["Authentication", "Roles & Permissions", "Payments", "Reports", "Dashboard", "API", "Inventory", "Invoices"],
    covers: ["inventory", "orders", "customers", "payments", "reporting"],
  },
  {
    slug: "restaurant-ecosystem",
    name: "RestoSystem",
    baseWeeks: 8,
    industries: ["Restaurant"],
    buildTypes: ["POS", "Booking System", "Internal System", "Dashboard"],
    problems: ["No booking system", "No reporting", "WhatsApp chaos", "No inventory tracking", "No dashboard"],
    features: ["Authentication", "Roles & Permissions", "Reports", "Dashboard", "API", "AI", "Bookings", "Multi-branch", "Scheduling"],
    covers: ["orders", "tables", "reservations", "kitchen workflow", "analytics"],
  },
  {
    slug: "spa-ecosystem",
    name: "SpaSystem",
    baseWeeks: 7,
    industries: ["Spa & Wellness"],
    buildTypes: ["Booking System", "POS", "Customer Portal"],
    problems: ["No booking system", "WhatsApp chaos", "Manual spreadsheets", "No inventory tracking"],
    features: ["Authentication", "Roles & Permissions", "Payments", "Bookings", "Scheduling", "Multi-branch", "Inventory"],
    covers: ["bookings", "staff scheduling", "services", "payments", "inventory"],
  },
  {
    slug: "insurance-portal",
    name: "InsurancePortal",
    baseWeeks: 8,
    industries: ["Insurance"],
    buildTypes: ["Internal System", "Dashboard", "Customer Portal"],
    problems: ["Manual spreadsheets", "Duplicate work", "No reporting", "No dashboard"],
    features: ["Authentication", "Roles & Permissions", "Reports", "Dashboard", "AI", "Mobile", "Notifications"],
    covers: ["policies", "customers", "production tracking", "team achievements", "AI dashboards"],
  },
  {
    slug: "property-management",
    name: "UrusProperti",
    baseWeeks: 8,
    industries: ["Property"],
    buildTypes: ["Internal System", "Dashboard", "ERP"],
    problems: ["Manual spreadsheets", "No reporting", "Duplicate work", "No dashboard"],
    features: ["Authentication", "Roles & Permissions", "Payments", "Reports", "Dashboard", "AI", "Notifications", "Invoices"],
    covers: ["properties", "tenants", "leases", "payments", "AI insights"],
  },
  {
    slug: "payroll-system",
    name: "Payroll Agent",
    baseWeeks: 6,
    industries: ["HR & Payroll"],
    buildTypes: ["Internal System", "ERP"],
    problems: ["Manual spreadsheets", "No HR system", "Duplicate work", "No reporting"],
    features: ["Authentication", "Roles & Permissions", "Reports", "AI", "Notifications"],
    covers: ["employees", "salary calculation", "tax compliance", "payslips"],
  },
  {
    slug: "quoteplot-agent",
    name: "QuotePlot Agent",
    baseWeeks: 6,
    industries: ["Other"],
    buildTypes: ["AI Assistant", "Dashboard"],
    problems: ["No reporting", "No dashboard"],
    features: ["AI", "Dashboard", "API", "Reports"],
    covers: ["natural-language Q&A", "live data", "ML classification"],
  },
  {
    slug: "human-design",
    name: "HumanDesign",
    baseWeeks: 7,
    industries: ["Education", "Other"],
    buildTypes: ["AI Assistant", "Customer Portal"],
    problems: ["Duplicate work", "No reporting"],
    features: ["Authentication", "AI", "Reports", "API"],
    covers: ["AI-generated reports", "client records", "domain calculations"],
  },
];

export interface DiscoveryInput {
  buildType: string;
  industry: string;
  companySize: string;
  problems: string[];
  features: string[];
}

export interface Recommendation {
  profile: FoundationProfile;
  score: number;
  matchedNeeds: string[];
  unmatchedFeatures: string[];
  customization: "Low" | "Medium" | "High";
  weeks: number;
}

export function recommend(input: DiscoveryInput): Recommendation[] {
  return foundationProfiles
    .map((profile) => {
      let score = 0;
      if (profile.industries.includes(input.industry)) score += 40;
      if (profile.buildTypes.includes(input.buildType)) score += 25;

      const matchedProblems = input.problems.filter((p) => profile.problems.includes(p));
      score += input.problems.length
        ? Math.round((20 * matchedProblems.length) / input.problems.length)
        : 10;

      const matchedFeatures = input.features.filter((f) => profile.features.includes(f));
      score += input.features.length
        ? Math.round((15 * matchedFeatures.length) / input.features.length)
        : 8;

      const unmatchedFeatures = input.features.filter((f) => !profile.features.includes(f));
      const customization: Recommendation["customization"] =
        unmatchedFeatures.length <= 1 ? "Low" : unmatchedFeatures.length <= 4 ? "Medium" : "High";
      const weeks = profile.baseWeeks + Math.ceil(unmatchedFeatures.length / 2);

      // reason line reads "You need X, Y, Z" — feature names read naturally there,
      // problem statements ("No reporting") do not
      const matchedNeeds = matchedFeatures.length > 0 ? [...new Set(matchedFeatures)] : profile.covers;

      return {
        profile,
        score: Math.min(score, 97),
        matchedNeeds,
        unmatchedFeatures,
        customization,
        weeks,
      };
    })
    .sort((a, b) => b.score - a.score);
}

export const deliverables = [
  "Full source code ownership",
  "Production deployment",
  "Team training session",
  "System documentation",
  "30-day post-launch support",
];
