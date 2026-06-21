"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

export interface Testimonial {
  text: string;
  highlight?: string;
  image: string;
  name: string;
  role: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  speed?: number; // Duration in seconds for one full scroll
  direction?: "left" | "right"; // Scroll direction
  cardHeight?: number; // Height of the testimonial card
  className?: string;
}

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  testimonials,
  speed = 20,
  direction = "left",
  cardHeight = 200,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const reduceMotion = useSafeReducedMotion();

  useEffect(() => {
    if (containerRef.current) {
      setCarouselWidth(containerRef.current.scrollWidth / 2);
    }
  }, [testimonials]);

  // Reduced motion: show the list once, statically, instead of an infinite scroll loop.
  const items = reduceMotion ? testimonials : [...testimonials, ...testimonials];

  return (
    <div className={`overflow-hidden w-full ${className}`} ref={containerRef}>
      <motion.div
        animate={
          reduceMotion
            ? { x: 0 }
            : { x: direction === "left" ? [0, -carouselWidth] : [-carouselWidth, 0] }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: speed, repeat: Infinity, ease: "linear" }
        }
        className={reduceMotion ? "flex flex-wrap gap-6" : "flex gap-6"}
      >
        {items.map(({ text, highlight, image, name, role }, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="my-3 flex flex-shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-paper/12 bg-surface p-5 shadow-lg w-[320px]"
            style={{ height: cardHeight }}
          >
            <p className="text-sm leading-relaxed text-paper/90 text-justify break-words whitespace-normal">
              {highlight
                ? text.split(highlight).map((part, idx, arr) => (
                    <React.Fragment key={idx}>
                      {part}
                      {idx !== arr.length - 1 && (
                        <span className="text-accent font-semibold">
                          {highlight}
                        </span>
                      )}
                    </React.Fragment>
                  ))
                : text}
            </p>

            <div className="flex items-center gap-3 mt-4 shrink-0">
              <img
                src={image}
                alt={name}
                width={50}
                height={50}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <div className="font-medium leading-tight text-paper">{name}</div>
                <div className="text-sm text-muted">{role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
