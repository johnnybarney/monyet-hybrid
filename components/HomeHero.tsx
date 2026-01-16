"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type HomeHeroProps = {
  teamName: string;
  logoSrc: string;
  slides: { src: string; alt?: string }[];
  intervalMs?: number;
};

export default function HomeHero({
  teamName,
  logoSrc,
  slides,
  intervalMs = 4500,
}: HomeHeroProps) {
  const safeSlides = useMemo(() => (slides?.length ? slides : []), [slides]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (safeSlides.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % safeSlides.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [safeSlides.length, intervalMs]);

  const current = safeSlides[index];

  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden md:min-h-screen">
      {/* Background image */}
      <div className="absolute inset-0">
        {current ? (
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt ?? "Hero background"}
            fill
            priority
            className="object-cover object-center md:object-[70%_center]"
            sizes="100vw"
          />
        ) : (
          <div className="h-full w-full bg-black" />
        )}

        {/* Overlays for readability */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Center content */}
      <div className="relative mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center justify-center px-4 py-14 text-center md:min-h-screen">
        <div className="relative h-28 w-28 overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-lg md:h-36 md:w-36">
          <Image
            src={logoSrc}
            alt={`${teamName} logo`}
            fill
            className="object-contain p-4"
            sizes="144px"
            priority
          />
        </div>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white md:text-6xl">
          {teamName}
        </h1>

        <p className="mt-3 max-w-xl text-sm text-white/80 md:text-base">
          Official club site • Matches • Players • Highlights
        </p>

        {/* Optional: slide indicators */}
        {safeSlides.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {safeSlides.map((_, i) => (
              <span
                key={i}
                className={[
                  "h-2 w-2 rounded-full transition-all",
                  i === index ? "bg-white" : "bg-white/35",
                ].join(" ")}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
