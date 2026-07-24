"use client";

import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID;

/**
 * Loads the GTM container site-wide. Renders nothing when
 * NEXT_PUBLIC_GTM_CONTAINER_ID is unset, so the feature is inert until a
 * real container ID is configured — same pattern as MetaPixel.tsx.
 *
 * GA4 and Google Ads conversion tags are NOT configured here — they're
 * added inside the GTM container's own dashboard (Tags → New), triggered
 * off the "generate_lead" custom event pushed in lib/gtm.ts. This
 * component only needs to get the container itself loading and visible
 * to static crawlers, same lesson as the Meta Pixel fix: beforeInteractive
 * keeps it in the server-rendered HTML instead of client-injected only.
 */
export default function GoogleTagManager() {
  if (!GTM_ID) return null;

  return (
    <>
      <Script id="gtm-base" strategy="beforeInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
