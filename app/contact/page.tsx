export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 space-y-16">
      
      <header className="space-y-4">
        <h1 className="text-5xl font-bold">Let&apos;s Build Something</h1>
        <p className="text-gray-600">
          Open to high-impact projects and long-term collaborations.
        </p>
      </header>

      {/* Signals */}
      <section className="grid md:grid-cols-3 gap-6 text-center">
        <div>
          <p className="text-2xl font-bold">24h</p>
          <p className="text-gray-500">Avg Response Time</p>
        </div>
        <div>
          <p className="text-2xl font-bold">Active</p>
          <p className="text-gray-500">Availability Status</p>
        </div>
        <div>
          <p className="text-2xl font-bold">Remote</p>
          <p className="text-gray-500">Work Mode</p>
        </div>
      </section>

      {/* Form */}
      <form className="space-y-6">
        <input
          placeholder="Your Name"
          className="w-full border p-3 rounded-lg"
        />
        <input
          placeholder="Email"
          className="w-full border p-3 rounded-lg"
        />
        <textarea
          placeholder="Project details..."
          rows={5}
          className="w-full border p-3 rounded-lg"
        />
        <button className="px-6 py-3 bg-black text-white rounded-lg">
          Send Message
        </button>
      </form>
    </div>
  );
}