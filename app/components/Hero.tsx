"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import CoffeeRing from "@/app/components/decor/CoffeeRing";
import SteamWisp from "@/app/components/decor/SteamWisp";
import Magnetic from "@/components/ui/magnetic";
import heroImage from "@/app/assets/images/hero-bg.jpg";
import logo from "@/app/assets/images/logo.jpg";
import { business } from "@/app/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduceMotion = useSafeReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 140]);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`;

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
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink-deep"
    >
      {/* Parallax hero image */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 -top-16 scale-110">
        <Image
          src={heroImage}
          alt="A heart latte-art cup in a red saucer, lit by strong diagonal sunlight on a wooden table at Coffee Brewtherhood"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[55%_45%]"
        />
      </motion.div>

      {/* Gradient overlay — bottom-heavy so the photo reads above the fold */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/70 to-ink-deep/5" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-deep/80 via-ink-deep/25 to-transparent" />

      <CoffeeRing className="absolute right-[6%] top-[12%] h-[320px] w-[320px] text-paper/[0.17]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-14 pt-32 sm:px-10 sm:pb-20"
      >
        {/* Logo mark */}
        <motion.div variants={item} className="relative mb-7 h-14 w-14 sm:h-16 sm:w-16">
          <SteamWisp className="absolute -top-10 left-1/2 h-13 w-9 -translate-x-1/2 text-paper/35" />
          <div className="h-full w-full overflow-hidden rounded-full ring-1 ring-paper/20">
            <Image
              src={logo}
              alt="Coffee Brewtherhood logo"
              width={64}
              height={64}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={item}
          className="max-w-2xl font-display text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-paper"
        >
          Coffee Brewtherhood
        </motion.h1>

        {/* Location line */}
        <motion.p variants={item} className="mt-4 text-base text-paper/65 sm:text-lg">
          Independent specialty cafe · Jaro, Iloilo City
        </motion.p>

        {/* Rating — inline, no badge */}
        <motion.div variants={item} className="mt-5 flex items-center gap-2.5">
          <span aria-hidden className="text-accent text-sm">★★★★★</span>
          <span className="font-display text-base font-semibold text-paper">{business.rating}</span>
          <span className="text-sm text-muted">· {business.reviewCount} Google reviews</span>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
          <Magnetic className="inline-block">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-full bg-accent px-6 py-3.5 font-medium text-accent-ink transition-transform duration-300 ease-out hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
            >
              Get directions
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Magnetic>
          <a
            href={`tel:${business.phone.replace(/\s/g, "")}`}
            className="rounded-full border border-paper/25 px-6 py-3.5 font-medium text-paper/90 transition-all duration-300 ease-out hover:border-paper/40 hover:bg-paper/8 hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
          >
            {business.phone}
          </a>
        </motion.div>

        {/* Info strip — hours, services, badges in one quiet line */}
        <motion.div
          variants={item}
          className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-paper/10 pt-5 text-sm text-paper/50"
        >
          <span className="text-paper/70">{business.hours}</span>
          {business.serviceOptions.map((opt, i) => (
            <span key={opt} className="flex items-center gap-1.5">
              {i === 0 && <span aria-hidden className="text-paper/25">·</span>}
              {opt}
              {i < business.serviceOptions.length - 1 && (
                <span aria-hidden className="text-paper/25">·</span>
              )}
            </span>
          ))}
          {business.badges.map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
