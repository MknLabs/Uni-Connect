import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { HeroHeading } from "./HeroHeading"
import { MobilePhone } from "../ui/MobilePhone"

export const HeroSection = () => {
    return (
        <section className="relative flex max-w-7xl rounded-b-3xl my-2 md:my-20  mx-auto flex-col items-center justify-center pt-32 overflow-hidden px-4 md:px-8 bg-linear-to-t from-[rgba(247,135,67,1)]  via-[rgba(255,244,239,1)] to-[rgba(255,255,255,1)]">
            <div className="text-balance relative z-20 mx-auto mb-4 max-w-6xl text-center text-4xl font-semibold tracking-tight text-gray-700  md:text-7xl">
                <span className="inline-block align-top decoration-inherit text-balance">
                    <HeroHeading title="Smart University " cta_title="Platform" />
                    <HeroHeading title="AI-Powered Academic " cta_title="Tools" className="-mt-2" />
                </span>
            </div>
            <SubHeading>
                Revolutionize campus efficiency with intelligent automation.<br />
                Connect teachers, students, and resources through AI workflows.
            </SubHeading>
            <div className="mb-8 mt-6 z-10 sm:mb-10 sm:mt-8 flex w-full flex-col items-center justify-center gap-4 px-4 sm:px-8 sm:flex-row md:mb-20">
                <Button size="lg" asChild>
                    <Link href="/login">Get Started</Link>
                </Button>
            </div>
            <div className="pt-8 w-full min-h-84 relative">
                <div className="absolute top-0 left-0 right-0 z-10">
                    <MobilePhone />
                </div>
            </div>
        </section>
    )
}

export const SubHeading = ({ children }: { children: React.ReactNode }) => {
    return (
        <p className="relative z-20 mx-auto mt-4 max-w-2xl px-4 text-center text-base/6 text-gray-600  sm:text-base opacity-100 transform-none">
            {children}
        </p>
    )
}