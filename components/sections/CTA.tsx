import Link from "next/link";

export default function CTA() {
  return (
    <section className="text-center py-20 bg-blue-600 text-white">
      <h2 className="text-3xl font-bold mb-4">
        Let’s Build Something Meaningful
      </h2>

      <p className="mb-6">Open to full-stack and system architecture roles.</p>

      <Link
        href="/contact"
        className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold"
      >
        Contact Me
      </Link>
    </section>
  );
}
