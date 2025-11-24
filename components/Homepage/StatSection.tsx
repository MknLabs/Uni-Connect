import { cn } from "@/lib/utils"
import { SectionHeader, SectionHeaderBlock, SectionSubHeader } from "../ui/SectionHeader"

export const StatSection = () => {
    return (
        <section className="w-full py-20 relative">
            <Header />
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 z-10">
                <Card title={"5x"} subtitle={"Faster grading speed"} />
                <Card title={"99%"} subtitle={"Assignment accuracy"} />
                <Card title={"Zero"} subtitle={"Data breaches"} />
                <Card title={"100ms"} subtitle={"Average response time"} />
            </div>
        </section>
    )
}

const Header = () => {
    return (
        <SectionHeaderBlock>
            <SectionHeader>
                {"Scale with "}
                <span className="text-[oklch(0.65_0.25_30)]">NO</span>
                {" issues"}
            </SectionHeader>
            <SectionSubHeader className="mx-4">
                {"Scalable, reliable, and always available - grows with your institution's needs."}
            </SectionSubHeader>
        </SectionHeaderBlock>
    )
}

const Card = ({ title, subtitle }: {
    title: string
    subtitle: string
}) => {
    return (
        <div className="relative p-6 rounded-xl border border-gray-200 bg-background/50 backdrop-blur-sm hover:shadow-xl transition-discrete overflow-hidden">
            <GridBackground />
            <div className="relative z-10"> {/* Add this wrapper */}
                <h3 className="text-4xl font-bold mb-2">{title}</h3>
                <p className="text-muted-foreground">{subtitle}</p>
            </div>
        </div>
    )
}

export function GridBackground() {
    return (
        <div className={cn(
            "absolute inset-0",
            "bg-size-[20px_20px]",
            "bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
            "mask-radial-[at_center_center,white,transparent_80%]"
        )} />
    );
}