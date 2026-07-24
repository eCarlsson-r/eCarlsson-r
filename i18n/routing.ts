import { defineRouting } from "next-intl/routing";

// Bahasa Indonesia is the default because the studio promotes in Indonesian
// and most traffic arrives from Indonesian-language ads. `localePrefix:
// "always"` gives every page an explicit /id or /en prefix (clean hreflang,
// unambiguous canonical URLs); "/" redirects to "/id".
export const routing = defineRouting({
  locales: ["id", "en"],
  defaultLocale: "id",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
