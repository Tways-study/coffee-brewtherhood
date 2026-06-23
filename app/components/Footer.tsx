"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";
import CoffeeRing from "@/app/components/decor/CoffeeRing";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import logo from "@/app/assets/images/logo.jpg";
import { business, tagline } from "@/app/lib/content";

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
      <CoffeeRing className="absolute -bottom-4 right-8 -z-10 h-44 w-44 text-paper/[0.18]" />

      <motion.div
        initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: EASE }}
        className="mx-auto max-w-6xl px-6 pt-14 pb-8 sm:px-10 sm:pt-16"
      >
        {/* Three-column grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 border-b border-paper/10 pb-10">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-3 mb-5">
              <Image
                src={logo}
                alt="Coffee Brewtherhood logo"
                width={40}
                height={40}
                className="rounded-full transition-transform duration-300 ease-out group-hover:scale-105"
              />
              <span className="font-display text-sm font-semibold text-paper transition-colors duration-300 group-hover:text-accent">
                {business.name}
              </span>
            </Link>
            <p className="text-sm text-muted/75 leading-relaxed max-w-[28ch]">
              {tagline}
            </p>
          </div>

          {/* Follow column */}
          <div>
            <p className="text-xs text-muted/45 mb-5 tracking-[0.1em] uppercase">Follow</p>
            <div className="flex gap-2 mb-4">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-paper/12 text-muted transition-all duration-300 hover:border-paper/25 hover:text-paper hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                >
                  <Icon aria-hidden size={16} />
                </a>
              ))}
            </div>
            <p className="text-sm text-muted">{business.social.handle}</p>
          </div>

          {/* Visit column */}
          <div>
            <p className="text-xs text-muted/45 mb-5 tracking-[0.1em] uppercase">Visit</p>
            <p className="text-sm text-paper/80">{business.hours}</p>
            <address className="not-italic mt-2 text-sm text-muted leading-relaxed">
              Golden AC Business Center<br />
              E Lopez St, Jaro<br />
              Iloilo City 5000
            </address>
            <a
              href={`tel:${business.phone.replace(/\s/g, "")}`}
              className="mt-3 inline-block text-sm text-muted transition-colors duration-300 hover:text-paper"
            >
              {business.phone}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between pt-6">
          <p className="text-xs text-muted/45">
            © {new Date().getFullYear()} {business.name}
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-paper/12 text-muted/60 transition-all duration-300 hover:border-paper/25 hover:text-paper hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
          >
            <ArrowUp aria-hidden size={14} />
          </button>
        </div>
      </motion.div>
    </footer>
  );
}
