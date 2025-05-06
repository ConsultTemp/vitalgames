'use client'
import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import FloatingImage from "../bg-image-component"
import SmoothReveal from "../smooth-reveal"
import { useState } from "react"

// Import images
import casinoroyale from "../../public/multigames/casinoroyale.png"
import casinoroyaleHover from "../../public/multigames/casinoroyalehover.jpg"
import diamante from "../../public/multigames/diamante.png"
import diamanteHover from "../../public/multigames/diamantehover.jpg"
import goldenclub from "../../public/multigames/goldenclub.png"
import piggygold from "../../public/multigames/piggygold.png"
import piggygoldHover from "../../public/multigames/piggygoldhover.jpg"
import rubino from "../../public/multigames/rubino.png"
import zaffiro from "../../public/multigames/zaffiro.png"
import floatingImage1 from "../../public/squalorosa.png"
import floatingImage2 from "../../public/squaloarancione.png"
import { Button } from "../ui/button"

const multigames = [
    {
        id: 1,
        slug: "casino-royale",
        title: "Casino Royale",
        image: casinoroyale,
        hoverImage: casinoroyaleHover,
    },
    {
        id: 2,
        slug: "diamante",
        title: "Diamante Multigame",
        image: diamante,
        hoverImage: diamanteHover,
    },
    {
        id: 3,
        slug: "golden-club",
        title: "Golden Club",
        image: goldenclub,
    },
    {
        id: 4,
        slug: "piggy-gold",
        title: "Piggy Gold Multigame",
        image: piggygold,
        hoverImage: piggygoldHover,
    },
    {
        id: 5,
        slug: "rubino",
        title: "Rubino",
        image: rubino,
    },
    {
        id: 6,
        slug: "zaffiro",
        title: "Zaffiro",
        image: zaffiro,
    }
]

export default function Multigames() {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    return (
        <section className="relative bg-transparent">
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

            <div className="absolute top-[-30px] md:top-[-100px] left-0 md:right-10 z-[1] max-w-[150px] md:max-w-none overflow-visible opacity-80">
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
                    <SmoothReveal> <h2 className="text-center text-4xl md:text-7xl font-bold text-white dharma whitespace-normal md:whitespace-nowrap px-4">SCOPRI I NOSTRI MULTIGAMES</h2></SmoothReveal>
                </div>

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-0 sm:px-4 md:px-4 lg:px-8"
                    onMouseLeave={() => setHoveredCard(null)}
                >
                    {multigames.map((game) => (
                        <div
                            key={game.id}
                            className="transition-all duration-300"
                            onMouseEnter={() => setHoveredCard(game.id)}
                        >
                            <SmoothReveal>
                                <Link
                                    href={`/multigame/${game.slug}`}
                                    className="w-full block group rounded-sm neon-card relative hover:scale-105 transition-all duration-300 [&>div]:rounded-sm [&>div>img]:rounded-sm"
                                >
                                    <div className="w-full h-full relative rounded-sm">
                                        <Image
                                            src={game.image}
                                            alt={game.title}
                                            className="object-cover w-full h-full rounded-sm"
                                        />
                                        {game.hoverImage && (
                                            <>
                                            
                                               
                                                <div
                                                    className={`absolute inset-0 transition-opacity duration-300 ${hoveredCard === game.id ? 'opacity-100' : 'opacity-0'}`}
                                                >
                                                    <Image
                                                        src={game.hoverImage}
                                                        alt={`${game.title} hover`}
                                                        className="object-cover w-full rounded-sm h-full"
                                                    />
                                                </div>
                                            </>
                                        )}
                                        <div
                                            className={`absolute bottom-0 left-0 right-0 h-full flex flex-col items-center justify-end pb-4 transition-all rounded-sm duration-500 ${hoveredCard === game.id ? 'opacity-100' : 'opacity-0'}`}
                                            style={{
                                                background: hoveredCard === game.id
                                                    ? 'linear-gradient(to bottom, transparent 0%, transparent 0%, rgba(0,0,0,1) 100%)'
                                                    : 'transparent',
                                                transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
                                                borderRadius: '6px',
                                                opacity: hoveredCard === game.id ? '1' : '0',
                                                transitionProperty: 'background, opacity',
                                                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                                            }}
                                        >
                                            <h3 className="text-white text-base font-bold mb-2">{game.title}</h3>
                                        </div>
                                    </div>
                                </Link>
                            </SmoothReveal>
                        </div>
                    ))}
                </div>
                <div className="w-full flex flex-col items-center py-16"><Button variant={"vitalYellow"} className="bg-vitalYellow text-sm text-black hover:opacity-90 px-8"><Link href="/awp-multigames">Guarda tutti i multigames</Link></Button></div>

            </div>
        </section>
    )
}
