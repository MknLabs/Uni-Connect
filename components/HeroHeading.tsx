import { cn } from "@/lib/utils";

type HeroHeadingProps = {
    children: React.ReactNode;
    className?: string;
    as?: "span" | "h1" | "h2"
    variant?: "primary" | "secondary"
}

export const HeroHeading = ({
    children,
    className,
    as = "h1",
    variant = "secondary"
}: HeroHeadingProps) => {
    const Tag = as;
    return (
        <Tag className={cn(
            "inline-block bg-linear-to-b bg-clip-text text-transparent opacity-100",
            "text-5xl md:text-7xl font-bold mb-4",
            variant == "primary" && "from-[rgba(255,167,86,1)] to-[rgba(238,96,44,1)]",
            variant == "secondary" && "from-[rgba(94,94,94,1)] to-[rgba(0,0,0,1)]",
            className
        )}>{children}</Tag>
    )
}