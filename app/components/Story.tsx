"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import stillnessImage from "@/app/assets/images/stillness-quote.jpg";
import { story, tagline } from "@/app/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Story() {
  const reduceMotion = useSafeReducedMotion();

  return (
    <section className="bg-ink overflow-hidden">
      {/* Brand statement — the tagline gets its own visual moment */}
      <motion.div
        initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: reduceMotion ? 0.01 : 0.75, ease: EASE }}
        className="mx-auto max-w-6xl px-6 sm:px-10 pt-20 sm:pt-28 pb-14 sm:pb-18 border-b border-paper/10"
      >
        <blockquote className="font-display text-[clamp(2.75rem,6.5vw,5rem)] font-semibold leading-[0.93] tracking-[-0.04em] text-paper max-w-[16ch]">
          &ldquo;{tagline}&rdquo;
        </blockquote>
      </motion.div>

      {/* Story split — text aligned with the page grid, image bleeds to the right edge */}
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="grid lg:grid-cols-[1fr_1fr] lg:items-stretch min-h-[480px] sm:min-h-[540px]">
          {/* Text column */}
          <motion.div
            initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: EASE }}
            className="flex flex-col justify-center py-14 sm:py-20 pr-0 lg:pr-14"
          >
            <h2 className="text-2xl font-semibold text-paper sm:text-3xl leading-tight tracking-[-0.015em]">
              {story.heading}
            </h2>
            <p className="mt-5 text-base sm:text-lg text-muted leading-[1.75] max-w-[50ch]">
              {story.body}
            </p>
            <p className="mt-4 text-sm text-muted/55 italic">&mdash; {story.quoteAttribution}</p>
          </motion.div>

          {/* Image column — breaks out of right padding to bleed to the viewport edge */}
          <motion.div
            initial={{ opacity: reduceMotion ? 1 : 0, scale: reduceMotion ? 1 : 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: reduceMotion ? 0.01 : 0.85, ease: EASE }}
            className="relative -mr-6 sm:-mr-10 min-h-[360px] lg:min-h-0 overflow-hidden"
          >
            <Image
              src={stillnessImage}
              alt="A cup of latte art on a marbled blue mug, surrounded by greenery at Coffee Brewtherhood"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
            {/* Subtle left-edge fade so the image transitions into the navy */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
