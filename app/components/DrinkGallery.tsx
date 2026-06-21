"use client";

import Image, { type StaticImageData } from "next/image";
import { motion } from "motion/react";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import spanishLatte from "@/app/assets/images/spanish-latte.jpg";
import blueMansi from "@/app/assets/images/blue-mansi.jpg";
import matchaStrawberry from "@/app/assets/images/matcha-strawberry.jpg";
import blueberryMansi from "@/app/assets/images/blueberry-mansi.jpg";
import matchaCheesecake from "@/app/assets/images/matcha-cheesecake.jpg";
import yellowMansi from "@/app/assets/images/yellow-mansi-cup.jpg";
import redMansi from "@/app/assets/images/red-mansi-cup.jpg";
import { menuHighlights } from "@/app/lib/content";

const images: Record<string, StaticImageData> = {
  "spanish-latte": spanishLatte,
  "blue-mansi": blueMansi,
  "matcha-strawberry": matchaStrawberry,
  "blueberry-mansi": blueberryMansi,
  "matcha-cheesecake": matchaCheesecake,
  "yellow-mansi": yellowMansi,
  "red-mansi": redMansi,
};

const sizeClasses: Record<string, string> = {
  tall: "row-span-2",
  wide: "col-span-2",
  small: "",
};

export default function DrinkGallery() {
  const reduceMotion = useSafeReducedMotion();

  return (
    <section id="menu" className="scroll-mt-24 bg-ink-deep">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
        <h2 className="max-w-md font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold tracking-[-0.02em] text-paper">
          What people order
        </h2>
        <p className="mt-3 max-w-md text-muted">
          Pulled straight from the drinks on the counter and what reviewers keep coming back for.
        </p>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: reduceMotion ? 0 : 0.08 } },
          }}
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:[grid-auto-flow:dense] sm:auto-rows-[200px]"
        >
          {menuHighlights.map((drink) => (
            <motion.div
              key={drink.name}
              variants={{
                hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: reduceMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className={`group relative min-h-[160px] overflow-hidden rounded-2xl ${sizeClasses[drink.size]}`}
            >
              <Image
                src={images[drink.image]}
                alt={`${drink.name} served at Coffee Brewtherhood`}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className={`object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${drink.imagePosition ?? ""}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/85 via-ink-deep/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-display text-lg font-semibold text-paper">{drink.name}</p>
                <p className="text-sm text-paper/75">{drink.note}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
