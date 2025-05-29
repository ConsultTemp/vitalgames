"use client"

import { useState, useEffect } from "react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import type { CarouselApi } from "@/components/ui/carousel"

// Import images
import mrDiamondImage from "../../public/mrdiamondbg.webp"
import mrDiamondMobileImage from "../../public/mr_diamond_mobile.webp"
import luckyCharmsImage from "../../public/lostruzzo.webp"
import luckyCharmsMobileImage from "../../public/lo_struzzo_mobile.webp"
import pirateTreasureImage from "../../public/reggaefrogbg.webp"
import pirateTreasureMobileImage from "../../public/reggae_frog_mobile.webp"

// Hook per il responsive design
function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const media = window.matchMedia(query)
        if (media.matches !== matches) {
            setMatches(media.matches)
        }

        const listener = () => {
            setMatches(media.matches)
        }

        media.addEventListener("change", listener)
        return () => media.removeEventListener("change", listener)
    }, [matches, query])

    return matches
}

// Dati delle slide
const gameSlides = [
    {
        id: 1,
        title: "Scopri un mondo di diamanti, misteri e jackpot esplosivi!",
        description:
            "Tra Bonus Diamond, giri gratuiti e simboli Link, ogni spin può sbloccare premi incredibili fino a 2000 volte la puntata.",
        features: ["Vivi l'adrenalina con funzionalità extra come il Buy Bonus e l'autoplay."],
        imageSrc: mrDiamondImage,
        mobileImageSrc: mrDiamondMobileImage,
        imageAlt: "Mr Diamond Ultra Link game character with green hat",
        demoUrl:"https://server.vitalgam.es:32160/SLOT/MrDiamond/?demo=true"
    },
    {
        id: 2,
        title: "Esplora il mondo di Lucky Charms",
        description:
            "Con simboli magici e bonus speciali, ogni giro può portare a vincite straordinarie fino a 5000 volte la puntata.",
        features: ["Goditi funzionalità uniche come Free Spins e Moltiplicatori progressivi."],
        imageSrc: luckyCharmsImage,
        mobileImageSrc: luckyCharmsMobileImage,
        imageAlt: "Lucky Charms slot game",
        demoUrl:"https://server.vitalgam.es:32160/SLOT/LoStruzzo/?demo=true/"
    },
    {
        id: 3,
        title: "Avventurati nel Tesoro dei Pirati",
        description: "Cerca il tesoro nascosto con simboli Wild e Scatter per vincite fino a 3000 volte la tua scommessa.",
        features: ["Attiva la modalità Caccia al Tesoro per premi garantiti e giri bonus."],
        imageSrc: pirateTreasureImage,
        mobileImageSrc: pirateTreasureMobileImage,
        imageAlt: "Pirate Treasure slot game",
        demoUrl: "https://server.vitalgam.es:32160/SLOT/ReggaeFrog/?demo=true"
    },
]

export function GameCarousel() {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    useEffect(() => {
        if (!api) {
            return
        }

        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    if (!isDesktop) {
        // Versione mobile: card impilate verticalmente
        return (
            <div className="w-full py-12 mt-12 bg-black px-4">
                {gameSlides.map((slide) => (
                    <div key={slide.id} className="rounded-lg overflow-hidden shadow-lg relative mb-8">
                        <div className="relative w-full">
                            <Image
                                src={slide.mobileImageSrc || slide.imageSrc || "/placeholder.svg"}
                                alt={slide.imageAlt}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <div className="absolute inset-0 flex flex-col justify-end">
                            <div className="bg-gradient-to-t from-black via-black/80 to-transparent pt-32 pb-6">
                                <div className="flex flex-col justify-end items-center text-center max-w-[90%] mx-auto text-white">
                                    <h2 className="text-xl font-bold mb-3">{slide.title}</h2>
                                    <p className="text-sm font-extralight mb-3" style={{fontWeight:"200"}}>{slide.description}</p>
                                    <div className="flex flex-row gap-2">
                                        <Button className="bg-white text-black hover:bg-gray-100 flex items-center gap-2 text-sm py-1 rounded-full">
                                            <Play className="h-3 w-3" />
                                            Avvia demo
                                        </Button>
                                        <Button variant="outline" className="border-white text-white hover:bg-white/5 text-sm py-1 rounded-full">
                                            Scopri di più
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    // Versione desktop: carosello
    return (
        <div className="relative w-full max-w-7xl mx-auto my-36 bg-black">
            <div className="flex absolute right-0 w-full -top-12 flex-row items-center justify-between">
                <h2 className="text-white text-5xl font-bold dharma">I nostri giochi online</h2>
                <div className="flex space-x-2 z-10">
                    <Button variant="outline" size="icon" className="rounded-full hover:bg-black hover:opacity-80" onClick={() => api?.scrollPrev()}>
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full hover:bg-black hover:opacity-80" onClick={() => api?.scrollNext()}>
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <Carousel
                setApi={setApi}
                opts={{
                    loop: true,
                    align: "start",
                    containScroll: "trimSnaps",
                    slidesToScroll: 1,
                }}
                className="w-full relative"
            >
                <div className="absolute right-0 top-0 bottom-0 w-[15%] bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
                <CarouselContent className="-ml-4">
                    {gameSlides.map((slide) => (
                        <CarouselItem key={slide.id} className="pl-4 basis-[85%]">
                            <div className="relative rounded-lg overflow-hidden">
                                <div className="relative w-full">
                                    <Image
                                        src={slide.imageSrc || "/placeholder.svg"}
                                        alt={slide.imageAlt}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                    <div className="h-full flex flex-col justify-end pb-12 p-8 max-w-[40%] text-white">
                                        <h2 className="text-2xl font-bold mb-2">{slide.title}</h2>
                                        <p className="text-sm mb-4 opacity-90" style={{fontWeight:"200"}}>{slide.description}</p>
                                        <div className="flex flex-row gap-4">
                                            <Button className="bg-white text-black hover:bg-gray-100 flex items-center gap-2 rounded-full text-sm">
                                                <Play className="h-4 w-4" />
                                                Avvia demo
                                            </Button>
                                            <Button variant="outline" className="border-white text-white hover:bg-white/5 rounded-full text-sm">
                                                Scopri di più
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            <div className="flex justify-center mt-4">
                {gameSlides.map((_, index) => (
                    <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className={`w-2 h-2 p-0 rounded-full mx-1 ${current === index ? "bg-vitalYellow" : "bg-gray-300"}`}
                        onClick={() => api?.scrollTo(index)}
                    />
                ))}
            </div>
        </div>
    )
}
