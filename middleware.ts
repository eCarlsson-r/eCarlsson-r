import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Run on every path except API routes, Next internals, any file with an
  // extension (favicon, /certificates/*.pdf, /images/*, resume.pdf …), and
  // /quick-match — a standalone ad-landing page that lives outside the
  // locale routing and must not be prefixed with /id or /en.
  matcher: ["/((?!api|quick-match|_next|_vercel|.*\\..*).*)"],
};
