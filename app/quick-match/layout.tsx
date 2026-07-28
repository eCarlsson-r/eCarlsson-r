import "../globals.css";

// A second root layout (the localized pages use app/[locale]/layout.tsx).
// This one is intentionally bare — no nav, no footer, no i18n provider — so
// the ad-landing page stays fast and distraction-free. It still renders the
// <html>/<body> shell + the theme init script so it matches the dark theme.
export const metadata = {
  title: "Find Your Business System | Carlsson Studio",
  description: "Tell us your name and industry — we'll continue on WhatsApp.",
};

export default function QuickMatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
