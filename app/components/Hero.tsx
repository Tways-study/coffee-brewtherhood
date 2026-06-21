"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import heroImage from "@/app/assets/images/hero-bg.jpg";
import logo from "@/app/assets/images/logo.jpg";
import { business } from "@/app/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduceMotion = useSafeReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.12,
        delayChildren: reduceMotion ? 0 : 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.01 : 0.8, ease: EASE },
    },
  };

  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink-deep">
      <Image
        src={heroImage}
        alt="A heart latte-art cup in a red saucer, lit by strong diagonal sunlight on a wooden table at Coffee Brewtherhood"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[55%_45%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/70 to-ink-deep/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-deep/90 via-ink-deep/40 to-transparent" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-32 sm:px-10 sm:pb-24"
      >
        <motion.div variants={item} className="mb-6 h-16 w-16 overflow-hidden rounded-full ring-2 ring-paper/20 sm:h-20 sm:w-20">
          <Image src={logo} alt="Coffee Brewtherhood logo" width={80} height={80} priority className="h-full w-full object-cover" />
        </motion.div>

        <motion.h1
          variants={item}
          className="max-w-2xl font-display text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-paper"
        >
          Coffee Brewtherhood
        </motion.h1>

        <motion.p variants={item} className="mt-5 max-w-md text-lg text-paper/80 sm:text-xl">
          Independent specialty {business.category.toLowerCase()} in the heart of Jaro, Iloilo City.
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-5">
          <div className="flex items-center gap-2 rounded-full bg-paper/10 px-4 py-2 backdrop-blur-sm">
            <span className="font-display text-lg font-semibold text-paper">{business.rating}</span>
            <span aria-hidden className="text-accent">★★★★★</span>
            <span className="text-sm text-muted">({business.reviewCount} reviews)</span>
          </div>
        </motion.div>

        <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-7 py-3.5 font-medium text-accent-ink transition-transform duration-300 ease-out hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
          >
            Get directions
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a
            href={`tel:${business.phone.replace(/\s/g, "")}`}
            className="rounded-full border border-paper/30 px-7 py-3.5 font-medium text-paper transition-colors duration-300 hover:bg-paper/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
          >
            Call {business.phone}
          </a>
          <a
            href="#menu"
            className="rounded-full px-7 py-3.5 font-medium text-paper/80 underline-offset-4 transition-colors duration-300 hover:text-paper hover:underline"
          >
            View the menu
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
