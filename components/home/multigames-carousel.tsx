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

  // Funzione per resettare il timer
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

  // Auto-scroll ogni 5 secondi
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

  // Funzioni per gestire lo scroll manuale
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

  // Prendi le descrizioni dai dizionari e accorciale del 30%
  const getDescription = (slug: string) => {
    const descriptions = dict?.home?.multigames?.descriptions
    if (!descriptions) return ""

    // Mappa gli slug alle chiavi del dizionario
    const keyMap: Record<string, string> = {
      "manhattan": "manhattan",
      "fortune-gold": "fortune-ultralink", // usa fortune-ultralink per fortune-gold
      "champions": "champions",
      "diamante": "diamante"
    }

    const key = keyMap[slug] || slug
    const fullDescription = descriptions[key as keyof typeof descriptions] || ""

    // Accorcia del 30% (mantieni il 70%)
    const targetLength = Math.floor(fullDescription.length * 0.7)
    if (fullDescription.length <= targetLength) return fullDescription

    // Tronca alla parola più vicina per evitare di tagliare a metà una parola
    const truncated = fullDescription.substring(0, targetLength)
    const lastSpace = truncated.lastIndexOf(' ')
    return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...'
  }

  return (
    <div className="relative w-full bg-black py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative w-full">
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
                    <div className="w-full h-full bg-black border border-[#505050] rounded-lg overflow-hidden">
                      {/* Desktop: immagine sinistra, contenuto destra */}
                      <div className="hidden md:grid md:grid-cols-2 items-center">
                      <div className="relative w-full aspect-[4/3] overflow-hidden">
                        <Image
                          src={multigame.image || "/placeholder.svg"}
                          alt={multigame.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col space-y-6 text-white p-6 lg:p-8">
                        <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold dharma uppercase !m-0">
                          {multigame.title}
                        </h2>
                        <p className="text-sm lg:text-md opacity-90 !m-0 !mb-3 w-full">
                          {getDescription(multigame.slug)}
                        </p>
                        <Link href={`/${lang}/games?type=awp-multigames`} className="!m-0">
                          <Button
                            variant="vitalYellow"
                            className="px-8 py-6 text-base !text-black rounded-full w-fit"
                          >
                            {(dict?.home?.multigames as any)?.viewAll || "Tutti i Multigames"}
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Mobile: immagine sopra, contenuto sotto */}
                    <div className="md:hidden flex flex-col">
                      <div className="relative w-full aspect-[4/3] overflow-hidden">
                        <Image
                          src={multigame.image || "/placeholder.svg"}
                          alt={multigame.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col space-y-4 text-white p-4">
                        <h2 className="text-3xl font-bold dharma uppercase text-left">
                          {multigame.title}
                        </h2>
                        <p className="text-sm opacity-90 text-left w-full lg:w-3/4">
                          {getDescription(multigame.slug)}
                        </p>
                        <div className="flex justify-start">
                          <Link href={`/${lang}/games?type=awp-multigames`}>
                            <Button
                              variant="vitalYellow"
                              className="px-8 py-6 text-base !text-black !rounded-full !w-fit"
                            >
                              {(dict?.home?.multigames as any)?.viewAll || "Tutti i Multigames"}
                            </Button>
                          </Link>
                        </div>
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
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full hover:bg-black border-white text-white"
            onClick={handleScrollPrev}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Indicatori */}
          <div className="flex gap-2">
            {multigames.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className={`w-2 h-2 p-0 rounded-full ${current === index ? "bg-vitalYellow" : "bg-gray-300"
                  }`}
                onClick={() => handleScrollTo(index)}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full hover:bg-black border-white text-white"
            onClick={handleScrollNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

