/**
 * Client for the Carlsson Studio Spring Boot API.
 * All endpoints wrap responses in a { success, message, data } envelope.
 */

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "https://api.carlssonstudio.com").replace(/\/$/, "");

// The /start-a-project questionnaire is Bahasa Indonesia-only today (see
// components/start/ProjectQuestionnaire.tsx), so every request asks the
// backend for Indonesian copy — validation messages, envelope messages,
// and the recommendation match reason. The backend falls back to English
// for any locale it doesn't ship, so this is safe even if unset.
const ACCEPT_LANGUAGE = "id";

export interface QuestionnaireConfig {
  industries: string[];
  buildTypes: string[];
  problems: string[];
  features: string[];
  companySizes: string[];
}

export interface LeadPayload {
  name: string;
  // At least one of email/phone must be present — enforced by the UI
  // and re-checked by the backend (LeadRequest#isContactProvided).
  email?: string;
  phone?: string;
  company?: string;
  companySize: string;
  industry: string;
  buildType: string;
  problems: string[];
  features: string[];
  // Meta ad-tracking metadata — see lib/metaPixel.ts. Absent when the
  // Pixel is blocked or unconfigured; the backend treats all three as
  // optional.
  fbEventId?: string;
  fbp?: string;
  fbc?: string;
}

export interface Recommendation {
  foundationSlug: string;
  foundationName: string;
  matchScore: number;
  matchReason: string;
}

export interface LeadResult {
  id: number;
  name: string;
  recommendations: Recommendation[];
}

interface Envelope<T> {
  success: boolean;
  message?: string;
  data: T;
}

async function unwrap<T>(res: Response): Promise<T> {
  let body: Envelope<T> | null = null;
  try {
    body = (await res.json()) as Envelope<T>;
  } catch {
    throw new Error(`The server returned an unexpected response (${res.status}).`);
  }
  if (!res.ok || !body?.success) {
    throw new Error(body?.message || `Request failed (${res.status}).`);
  }
  return body.data;
}

export async function fetchQuestionnaireConfig(signal?: AbortSignal): Promise<QuestionnaireConfig> {
  const res = await fetch(`${API_URL}/api/config/questionnaire`, {
    method: "GET",
    headers: { Accept: "application/json", "Accept-Language": ACCEPT_LANGUAGE },
    signal,
  });
  return unwrap<QuestionnaireConfig>(res);
}

export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  const res = await fetch(`${API_URL}/api/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Language": ACCEPT_LANGUAGE,
    },
    body: JSON.stringify(payload),
  });
  return unwrap<LeadResult>(res);
}
