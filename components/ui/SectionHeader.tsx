import { cn } from "@/lib/utils";

export const SectionHeaderBlock = ({ className, children }: {
    children: React.ReactNode
    className?: string
}) => {
    return (
        <div className={cn("text-center mb-12", className)}>
            {children}
        </div>
    )
}

export const SectionHeader = ({ children, className, as = "h2" }: {
    children: React.ReactNode
    className?: string
    as?: "h2" | "h3"
}) => {
    const Tag = as;
    return (
        <Tag className={cn("text-4xl font-bold mb-4", className)}>
            {children}
        </Tag>
    )
}

export const SectionSubHeader = ({ children }: { children: React.ReactNode }) => {
    return (
        <p className="text-muted-foreground mx-4">
            {children}
        </p>
    )
}