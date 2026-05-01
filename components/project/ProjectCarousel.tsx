"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Slide } from "@/core/types";

interface Props {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number;
}

export default function ProjectCarousel({
  slides,
  autoPlay = false,
  interval = 5000,
}: Props) {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const next = useCallback(() => setIndex((prev) => (prev + 1) % slides.length), [slides]);
  const prev = useCallback(() => setIndex((prev) => (prev - 1 + slides.length) % slides.length), [slides]);

  // autoplay
  useEffect(() => {
    if (!autoPlay) return;
    timeoutRef.current = setTimeout(next, interval);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, autoPlay, interval, next]);

  // keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Slide */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-xl">
        {slides[index].type === "image" ? (
          <Image
            src={slides[index].src}
            alt={slides[index].alt || ""}
            width={600} height={200}
            loading="lazy"
            className="w-full transition duration-500"
          />
        ) : (
          <video
            src={slides[index].src}
            className="w-full h-100 object-cover"
            controls
          />
        )}
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full"
      >
        ‹
      </button>

      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full"
      >
        ›
      </button>

      {/* Indicators */}
      <div className="flex justify-center mt-4 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full ${
              i === index ? "bg-indigo-500" : "bg-gray-500"
            }`}
          />
        ))}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-4 overflow-x-auto">
        {slides.map((slide, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`cursor-pointer border-2 rounded-lg overflow-hidden ${
              i === index ? "border-indigo-500" : "border-transparent"
            }`}
          >
            {slide.type === "image" ? (
              <Image
                src={slide.src} loading="lazy" alt={slide.alt || ""}
                width={24} height={16} className="w-24 h-16 object-cover"
              />
            ) : (
              <video
                src={slide.src}
                className="w-24 h-16 object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}