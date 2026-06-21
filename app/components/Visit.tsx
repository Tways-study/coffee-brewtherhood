"use client";

import { motion } from "motion/react";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import { business } from "@/app/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Visit() {
  const reduceMotion = useSafeReducedMotion();
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`;
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(business.address)}&output=embed`;

  return (
    <section id="visit" className="scroll-mt-24 bg-ink-deep">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: EASE }}
          >
            <h2 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-paper">
              Come find us in Jaro
            </h2>
            <p className="mt-4 max-w-md text-lg text-muted">{business.address}</p>
            <p className="mt-2 text-sm text-muted/70">Plus code: {business.plusCode}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-accent px-7 py-3.5 text-center font-medium text-accent-ink transition-transform duration-300 ease-out hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
              >
                Get directions
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a
                href={`tel:${business.phone.replace(/\s/g, "")}`}
                className="rounded-full border border-paper/30 px-7 py-3.5 text-center font-medium text-paper transition-colors duration-300 hover:bg-paper/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
              >
                {business.phone}
              </a>
            </div>

            <p className="mt-10 border-t border-paper/10 pt-6 text-sm text-muted">{business.deliveryNote}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: reduceMotion ? 0.01 : 0.8, ease: EASE }}
            className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-paper/12 shadow-lg"
          >
            <iframe
              src={mapEmbedUrl}
              className="h-full w-full grayscale-[15%] transition-[filter] duration-500 group-hover:grayscale-0"
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
