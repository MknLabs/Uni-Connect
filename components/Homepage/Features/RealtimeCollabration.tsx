import React from "react";
import { cn } from "@/lib/utils";
import { Circle } from "./AutomaticGrading";
import { Icons } from "../../ui/Icons";
import { NotificationList } from "./NotificationList";

export function RealtimeCollabration() {
    return (
        <div className="w-full h-full p-4 rounded-lg px-2 md:px-10 mt-6">
            <div className="w-full h-full p-4 bg-white border border-gray-200 rounded-xl">
                <div className="flex items-center gap-2 mb-6">
                    <Circle variant="red" />
                    <Circle variant="orange" />
                    <Circle variant="green" />
                </div>
                <div className="flex flex-col md:flex-row h-full gap-4">
                    <SectionSkeleton>
                        <ProfileSection />
                    </SectionSkeleton>
                    <SectionSkeleton className="flex-1">
                        <NotificationList />
                    </SectionSkeleton>
                </div>
            </div>
        </div>
    )
}

export function SectionSkeleton({ children, className }: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <div className={cn("shrink-0 bg-[#F9FAFB] p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow", className)}>
            {children}
        </div>
    )
}

export function ProfileSection() {
    return (
        <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full border-2 bg-white p-3">
                <Icons.user />
            </div>
            <div className="space-y-1">
                <p className="text-xs md:text-lg font-semibold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Masud Karim
                </p>
                <p className="text-[10px] md:text-xs font-medium text-gray-400 tracking-wider">
                    UNDERGRAD STUDENT
                </p>
            </div>
        </div>
    )
}