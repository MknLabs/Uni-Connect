import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";


type ButtonProps = {
    children: React.ReactNode;
    className?: string;
    variant?: "primary" | "secondary" | "outline";
    size?: "default" | "sm" | "lg"
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const Button = ({
    children,
    className,
    variant = "secondary",
    size = "default",
    ...props
}: ButtonProps) => {
    const { href, ...rest } = props;
    const combinedClasses = cn(
        "px-4 py-2 text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-flex items-center justify-center rounded-[6px] ",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none",
        "hover:-translate-y-1 active:scale-95",
        variant === "primary" && "text-white bg-[linear-gradient(195deg,_#FFA756_17.78%,_#EE602C_75.71%)] shadow-primary",
        variant === "secondary" && "bg-[linear-gradient(181deg,_#5E5E5E_18.12%,_#000_99.57%)] shadow-primary text-white",
        variant === "outline" && "text-black bg-white rounded-[6px] border border-[#E5E5E5]",
        size == "default" && "h-9 px-4 py-2 has-[>svg]:px-3",
        size == "sm" && "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        size == "lg" && "h-12 rounded-md px-6 has-[>svg]:px-4",
        className
    );

    if (href) {
        return (
            <Link
                href={href}
                className={combinedClasses}
                {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            className={combinedClasses}
            {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
            {children}
        </button>
    );
};
