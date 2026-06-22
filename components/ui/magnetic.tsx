"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

const MAX_PULL = 8;
const PULL_FACTOR = 0.35;

// Pulls its child toward the cursor within a small radius, the primary CTA
// reading as the one element on the page that actually responds to you.
// Driven entirely by motion values, never React state, so pointer movement
// never re-renders the tree.
export default function Magnetic({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useSafeReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 });

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, relX * PULL_FACTOR)));
    y.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, relY * PULL_FACTOR)));
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
