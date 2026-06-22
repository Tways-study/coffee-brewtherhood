"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
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

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const reduceMotion = useSafeReducedMotion();
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  // Tracks which in-page section is currently in view, so the nav can show
  // where you actually are on the page, not just which link you last clicked.
  useEffect(() => {
    if (pathname !== "/") return;
    const sectionIds = ["menu", "reviews", "visit"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: reduceMotion ? 0 : -24, opacity: reduceMotion ? 1 : 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-[var(--z-sticky)] transition-colors duration-300 ${
        scrolled
          ? "border-b border-paper/10 bg-ink-deep/80 backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-ink-deep/55 via-ink-deep/15 to-transparent"
      }`}
    >
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

        <div
          className="hidden items-center gap-1 text-sm text-paper/80 md:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/about"
                ? pathname === "/about"
                : pathname === "/" && activeSection === link.href.replace("/#", "");
            return (
              <Link
                key={link.label}
                href={link.href}
                onMouseEnter={() => setHovered(link.label)}
                className={`relative rounded-full px-3.5 py-2 transition-colors duration-300 ${
                  isActive ? "text-paper" : "hover:text-paper"
                }`}
              >
                {!reduceMotion && hovered === link.label && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-paper/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{link.label}</span>
                {isActive && (
                  <span aria-hidden className="absolute inset-x-3.5 -bottom-0.5 h-px bg-accent" />
                )}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-paper transition-transform duration-300 active:scale-90 md:hidden"
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
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.3, delay: reduceMotion ? 0 : index * 0.05, ease: EASE }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-2 py-2.5 transition-colors duration-300 hover:bg-paper/5 hover:text-paper"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
