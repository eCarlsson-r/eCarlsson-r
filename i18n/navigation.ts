import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware replacements for next/link and next/navigation — Link,
// useRouter, usePathname, redirect and getPathname all keep the active
// locale prefix automatically. Import these instead of next/link etc.
// anywhere navigation must preserve the current language.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
