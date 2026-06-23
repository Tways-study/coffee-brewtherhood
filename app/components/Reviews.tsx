"use client";

import React from "react";
import { motion } from "motion/react";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import CoffeeRing from "@/app/components/decor/CoffeeRing";
import { business, reviewTags, reviews } from "@/app/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

const highlights: Record<string, string> = {
  "Samantha Diana Gabuya": "interesting flavors",
  "Adam Worldz": "Nice kick",
  "Ivane Angela Capero": "feel welcome",
};

function Quote({ text, highlight }: { text: string; highlight?: string }) {
  if (!highlight) return <>{text}</>;
  const parts = text.split(highlight);
  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <strong className="font-semibold text-accent not-italic">{highlight}</strong>
          )}
        </React.Fragment>
      ))}
    </>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <span aria-label={`${count} out of 5 stars`} className="flex gap-0.5 text-accent text-sm">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} aria-hidden>★</span>
      ))}
    </span>
  );
}

export default function Reviews() {
  const reduceMotion = useSafeReducedMotion();

  const [r0, r1, r2] = reviews;

  return (
    <section id="reviews" className="relative isolate scroll-mt-24 overflow-hidden bg-ink">
      <CoffeeRing className="absolute -top-8 right-[5%] -z-10 h-64 w-64 text-paper/[0.18]" />

      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: reduceMotion ? 0.01 : 0.65, ease: EASE }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold tracking-[-0.025em] text-paper">
              What people are saying
            </h2>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-5xl font-semibold text-paper leading-none">
                {business.rating}
              </span>
              <div>
                <Stars />
                <p className="mt-1 text-sm text-muted">{business.reviewCount} reviews · Google</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {reviewTags.map((tag) => (
              <span
                key={tag.label}
                className="rounded-full border border-paper/12 px-3.5 py-1.5 text-sm text-paper/70 transition-colors duration-300 hover:border-accent/30 hover:text-paper"
              >
                {tag.label}
                <span className="ml-1.5 text-muted/60">· {tag.count}</span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* Asymmetric card grid */}
        <motion.div
          initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: EASE, delay: reduceMotion ? 0 : 0.1 }}
          className="mt-12 grid gap-4 lg:grid-cols-3 lg:grid-rows-[auto_auto]"
        >
          {/* Card 1 — wide, first row, left 2/3 */}
          <div className="lg:col-span-2 rounded-2xl border border-paper/12 bg-surface p-7 sm:p-8 flex flex-col justify-between gap-6">
            <blockquote className="text-base sm:text-lg text-paper/85 leading-relaxed italic font-light">
              &ldquo;<Quote text={r0.quote} highlight={highlights[r0.name]} />&rdquo;
            </blockquote>
            <footer className="flex items-end justify-between gap-4">
              <div>
                <p className="font-semibold text-paper text-sm">{r0.name}</p>
                <p className="text-xs text-muted mt-0.5">{r0.meta}</p>
              </div>
              <Stars />
            </footer>
          </div>

          {/* Card 2 — narrow, first row, right 1/3 */}
          <div className="rounded-2xl border border-paper/12 bg-surface p-7 sm:p-8 flex flex-col justify-between gap-6">
            <blockquote className="text-base text-paper/85 leading-relaxed italic font-light">
              &ldquo;<Quote text={r1.quote} highlight={highlights[r1.name]} />&rdquo;
            </blockquote>
            <footer>
              <p className="font-semibold text-paper text-sm">{r1.name}</p>
              <p className="text-xs text-muted mt-0.5">{r1.meta}</p>
              {r1.timeAgo && (
                <p className="text-xs text-muted/50 mt-1">{r1.timeAgo}</p>
              )}
            </footer>
          </div>

          {/* Card 3 — full width, second row, horizontal layout */}
          <div className="lg:col-span-3 rounded-2xl border border-paper/12 bg-surface p-7 sm:p-8 grid sm:grid-cols-[2fr_1fr] sm:items-center gap-6 sm:gap-10">
            <blockquote className="text-lg sm:text-xl text-paper/85 leading-relaxed italic font-light">
              &ldquo;<Quote text={r2.quote} highlight={highlights[r2.name]} />&rdquo;
            </blockquote>
            <div className="flex flex-col gap-2 sm:pl-8 sm:border-l sm:border-paper/10">
              <Stars />
              <p className="font-semibold text-paper text-sm mt-1">{r2.name}</p>
              <p className="text-xs text-muted">{r2.meta}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
