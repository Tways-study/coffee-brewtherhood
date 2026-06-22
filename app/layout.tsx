import type { Metadata } from "next";
import { Geist, Bricolage_Grotesque } from "next/font/google";
import Navbar from "@/app/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coffee Brewtherhood | Specialty Coffee in Jaro, Iloilo City",
  description:
    "Coffee Brewtherhood is an independent specialty-coffee cafe in Jaro, Iloilo City — 4.8 stars across 163 reviews. Dine-in and takeout, ₱1–500 per person.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[var(--z-skip-link)] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-medium focus:text-accent-ink"
        >
          Skip to content
        </a>
        <div
          aria-hidden="true"
          className="grain-overlay pointer-events-none fixed inset-0 z-[var(--z-grain)] opacity-[0.05] mix-blend-overlay"
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
