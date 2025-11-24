import React from "react"

export const MobilePhone = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div className="relative mx-auto h-[600px] w-[300px] md:h-[680px] md:w-[340px]">
            <div className="absolute inset-0 rounded-[50px] border-14 border-black bg-neutral-100 shadow-xl">
                <PunchHoleCamera />
                {children}
            </div>
            <div className="absolute -right-0.5 top-[170px] h-12 w-[3px] rounded-l-lg bg-black" />
            <div className="absolute -left-0.5 top-[120px] h-12 w-[3px] rounded-r-lg bg-black" />
            <div className="absolute -left-0.5 top-[170px] h-14 w-[3px] rounded-r-lg bg-black" />
        </div>
    )
}

export const PunchHoleCamera = () => {
    return (
        <div className="absolute left-1/2 top-2 h-[1.8rem] w-24 -translate-x-1/2 rounded-full bg-black z-10">
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-[0.6rem] h-[0.6rem] rounded-full bg-[#1a1a1a] ring-[1.5px] ring-[#2a2a2a]">
                <div className="absolute inset-[1.5px] rounded-full bg-[#0f0f0f]">
                    <div className="absolute inset-[1.5px] rounded-full bg-[#0f0f0f]" />
                </div>
            </div>
        </div>
    )
}