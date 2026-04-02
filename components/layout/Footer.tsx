export default function Footer() {
  return (
    <footer className="bg-surface-container-low px-6 py-12">
      <div className="mx-auto max-w-6xl text-center text-sm text-slate-600">
        <p>© {new Date().getFullYear()} Carlsson</p>
        <p className="mt-2">Built with Next.js, TypeScript, and TailwindCSS.</p>
      </div>
    </footer>
  );
}
