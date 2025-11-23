import Link from "next/link";
import { Icons } from "./Icons";

export function Logo() {
    return (
        <Link href={"/"} className="font-normal flex gap-2 justify-center items-center text-sm text-black px-2 py-1 shrink-0 relative z-20">
            <Icons.logo />
            <span className="font-medium text-black  text-lg">shape.ai</span>
        </Link>
    )
}