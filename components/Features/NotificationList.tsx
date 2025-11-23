"use client"

import { cn } from "@/lib/utils"
import { AnimatedList } from "./AnimatedList"

interface Item {
    name: string
    description: string
    icon: string
    color: string
}

let notifications = [
    {
        name: "Assignment Graded",
        description: "CS-101: Data Structures",
        icon: "📝",
        color: "#00C9A7",
    },
    {
        name: "New Student Joined",
        description: "ETE Department",
        icon: "🎓",
        color: "#FFB800",
    },
    {
        name: "Resource Shared",
        description: "Professor Rahman",
        icon: "📚",
        color: "#FF3D71",
    },
    {
        name: "Lecture Updated",
        description: "Room 304 → Online",
        icon: "🎥",
        color: "#1E86FF",
    },
]

notifications = Array.from({ length: 10 }, () => notifications).flat()

const Notification = ({ name, description, icon, color }: Item) => {
    return (
        <figure
            className={cn(
                "relative mx-auto min-h-fit w-full cursor-pointer overflow-hidden rounded-2xl p-4",
                // animation styles
                "transition-all duration-200 ease-in-out hover:scale-[103%]",
                // light styles
                "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                // dark styles
                "transform-gpu dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)]"
            )}
        >
            <div className="flex flex-row items-center gap-3">
                <div
                    className="flex size-8 items-center justify-center rounded-2xl"
                    style={{
                        backgroundColor: color,
                    }}
                >
                    <span>{icon}</span>
                </div>
                <div className="flex flex-col overflow-hidden">
                    <figcaption className="flex flex-row items-center font-medium whitespace-pre dark:text-white">
                        <span className="text-sm sm:text-lg">{name}</span>
                    </figcaption>
                    <p className="text-xs dark:text-white/60">
                        {description}
                    </p>
                </div>
            </div>
        </figure>
    )
}

export function NotificationList({
    className,
}: {
    className?: string
}) {
    return (
        <div
            className={cn(
                "relative flex w-full flex-col overflow-hidden p-2",
                className
            )}
        >
            <AnimatedList>
                {notifications.map((item, idx) => (
                    <Notification {...item} key={idx} />
                ))}
            </AnimatedList>

            <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t"></div>
        </div>
    )
}
