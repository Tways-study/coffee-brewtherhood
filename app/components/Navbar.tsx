"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import logo from "@/app/assets/images/logo.jpg";
import { business } from "@/app/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

const navLinks = [
  { label: "Menu", href: "/#menu" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Visit", href: "/#visit" },
  { label: "About", href: "/about" },
];

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useSafeReducedMotion();

  return (
    <header className="fixed inset-x-0 top-0 z-[var(--z-sticky)] border-b border-paper/10 bg-ink-deep/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image
            src={logo}
            alt="Coffee Brewtherhood logo"
            width={36}
            height={36}
            className="rounded-full transition-transform duration-300 ease-out group-hover:scale-110"
          />
          <span className="font-display text-sm font-semibold text-paper transition-colors duration-300 group-hover:text-accent">
            {business.name}
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-paper/80 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors duration-300 hover:text-paper"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition-transform duration-300 ease-out hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper md:inline-block"
        >
          Get directions
          <span className="sr-only"> (opens in a new tab)</span>
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-paper md:hidden"
        >
          {open ? <X aria-hidden size={24} /> : <Menu aria-hidden size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: reduceMotion ? "auto" : 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: reduceMotion ? "auto" : 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.3, ease: EASE }}
            className="overflow-hidden border-b border-paper/10 bg-ink-deep md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4 text-base text-paper/85 sm:px-10">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2.5 transition-colors duration-300 hover:bg-paper/5 hover:text-paper"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-3 rounded-full bg-accent px-5 py-3 text-center text-sm font-medium text-accent-ink transition-transform duration-300 ease-out hover:scale-[1.02]"
              >
                Get directions
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
