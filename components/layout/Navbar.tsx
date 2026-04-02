"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const navLinks = [
    { href: "/projects", label: "Projects" },
    { href: "/signals", label: "Signals" },
    { href: "/about", label: "About" },
    { href: "/resume", label: "Resume" }
  ];

  return (
    <header className="sticky top-0 z-50 glass-navbar">
      <nav className="mx-auto flex justify-between items-center px-8 py-4 max-w-7xl">
        <Link href="/" className="font-headline font-bold text-2xl tracking-tighter text-primary cursor-pointer active:scale-95 transition-transform">
          Carlsson Studio
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`cursor-pointer transition-all ${
                  isActive
                    ? "text-primary border-b-2 border-primary"
                    : "text-secondary hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/contact"
            className="btn-primary text-on-primary px-6 py-2 font-label text-sm uppercase tracking-widest hover:opacity-80 transition-opacity duration-300"
          >
            Contact
          </Link>
        </div>

        <div className="md:hidden">
          <span className="material-symbols-outlined text-primary">menu</span>
        </div>
      </nav>
      <div className="bg-surface-container-low h-px w-full"></div>
    </header>
  );
}
