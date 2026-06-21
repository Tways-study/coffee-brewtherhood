"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import dragonLatte from "@/app/assets/images/dragon-latte.jpg";
import logo from "@/app/assets/images/logo.jpg";
import { business } from "@/app/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function AboutHero() {
  const reduceMotion = useSafeReducedMotion();

  return (
    <section className="relative isolate flex min-h-[70svh] items-end overflow-hidden bg-ink-deep">
      <Image
        src={dragonLatte}
        alt="A detailed latte-art pour at Coffee Brewtherhood, viewed from above on a wooden counter"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_35%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/70 to-ink-deep/10" />

      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.01 : 0.8, ease: EASE }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-32 sm:px-10 sm:pb-24"
      >
        <Link
          href="/"
          className="mb-6 inline-block h-16 w-16 overflow-hidden rounded-full ring-2 ring-paper/20 transition-transform duration-300 ease-out hover:scale-110 sm:h-20 sm:w-20"
        >
          <Image src={logo} alt="Coffee Brewtherhood logo" width={80} height={80} className="h-full w-full object-cover" />
        </Link>

        <h1 className="max-w-2xl font-display text-[clamp(2.5rem,7vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-paper">
          About {business.name}
        </h1>
      </motion.div>
    </section>
  );
}
