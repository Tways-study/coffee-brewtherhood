import type { Metadata } from "next";
import AboutHero from "@/app/components/AboutHero";
import AboutContent from "@/app/components/AboutContent";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "About Us | Coffee Brewtherhood",
  description:
    "The story behind Coffee Brewtherhood, an independent specialty-coffee cafe in Jaro, Iloilo City.",
};

export default function About() {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <AboutHero />
      <AboutContent />
      <Footer />
    </main>
  );
}
