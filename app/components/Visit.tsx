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
  const facts = [...business.serviceOptions, ...business.badges];

  return (
    <section id="visit" className="relative isolate scroll-mt-24 overflow-hidden bg-ink-deep">
      <CoffeeRing className="absolute bottom-6 left-4 -z-10 h-64 w-64 text-paper/[0.24]" />
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ y: reduceMotion ? 0 : 16 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: EASE }}
          >
            <h2 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-paper">
              Come find us in Jaro
            </h2>
            <p className="mt-4 max-w-md text-lg text-muted">{business.address}</p>
            <p className="mt-2 text-sm text-muted/70">Plus code: {business.plusCode}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {facts.map((fact) => (
                <span
                  key={fact}
                  className="rounded-full border border-paper/15 px-3.5 py-1.5 text-sm text-paper/80 transition-colors duration-300 hover:border-accent/40 hover:text-paper"
                >
                  {fact}
                </span>
              ))}
              <span className="text-sm font-medium text-paper">{business.hours}</span>
            </div>

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
                className="rounded-full border border-paper/30 px-7 py-3.5 text-center font-medium text-paper transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-paper/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
              >
                {business.phone}
              </a>
            </div>

            <p className="mt-10 border-t border-paper/10 pt-6 text-sm text-muted">{business.deliveryNote}</p>
          </motion.div>

          <motion.div
            initial={{ scale: reduceMotion ? 1 : 0.97 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: reduceMotion ? 0.01 : 0.8, ease: EASE }}
            className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-paper/12 shadow-[0_30px_70px_-25px_rgba(5,8,22,0.7)]"
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
