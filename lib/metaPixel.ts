/**
 * Client-side helpers for pairing the Meta Pixel with the backend's
 * Conversions API: read the cookies the Pixel already set so they can
 * be forwarded to the server for user-data matching, and fire the
 * client-side "Lead" event with the same event_id the server uses so
 * Meta deduplicates the pair instead of double-counting.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

/** Set by the Pixel on first visit; present only once fbevents.js has run. */
export function getFbp(): string | undefined {
  return readCookie("_fbp");
}

/** Set by the Pixel only when the visitor arrived via an fbclid ad click. */
export function getFbc(): string | undefined {
  return readCookie("_fbc");
}

export function generateEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** No-ops safely when the Pixel didn't load (blocked, or ID unset). */
export function trackLead(eventId: string) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead", {}, { eventID: eventId });
  }
}
