"use client";

import Link from "next/link";
import { ChevronDown, ExternalLink, Github } from "lucide-react";
import { useState } from "react";

interface Props {
  label: string;
  icon: "demo" | "github";
  variant: "primary" | "outline";
  items: { label: string; href: string }[];
}

const variants = {
  primary: "bg-primary text-on-primary hover:opacity-80 transition-opacity",
  outline: "border border-primary hover:border-secondary transition",
};

export default function LinkDropdown({ label, icon, variant, items }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  if (items.length === 0) return null;

  const buttonClass = `inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-label ${variants[variant]}`;
  const Icon = icon === "github" ? Github : ExternalLink;

  if (items.length === 1) {
    return (
      <Link href={items[0].href} target="_blank" rel="noopener noreferrer" className={buttonClass}>
        <Icon className="h-4 w-4" />{label}
      </Link>
    );
  }

  return (
    <div className="relative inline-block text-left">
      <button type="button" onClick={() => setIsOpen(!isOpen)} className={buttonClass}>
        <Icon className="h-4 w-4" />{label}<ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black/5 z-20">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
