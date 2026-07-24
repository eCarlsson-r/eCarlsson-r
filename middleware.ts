import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Run on every path except API routes, Next internals, and any file with
  // an extension (favicon, /certificates/*.pdf, /images/*, resume.pdf …) so
  // static assets are served without a locale prefix.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
