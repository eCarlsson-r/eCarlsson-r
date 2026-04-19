"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { href: "/projects", label: "Projects" },
    { href: "/signals", label: "Signals" },
    { href: "/about", label: "About" },
    { href: "/resume", label: "Resume" }
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

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
                className={`cursor-pointer transition-all hover:no-underline ${
                  isActive
                    ? "text-primary border-b-2 border-primary"
                    : "text-secondary hover:border-b-2 border-primary hover:text-primary"
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

        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none focus:ring-2 focus:ring-primary rounded p-1"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-primary" />
          ) : (
            <Menu className="h-6 w-6 text-primary" />
          )}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-surface-container-low border-t border-surface-container-high">
          <div className="px-8 py-4 space-y-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`block cursor-pointer transition-all ${
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
              onClick={closeMenu}
              className="block btn-primary text-on-primary px-6 py-2 font-label text-sm uppercase tracking-widest hover:opacity-80 transition-opacity duration-300 w-fit"
            >
              Contact
            </Link>
          </div>
        </div>
      )}

      <div className="bg-surface-container-low h-px w-full"></div>
    </header>
  );
}
