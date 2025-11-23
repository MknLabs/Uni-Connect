import React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "../Icons";

export function OrditCircle() {
    return (
        <Circle className="size-[360px] mask-b-from-30%">
            <Circle className="size-[280px]" variant="secondary" />
            <Circle className="size-[180px]" />
            <Circle className="size-[100px]" variant="secondary" />
            <Circle variant="secondary">
                <Icons.logo />
            </Circle>
        </Circle>
    )
}

export function Circle({ className, variant = "primary", children }: {
    className?: string
    variant?: "primary" | "secondary"
    children?: React.ReactNode
}) {
    return (
        <div className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full", className,
            variant == "primary" ? "bg-[radial-gradient(circle,rgba(249,250,251,1)_0%,rgba(255,187,128,1)_50%,rgba(254,166,89,1)_100%)]" : "bg-white"
        )}>
            {children}
        </div>
    )
}