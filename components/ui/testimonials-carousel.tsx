"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

export interface Testimonial {
  text: string;
  highlight?: string;
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
  const distance = direction === "left" ? -carouselWidth : carouselWidth;

  return (
    <div className={`overflow-hidden w-full ${className}`} ref={containerRef}>
      <div
        className={reduceMotion ? "flex flex-wrap gap-6" : "carousel-track flex gap-6"}
        style={
          reduceMotion
            ? undefined
            : ({
                "--carousel-distance": `${distance}px`,
                "--carousel-duration": `${speed}s`,
              } as React.CSSProperties)
        }
        tabIndex={reduceMotion ? undefined : 0}
        role={reduceMotion ? undefined : "group"}
        aria-label={reduceMotion ? undefined : "Reviews, scrolling automatically. Hover or focus to pause."}
      >
        {items.map(({ text, highlight, name, role }, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, rotate: 1 }}
            onMouseMove={(event) => {
              const target = event.currentTarget;
              const rect = target.getBoundingClientRect();
              target.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
              target.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
            }}
            className="spotlight-card my-3 flex flex-shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-paper/12 bg-surface p-5 shadow-[0_24px_60px_-20px_rgba(5,8,22,0.7)] w-[320px]"
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

            <div className="mt-4 shrink-0">
              <div className="font-medium leading-tight text-paper">{name}</div>
              <div className="text-sm text-muted">{role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
