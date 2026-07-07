export interface Certificate {
  label: string;
  emoji: string;
  file: string | null;
  available: boolean;
}

export const certificates: Certificate[] = [
  { label: "Top 30 — Nusantara Elevate AI Talent Challenge", emoji: "🧠", file: "/certificates/nusantara-elevate-ai-top30.pdf", available: true },
  { label: "Top 100 — Google Cloud GenAI Academy APAC", emoji: "🏆", file: "/certificates/apac-genai-top100.pdf", available: true },
  { label: "IBM watsonx Hackathon", emoji: "🤖", file: "/certificates/ibm-watsonx-hackathon.pdf", available: true },
  { label: "Bright Data AI Agents Hackathon", emoji: "🌐", file: "/certificates/bright-data-hackathon.pdf", available: true },
  { label: "TechEx — Transforming Enterprise Through AI", emoji: "🛒", file: "/certificates/techex-enterprise-ai.pdf", available: true },
  { label: "Band of Agents — lablab.ai", emoji: "🤝", file: null, available: false },
  { label: "APAC GenAI Academy Cohort 2", emoji: "☁️", file: null, available: false },
];
