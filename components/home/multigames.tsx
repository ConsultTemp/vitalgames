'use client'
import Image from "next/image"
import Link from "next/link"
import FloatingImage from "../bg-image-component"
import SmoothReveal from "../smooth-reveal"
import { useLanguage } from "@/components/language-provider"

// Import images
import casinoroyaleHover from "../../public/multigames-cards/CASINO ROYALE_Converted.jpg"
import diamanteHover from "../../public/multigames-cards/DIAMANTE_Converted.jpg"
import luckySlot from "../../public/multigames-cards/lucky_slot.png"
import floatingImage1 from "../../public/squalorosa.png"
import floatingImage2 from "../../public/squaloarancione.png"
import { Button } from "../ui/button"
import fortuneUltralink from '../../public/fortune_ultralink.png'

const multigames = [
    {
        id: 1,
        slug: "casino-royale",
        title: "Casino Royale",
        image: casinoroyaleHover,
    },
    {
        id: 2,
        slug: "diamante",
        title: "Diamante Multigame",
        image: diamanteHover,
    },
    {
        id: 3,
        slug: "fortune-ultralink",
        title: "Fortune Ultralink",
        image: fortuneUltralink,
    },
    {
        id: 4,
        slug: "lucky-slot",
        title: "Lucky Slot",
        image: luckySlot,
    }
]

export default function Multigames() {
    const { dictionary: dict } = useLanguage()

    return (
        <section className="relative bg-transparent pt-32">
            {/* Side gradients */}
            <div
                className="absolute top-[60%] -translate-y-1/2 left-0 w-[500px] h-[1200px] pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at left center, rgba(255, 196, 0, 0.35) 0%, rgba(255, 196, 0, 0.2) 30%, rgba(255, 196, 0, 0.1) 50%, transparent 70%)'
                }}
            />
            <div
                className="absolute top-[40%] -translate-y-1/2 right-0 w-[500px] h-[1200px] pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at right center, rgba(59, 130, 246, 0.35) 0%, rgba(59, 130, 246, 0.2) 30%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)'
                }}
            />

            <div className="absolute top-[0px] md:top-[0px] left-0 md:right-10 z-[1] max-w-[150px] md:max-w-none overflow-visible opacity-80">
                <FloatingImage
                    src={floatingImage1}
                    alt="Floating Image 1"
                    className="w-64 md:w-72 h-32 sm:h-48 md:h-72 overflow-visible"
                />
            </div>
            <div className="absolute bottom-[-50px] right-[100px] md:right-[-10px] md:right-0 z-[1] max-w-[120px] md:max-w-none">
                <FloatingImage
                    src={floatingImage2}
                    alt="Floating Image 2"
                    className="w-72 md:w-72 h-32 sm:h-48 md:h-72 overflow-visible"
                />
            </div>
            <div className="container mx-auto px-4 relative z-10 pb-12 md:pb-36">
                <div className="mb-6 md:mb-8 w-full flex flex-col items-center">
                    <SmoothReveal className="inline-block bg-vitalYellow text-black text-xs font-medium px-2 py-[3.5px] rounded mb-2">
                        AWP MULTIGAMES
                    </SmoothReveal>
                    <SmoothReveal> <h2 className="text-center text-4xl md:text-7xl font-bold text-white dharma whitespace-normal md:whitespace-nowrap px-4">{dict.home.multigames.title}</h2></SmoothReveal>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-2 md:gap-2 px-0 sm:px-4 md:px-4 lg:px-8">
                    {multigames.map((game) => (
                        <div key={game.id}>
                            <SmoothReveal>
                                <Link
                                    href={`/awp-multigames/${game.slug}`}
                                    className="w-full block group rounded-sm relative hover:scale-[1.01] transition-all duration-300"
                                >
                                    <div className="w-full h-full relative rounded-sm">
                                        <Image
                                            src={game.image}
                                            alt={game.title}
                                            className="object-cover w-full h-full rounded-sm"
                                        />
                                    </div>
                                </Link>
                            </SmoothReveal>
                        </div>
                    ))}
                </div>
                <div className="w-full flex flex-col items-center py-16">
                    <Button variant={"vitalYellow"} className="bg-vitalYellow text-sm text-black hover:opacity-90 px-8">
                        <Link href="/awp-multigames">{dict.footer.multigames}</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
