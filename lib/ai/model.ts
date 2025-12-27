import { Brain, LucideProps, Sparkles, Zap } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type Model = {
    name: string;
    model: string;
    description: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    selected: boolean;
}

const MODELS: Model[] = [
    {
        name: "Auto",
        model: "gpt-4o-mini",
        description: "Chooses Fast or Expert",
        icon: Sparkles,
        selected: true,
    },
    {
        name: "Fast",
        model: "gpt-5-nano",
        description: "Quick responses",
        icon: Zap,
        selected: false,
    },
    {
        name: "Expert",
        model: "gpt-4o",
        description: "Thinks hard",
        icon: Brain,
        selected: false,
    },
];

export default MODELS;