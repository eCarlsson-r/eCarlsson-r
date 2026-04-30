export default function Footer() {
  return (
    <footer className="bg-surface-container-low p-6">
      <div className="mx-auto max-w-6xl flex justify-between text-sm text-slate-600">
        <p>© {new Date().getFullYear()} Carlsson Studio. All rights reserved.</p>
        <p className="mt-2">Built end-to-end by E. Carlsson R. (Albert Hartanto)</p>
      </div>
    </footer>
  );
}
