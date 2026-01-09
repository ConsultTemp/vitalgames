"use client"

import { useState, useEffect, useRef } from "react"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { OptimizedLink as Link } from "@/components/optimized-link"
import { useLanguage } from "@/components/language-provider"
import { multigames } from "@/lib/cards"

export function MultigamesCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const { dictionary: dict, lang } = useLanguage()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    if (api) {
      intervalRef.current = setInterval(() => {
        api.scrollNext()
      }, 5000)
    }
  }

  useEffect(() => {
    if (!api) return

    resetTimer()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [api])

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
      resetTimer()
    })
  }, [api])

  const handleScrollPrev = () => {
    api?.scrollPrev()
    resetTimer()
  }

  const handleScrollNext = () => {
    api?.scrollNext()
    resetTimer()
  }

  const handleScrollTo = (index: number) => {
    api?.scrollTo(index)
    resetTimer()
  }

  const getDescription = (slug: string) => {
    const descriptions = dict?.home?.multigames?.descriptions
    if (!descriptions) return ""

    const keyMap: Record<string, string> = {
      "manhattan": "manhattan",
      "fortune-gold": "fortune-ultralink",
      "champions": "champions",
      "diamante": "diamante"
    }

    const key = keyMap[slug] || slug
    const fullDescription = descriptions[key as keyof typeof descriptions] || ""
    const targetLength = Math.floor(fullDescription.length * 0.7)
    
    if (fullDescription.length <= targetLength) return fullDescription

    const truncated = fullDescription.substring(0, targetLength)
    const lastSpace = truncated.lastIndexOf(' ')
    return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...'
  }

  const getMultigamePageImage = (slug: string) => {
    const imageMap: Record<string, string> = {
      "manhattan": "/manhattan.webp",
      "fortune-gold": "/fortune-gold.webp",
      "champions": "/champions-slot.webp",
      "diamante": "/diamante.webp"
    }
    return imageMap[slug] || null
  }

  const getGradientColor = () => {
    return "#0d1b2a"
  }

  return (
    <div 
      className="relative w-full py-12"
      style={{
        background: 'linear-gradient(to bottom, #1a0d2e 0%, #2d1b1b 50%, #101010 100%)'
      }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative w-full flex flex-col items-start justify-start">
          <h1 className=" max-w-2xl text-lg md:text-6xl font-hitmarker-black mb-6 text-white uppercase tracking-[-0.5px] text-left">{dict.home.multigames.title}</h1>
          <div className="relative w-full overflow-hidden rounded-lg">
            <Carousel
              setApi={setApi}
              opts={{
                loop: true,
                align: "start",
                slidesToScroll: 1,
                duration: 25,
                dragFree: false,
              }}
              className="w-full relative"
            >
              <CarouselContent className="-ml-0">
                {multigames.map((multigame, index) => (
                  <CarouselItem
                    key={multigame.id}
                    className={`pl-0 basis-full px-1 md:px-2`}
                  >
                    <div 
                      className="w-full backdrop-blur-xs bg-black/60 border border-[#505050] rounded-xl overflow-hidden"
                    >
                      <div className="hidden md:grid md:grid-cols-2 items-center">
                        <div className="flex flex-col text-white p-6 items-start justify-center ">
                          <p className="text-vitalYellow text-sm font-hitmarker-text-medium uppercase mb-2">
                            AWP MULTIGAME
                          </p>
                          <h2 className="text-2xl md:text-8xl font-hitmarker-black uppercase mb-2">
                            {multigame.title}
                          </h2>
                          <p className="text-sm lg:text-sm font-hitmarker-text-regular mb-6 w-full">
                            {getDescription(multigame.slug)}
                          </p>
                          <Link href={`/${lang}/games?type=awp-multigames`} className="!m-0">
                            <Button
                              variant="vitalYellow"
                              className="py-6 px-8 uppercase"
                            >
                              {(dict?.home?.multigames as any)?.viewAll || "Tutti i Multigames"}
                            </Button>
                          </Link>
                        </div>
                        <div className="relative w-full h-full min-h-[450px]">
                          <Image
                            src={multigame.image || "/placeholder.svg"}
                            alt={multigame.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>

                      <div className="md:hidden flex flex-col">
                        <div className="relative w-full aspect-[4/3] overflow-hidden">
                          <Image
                            src={multigame.image || "/placeholder.svg"}
                            alt={multigame.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col gap-2 text-white p-4 items-center text-center">
                          <p className="text-vitalYellow text-sm font-hitmarker-text-medium uppercase mb-2">
                            AWP MULTIGAME
                          </p>
                          <h2 className="text-2xl font-hitmarker-black uppercase text-center">
                            {multigame.title}
                          </h2>
                          <p className="text-sm font-hitmarker-text-regular text-center w-full mb-3">
                            {getDescription(multigame.slug)}
                          </p>
                          <Link href={`/${lang}/games?type=awp-multigames`} className="w-full">
                            <Button
                              variant="vitalYellow"
                              className="py-6 px-8 uppercase"                              
                            >
                              {(dict?.home?.multigames as any)?.viewAll || "Tutti i Multigame\s"}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>

        {/* Freccette di navigazione */}
        <div className="
        flex items-center justify-between 
        mt-8
        ">
          <Button
            size="icon"
            className="
            rounded-full border border-white
            bg-white/80 text-white
            hover:bg-white
            "
            onClick={handleScrollPrev}
          >
            <ChevronLeft className="h-5 w-5 text-black"/>
          </Button>

          {/* Indicatori */}
          <div className="flex gap-2">
            {multigames.map((_, index) => (
              <Button
                key={index}
                className={`w-3 h-[2px] p-0 justify-center items-center ${current === index ? "bg-vitalYellow h-[3px]" : "bg-white/25 h-[2px]"
                  }`}
                onClick={() => handleScrollTo(index)}
              />
            ))}
          </div>

          <Button
            size="icon" 
            className="
            rounded-full border border-white
            bg-white/80 text-white
            hover:bg-white
            "
            onClick={handleScrollNext}
          >
            <ChevronRight className="h-5 w-5 text-black"/>
          </Button>
        </div>
      </div>
    </div>
  )
}

