import { cn } from "@/lib/utils"
import { SeamlessIntegratiion } from "./Features/SeamlessIntegration"
import { AutomaticGrading } from "./Features/AutomaticGrading"
import { RealtimeCollabration } from "./Features/RealtimeCollabration"
import { OrditCircle } from "./Features/OrbitCircle"

export const FeatureSection = () => {
    return (
        <section className="w-full max-w-7xl mx-auto py-4 px-4 md:px-8 md:my-20 md:py-20" id="product">
            <Header />
            <div className="mt-20 grid cols-1 lg:grid-cols-5 gap-4 auto-rows-[25rem] max-w-3xl mx-auto lg:max-w-none">
                <BentoCard col="3"
                    title="AI-Powered Learning"
                    subtitle="Personalized study assistance and intelligent content recommendations for every student"
                >
                    <SeamlessIntegratiion />
                </BentoCard>
                <BentoCard
                    title="Automated Grading"
                    subtitle="Smart assessment tools that save teachers hours while providing detailed student feedback"
                >
                    <AutomaticGrading />
                </BentoCard>
                <BentoCard
                    title="Smart Resource Management"
                    subtitle="AI-powered vector database for instant retrieval of educational materials, research papers, and course content"
                >
                    <OrditCircle />
                </BentoCard>
                <BentoCard col="3"
                    title="Real-time Collaboration Tools"
                    subtitle="Seamless interaction between teachers and students with automated workflows and intelligent notifications"
                >
                    <RealtimeCollabration />
                </BentoCard>
            </div>
        </section>
    )
}

export const Header = () => {
    return (
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
                Academic Intelligence
                <span className="text-[#FF7757]"> Reimagined</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
                Built with cutting-edge MCP technology to transform how universities operate, teach, and learn
            </p>
        </div>
    )
}


export const BentoCard = ({ children, col = "2", title, subtitle }: {
    title: string,
    subtitle: string,
    col?: "2" | "3"
    children?: React.ReactNode
}) => {
    return (
        <div className={cn("group isolate rounded-2xl bg-[#F9FAFB]! overflow-hidden flex relative flex-col justify-between",
            "shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]",
            col === "2" ? "lg:col-span-2" : "lg:col-span-3"
        )}>
            <div className="absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-300">
                {children}
            </div>
            <div className="absolute z-10 inset-x-0 bottom-0 h-[40%] bg-linear-to-t from-white via-white to-transparent" />
            <div className="p-6 absolute z-10 bottom-0">
                <h3 className="inline-block text-[22px] font-medium leading-[31px] font-rubik text-black">
                    {title}
                </h3>
                <p className="font-sans max-w-sm text-sm font-normal tracking-tight mt-2 text-neutral-400">
                    {subtitle}
                </p>
            </div>
        </div>
    )
}