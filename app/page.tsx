import { BrandSection } from "@/components/BrandSection";
import { HeroSection } from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 min-h-screen items-center justify-center font-sans">
      <HeroSection />
      <BrandSection />
    </div>
  );
}
