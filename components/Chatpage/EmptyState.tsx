import { IconBook2, IconCalendar, IconFolder, IconMicroscope } from "@tabler/icons-react";
import { HeroHeading } from "../Homepage/HeroHeading"
import { Logo } from "../ui/Logo"
import { Composer } from "./Composer";

const EmptyState = () => {
    const FEATURES = [
        { title: "Courses", icon: IconBook2 },
        { title: "Schedule", icon: IconCalendar },
        { title: "Research", icon: IconMicroscope },
        { title: "Resources", icon: IconFolder },
    ];

    return (
        <div className="relative flex w-full h-full flex-col items-center justify-center bg-linear-to-t from-[rgba(245,198,169,1)]  via-[rgba(255,244,239,1)] to-[rgba(255,255,255,1)] max-w-7xl mx-auto">
            <Logo className="absolute top-0 left-0 px-8 py-4" />
            <div className="text-balance relative z-20 mx-auto mb-4 max-w-6xl text-center text-4xl font-semibold tracking-tight text-gray-700 md:text-7xl">
                <HeroHeading title="Campus " cta_title="Intelligence" className="pb-4" />
            </div>
            <p className="mb-8 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-300 -mt-5">
                Streamlining campus life through intelligent conversation and automation
            </p>

            <Composer
                className="w-full max-w-4xl"
                placeholder="Search courses, find resources, or ask a question..."
            />

            <div className="flex flex-wrap justify-between items-center mt-2 gap-2">
                {FEATURES.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <div
                            key={index}
                            className="flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-6 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-white hover:shadow-md"
                        >
                            <Icon size={16} className="text-orange-500" />
                            <span>{feature.title}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default EmptyState;