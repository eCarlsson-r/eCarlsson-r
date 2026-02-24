import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold text-gray-900">
          Carlsson.dev
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/projects" className="hover:text-blue-600">
            Projects
          </Link>
          <Link href="/signals" className="hover:text-blue-600">
            Signals
          </Link>
          <Link href="/about" className="hover:text-blue-600">
            About
          </Link>
          <Link href="/resume" className="hover:text-blue-600">
            Resume
          </Link>
          <Link href="/contact" className="hover:text-blue-600">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
