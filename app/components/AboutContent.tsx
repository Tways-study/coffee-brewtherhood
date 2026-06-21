"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import heroImage from "@/app/assets/images/hero-latte-art.jpg";
import { aboutUs } from "@/app/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function AboutContent() {
  const reduceMotion = useSafeReducedMotion();

  return (
    <section className="bg-ink">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: reduceMotion ? 0.01 : 0.8, ease: EASE }}
          className="group relative aspect-[4/5] overflow-hidden rounded-3xl"
        >
          <Image
            src={heroImage}
            alt="A swan latte-art cappuccino lit by late-afternoon sun on a wooden table at Coffee Brewtherhood"
            fill
            sizes="(min-width: 1024px) 520px, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: EASE }}
        >
          <h2 className="font-display text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold tracking-[-0.02em] text-paper">
            {aboutUs.heading}
          </h2>
          <div className="mt-6 flex max-w-xl flex-col gap-5">
            {aboutUs.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-muted sm:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
