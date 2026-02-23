export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-12 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} Carlsson</p>
        <p className="mt-2">Built with Next.js, TypeScript, and TailwindCSS.</p>
      </div>
    </footer>
  );
}
