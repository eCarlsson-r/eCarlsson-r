export default function Footer() {
  return (
    <footer className="bg-surface-container-low p-6">
      <div className="mx-auto max-w-6xl flex flex-col gap-2 md:flex-row justify-between text-sm text-center text-slate-600">
        <p>© {new Date().getFullYear()} Carlsson Studio. Custom Business Software.</p>
        <p>Independent Software Studio based in Indonesia.</p>
      </div>
    </footer>
  );
}
