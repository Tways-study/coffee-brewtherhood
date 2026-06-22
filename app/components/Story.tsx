"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import stillnessImage from "@/app/assets/images/stillness-quote.jpg";
import { story, tagline } from "@/app/lib/content";

export default function Story() {
  const reduceMotion = useSafeReducedMotion();

  return (
    <section className="bg-ink">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <motion.div
          initial={{ y: reduceMotion ? 0 : 16 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-display text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.02em] text-paper">
            &ldquo;{tagline}&rdquo;
          </p>
          <h2 className="mt-10 text-2xl font-semibold text-paper sm:text-3xl">
            {story.heading}
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            {story.body}
          </p>
          <p className="mt-3 text-sm text-muted/70">{story.quoteAttribution}</p>
        </motion.div>

        <motion.div
          initial={{ scale: reduceMotion ? 1 : 0.97 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: reduceMotion ? 0.01 : 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="group relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_30px_70px_-25px_rgba(5,8,22,0.7)]"
        >
          <Image
            src={stillnessImage}
            alt="A cup of latte art on a marbled blue mug, surrounded by greenery, captioned 'Healing begins with a moment of stillness'"
            fill
            sizes="(min-width: 1024px) 480px, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </motion.div>
      </div>
    </section>
  );
}
