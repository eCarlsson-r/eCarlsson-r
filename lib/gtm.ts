/**
 * dataLayer helper for Google Tag Manager. GTM itself (loaded by
 * GoogleTagManager.tsx) reads this array; GA4 and Google Ads tags are
 * configured inside the GTM container's dashboard to trigger on the
 * "generate_lead" custom event pushed here, not in this repo's code.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** No-ops safely when GTM didn't load (blocked, or container ID unset). */
export function pushGenerateLeadEvent(params: {
  leadId?: number | string;
  industry: string;
  buildType: string;
}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "generate_lead",
    lead_id: params.leadId,
    industry: params.industry,
    build_type: params.buildType,
  });
}
