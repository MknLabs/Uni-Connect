import { BrandSection } from "@/components/Homepage/BrandSection";
import { FeatureSection } from "@/components/Homepage/FeatureSection";
import { HeroSection } from "@/components/Homepage/HeroSection";
import { Navbar } from "@/components/ui/Navbar";
import { StatSection } from "@/components/Homepage/StatSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 min-h-screen items-center justify-center font-sans">
      <Navbar />
      <HeroSection />
      <BrandSection />
      <StatSection />
      <FeatureSection />
    </div>
  );
}
