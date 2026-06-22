"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";
import CoffeeRing from "@/app/components/decor/CoffeeRing";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import logo from "@/app/assets/images/logo.jpg";
import { business } from "@/app/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

const socialLinks = [
  { label: "Facebook", href: `https://facebook.com/${business.social.profileSlug}`, Icon: FaFacebookF },
  { label: "TikTok", href: `https://tiktok.com/@${business.social.profileSlug}`, Icon: FaTiktok },
  { label: "Instagram", href: `https://instagram.com/${business.social.profileSlug}`, Icon: FaInstagram },
];

export default function Footer() {
  const reduceMotion = useSafeReducedMotion();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <footer className="relative isolate overflow-hidden bg-ink-deep">
      <CoffeeRing className="absolute -bottom-2 right-8 -z-10 h-40 w-40 text-paper/[0.24]" />

      <motion.div
        initial={{ y: reduceMotion ? 0 : 16 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: EASE }}
        className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-10"
      >
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src={logo}
            alt="Coffee Brewtherhood logo"
            width={36}
            height={36}
            className="rounded-full transition-transform duration-300 ease-out group-hover:scale-110"
          />
          <div>
            <p className="font-display text-sm font-medium text-paper transition-colors duration-300 group-hover:text-accent">
              {business.name}
            </p>
            <p className="text-xs text-muted">{business.social.handle}</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          {socialLinks.map(({ label, href, Icon }, index) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : index * 0.07, ease: EASE }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted transition-all duration-300 hover:-translate-y-0.5 hover:bg-paper/10 hover:text-paper active:translate-y-0 active:scale-95"
            >
              <Icon aria-hidden size={18} />
              <span className="sr-only"> (opens in a new tab)</span>
            </motion.a>
          ))}

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 text-paper/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-paper active:translate-y-0 active:scale-95"
          >
            <ArrowUp aria-hidden size={16} />
          </button>
        </nav>

        <p className="text-xs text-muted/70">
          © {new Date().getFullYear()} {business.name}. Jaro, Iloilo City.
        </p>
      </motion.div>
    </footer>
  );
}
