import Hero from "@/app/components/Hero";
import QuickFacts from "@/app/components/QuickFacts";
import Story from "@/app/components/Story";
import DrinkGallery from "@/app/components/DrinkGallery";
import Reviews from "@/app/components/Reviews";
import Visit from "@/app/components/Visit";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <Hero />
      <QuickFacts />
      <Story />
      <DrinkGallery />
      <Reviews />
      <Visit />
      <Footer />
    </main>
  );
}
