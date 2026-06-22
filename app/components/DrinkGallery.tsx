"use client";

import { useMemo } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion } from "motion/react";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import CircularGallery from "@/components/ui/circular-gallery";
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

export default function DrinkGallery() {
  const reduceMotion = useSafeReducedMotion();

  const galleryItems = useMemo(
    () =>
      menuHighlights.map((drink) => ({
        image: images[drink.image].src,
        text: drink.name,
      })),
    []
  );

  return (
    <section id="menu" className="scroll-mt-24 overflow-hidden bg-ink-deep">
      <div className="mx-auto max-w-6xl px-6 pt-20 sm:px-10 sm:pt-28">
        <h2 className="max-w-md font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold tracking-[-0.02em] text-paper">
          What people order
        </h2>
        <p className="mt-3 max-w-md text-muted">
          Pulled straight from the drinks on the counter and what reviewers keep coming back for.
        </p>

        {/* Accessible, content-complete fallback: the WebGL gallery below only carries each
            drink's name on its label, so the full name + note pairing lives here for screen
            readers and anyone without canvas/WebGL support. */}
        <ul className="sr-only">
          {menuHighlights.map((drink) => (
            <li key={drink.name}>
              {drink.name}: {drink.note}
            </li>
          ))}
        </ul>
      </div>

      {reduceMotion ? (
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-12 sm:px-10 sm:pb-28">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {menuHighlights.map((drink) => (
              <div key={drink.name} className="group relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={images[drink.image]}
                  alt={`${drink.name} served at Coffee Brewtherhood`}
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className={`object-cover ${drink.imagePosition ?? ""}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/85 via-ink-deep/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-base font-semibold text-paper">{drink.name}</p>
                  <p className="text-xs text-paper/75">{drink.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Full-bleed: the curved gallery's outer cards need to extend to the viewport edge,
        // not stop at the text column's max-width, or they read as cut off.
        <motion.div
          initial={{ y: 18 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 h-[420px] w-full pb-20 sm:h-[480px] sm:pb-28 md:h-[560px]"
        >
          <CircularGallery
            items={galleryItems}
            bend={2}
            textColor="oklch(0.96 0.01 255)"
            borderRadius={0.06}
            font="bold 28px Bricolage Grotesque"
            fontUrl="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600&display=swap"
            scrollSpeed={1.6}
            scrollEase={0.06}
          />
        </motion.div>
      )}
    </section>
  );
}
