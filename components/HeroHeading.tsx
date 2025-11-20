import { cn } from "@/lib/utils";

type HeroHeadingProps = {
    title: string;
    cta_title?: string;
    className?: string;
    as?: "h1" | "h2"
}

export const HeroHeading = ({
    title,
    cta_title,
    className,
    as = "h1",
}: HeroHeadingProps) => {
    const Tag = as;
    const baseClass = "inline-block bg-linear-to-b bg-clip-text text-transparent opacity-100 py-2";
    return (
        <Tag className={cn("from-[rgba(94,94,94,1)] to-[rgba(0,0,0,1)]", baseClass, className)}>
            {title}
            <span className={cn("from-[rgba(255,167,86,1)] to-[rgba(238,96,44,1)]", baseClass, className)}>
                {cta_title}
            </span>
        </Tag>
    )
}