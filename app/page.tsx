import { Button } from "@/components/Button";
import { HeroHeading } from "@/components/HeroHeading";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 min-h-screen items-center justify-center font-sans">
      <HeroHeading variant="primary">Alu le lo</HeroHeading>
      <Button size="lg">Alu le lo</Button>
    </div>
  );
}
