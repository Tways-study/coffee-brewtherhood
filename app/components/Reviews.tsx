"use client";

import { motion } from "motion/react";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import { TestimonialsCarousel, type Testimonial } from "@/components/ui/testimonials-carousel";
import { business, reviewTags, reviews } from "@/app/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

const highlights: Record<string, string> = {
  "Samantha Diana Gabuya": "interesting flavors",
  "Adam Worldz": "Nice kick",
  "Ivane Angela Capero": "favorite spot to hang out",
};

const testimonials: Testimonial[] = reviews.map((review) => ({
  text: review.quote,
  highlight: highlights[review.name],
  name: review.name,
  role: review.meta,
}));

export default function Reviews() {
  const reduceMotion = useSafeReducedMotion();

  return (
    <section id="reviews" className="scroll-mt-24 bg-ink">
      <motion.div
        initial={{ y: reduceMotion ? 0 : 18 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: EASE }}
        className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold tracking-[-0.02em] text-paper">
              What {business.reviewCount} reviewers are saying
            </h2>
            <div className="mt-4 flex items-center gap-3">
              <span className="font-display text-4xl font-semibold text-paper">{business.rating}</span>
              <span aria-hidden className="text-2xl text-accent">★★★★★</span>
              <span className="text-muted">{business.reviewCount} reviews on Google</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {reviewTags.map((tag) => (
              <span
                key={tag.label}
                className="rounded-full border border-paper/15 px-3.5 py-1.5 text-sm text-paper/80 transition-colors duration-300 hover:border-accent/40 hover:text-paper"
              >
                {tag.label} <span className="text-muted">· {tag.count}</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: reduceMotion ? 0 : 18 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: EASE }}
        className="mt-12 pb-20 sm:pb-28"
      >
        <TestimonialsCarousel
          testimonials={testimonials}
          speed={32}
          direction="left"
          cardHeight={250}
        />
      </motion.div>
    </section>
  );
}
