"use client";

import { useEffect } from "react";
import { Download, X } from "lucide-react";

interface Props {
  pdfUrl: string;
  label: string;
  onClose: () => void;
}

export default function CertificateLightbox({ pdfUrl, label, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <div
        className="relative flex w-full max-w-3xl h-[80vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-4 py-3">
          <p className="truncate text-sm font-medium text-gray-900">{label}</p>
          <button
            aria-label="Close"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-gray-200 text-gray-500 hover:text-gray-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Browser-native PDF rendering; mobile browsers often can't render inline */}
        <iframe src={pdfUrl} title={label} className="hidden md:block h-full w-full" />

        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center md:hidden">
          <p className="text-sm text-gray-600">
            PDF preview is not available on mobile.
          </p>
          <a
            href={pdfUrl}
            download
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-label text-on-primary"
          >
            <Download className="h-4 w-4" />Download certificate
          </a>
        </div>
      </div>
    </div>
  );
}
