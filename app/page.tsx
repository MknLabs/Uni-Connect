import { BrandSection } from "@/components/BrandSection";
import { HeroSection } from "@/components/HeroSection";
import { StatSection } from "@/components/StatSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 min-h-screen items-center justify-center font-sans">
      <HeroSection />
      <BrandSection />
      <StatSection />
    </div>
  );
}
