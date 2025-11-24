import Image from "next/image"

export const BrandSection = () => {
    return (
        <section className="relative w-full py-12 md:py-4 overflow-hidden">
            <div className="text-balance relative z-20 mx-auto mb-6 max-w-4xl text-center text-lg font-semibold tracking-tight text-gray-700  md:text-3xl px-4">
                <h2 className="inline-block text-center text-[#3D3D3D] font-inter text-[22px] font-semibold">
                    Connect with Your Favorite AI
                </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-6 md:gap-10 w-full max-w-3xl mx-auto relative px-4">
                <Logo title="Gemini" img_src="assets/Gemini_logo.svg" />
                <Logo title="ChatGPT" img_src="assets/ChatGPT_logo.svg" />
                <Logo title="Grok" img_src="assets/Grok_logo.svg" />
                <Logo title="DeepSeek" img_src="assets/DeepSeek_logo.svg" />
            </div>
        </section>
    )
}

export const Logo = ({ title, img_src }: { title: string; img_src: string; }) => {
    return (
        <div className="flex items-center justify-center gap-2">
            <Image src={img_src} alt={`${title} Logo`} width={24} height={24} />
            <p className="font-semibold text-2xl text-neutral-600">{title}</p>
        </div>
    )
}