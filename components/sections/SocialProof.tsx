"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { certificates, Certificate } from "@/data/certificates";
import CertificateLightbox from "@/components/certificates/CertificateLightbox";

export default function SocialProof() {
  const [openCert, setOpenCert] = useState<Certificate | null>(null);

  return (
    <section id="social-proof" className="border-y border-border bg-gray-50 dark:bg-white/5 px-6 py-12 md:py-16">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Built Through Real Challenges</h2>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {certificates.map((cert) =>
            cert.available && cert.file ? (
              <motion.button
                key={cert.label}
                whileHover={{ scale: 1.03 }}
                onClick={() => setOpenCert(cert)}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 text-sm text-left hover:border-primary transition"
              >
                <span aria-hidden>{cert.emoji}</span>{cert.label}
              </motion.button>
            ) : (
              <div key={cert.label} className="flex flex-col items-center gap-1">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 text-sm opacity-50 cursor-default">
                  <span aria-hidden>{cert.emoji}</span>{cert.label}
                </span>
                <span className="text-xs text-muted-foreground">Result pending</span>
              </div>
            )
          )}
        </div>
      </div>

      {openCert && openCert.file && (
        <CertificateLightbox
          pdfUrl={openCert.file}
          label={openCert.label}
          onClose={() => setOpenCert(null)}
        />
      )}
    </section>
  );
}
