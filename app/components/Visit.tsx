"use client";

import { motion } from "motion/react";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import CoffeeRing from "@/app/components/decor/CoffeeRing";
import Magnetic from "@/components/ui/magnetic";
import { business } from "@/app/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Visit() {
  const reduceMotion = useSafeReducedMotion();
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`;
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(business.address)}&output=embed`;

  return (
    <section id="visit" className="relative isolate scroll-mt-24 overflow-hidden bg-ink-deep">
      <CoffeeRing className="absolute bottom-8 left-4 -z-10 h-56 w-56 text-paper/[0.2]" />

      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">

          {/* Info column */}
          <motion.div
            initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: EASE }}
          >
            <h2 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.0] tracking-[-0.035em] text-paper">
              Come find us<br />
              <span className="text-paper/50">in Jaro</span>
            </h2>

            {/* Hours — the most important piece of info */}
            <div className="mt-8 pb-6 border-b border-paper/10">
              <p className="text-xs text-muted/60 mb-2 tracking-[0.08em]">Hours</p>
              <p className="font-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold tracking-[-0.02em] text-paper leading-none">
                {business.hours}
              </p>
            </div>

            {/* Address */}
            <div className="mt-6 space-y-0.5 text-muted text-base leading-relaxed">
              <p>Golden AC Business Center</p>
              <p>E Lopez St, Jaro</p>
              <p>Iloilo City 5000</p>
            </div>
            <p className="mt-1 text-xs text-muted/50">Plus code: {business.plusCode}</p>

            {/* Services */}
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-paper/70">
              {business.serviceOptions.map((opt) => (
                <span key={opt} className="flex items-center gap-1.5">
                  <span className="text-accent font-bold" aria-hidden>✓</span>
                  {opt}
                </span>
              ))}
              {business.badges.map((badge) => (
                <span key={badge} className="flex items-center gap-1.5">
                  <span aria-hidden>🏳️‍🌈</span>
                  {badge}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Magnetic className="inline-block">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-full bg-accent px-7 py-3.5 text-center font-medium text-accent-ink transition-transform duration-300 ease-out hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
                >
                  Get directions
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Magnetic>
              <a
                href={`tel:${business.phone.replace(/\s/g, "")}`}
                className="rounded-full border border-paper/25 px-7 py-3.5 text-center font-medium text-paper/90 transition-all duration-300 ease-out hover:border-paper/40 hover:bg-paper/8 hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
              >
                {business.phone}
              </a>
            </div>

            <p className="mt-8 text-sm text-muted/60 leading-relaxed max-w-[44ch]">
              {business.deliveryNote}
            </p>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: reduceMotion ? 1 : 0, scale: reduceMotion ? 1 : 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: reduceMotion ? 0.01 : 0.8, ease: EASE }}
            className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-paper/12 shadow-[0_30px_70px_-25px_rgba(5,8,22,0.75)]"
          >
            <iframe
              src={mapEmbedUrl}
              className="h-full w-full grayscale-[20%] transition-[filter] duration-500 group-hover:grayscale-0"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map showing ${business.name}'s exact location in Jaro, Iloilo City`}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
