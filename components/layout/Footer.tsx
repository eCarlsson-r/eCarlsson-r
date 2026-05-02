export default function Footer() {
  return (
    <footer className="bg-surface-container-low p-6">
      <div className="mx-auto max-w-6xl flex flex-col gap-2 md:flex-row justify-between text-sm text-center text-slate-600">
        <p>© {new Date().getFullYear()} Carlsson Studio. All rights reserved.</p>
        <p>Built end-to-end by E. Carlsson R. (Albert Hartanto)</p>
      </div>
    </footer>
  );
}
