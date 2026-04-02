import Link from "next/link";

export default function CTA() {
  return (
    <section className="text-center py-20 bg-surface-container-high text-on-surface">
      <h2 className="text-3xl font-headline font-bold mb-4 text-primary">
        Let’s Build Something Meaningful
      </h2>

      <p className="mb-6 text-on-surface-variant">Open to full-stack and system architecture roles.</p>

      <Link
        href="/contact"
        className="btn-primary px-6 py-3 rounded-none font-semibold inline-block"
      >
        Contact Me
      </Link>
    </section>
  );
}
