"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import cabiner1 from "../../public/SLOT_2022_Alta.png"
import cabiner2 from "../../public/SLOT_2022_Bassa.png"
import cabiner3 from "../../public/Octagon LQ.png"
import cabiner4 from "../../public/vlts/TRIOOCTAGON LQ.png"
import cherry from "../../public/cherry.png"
import overlayGif from "../../public/gifmrdiamond.gif"
import FloatingImage from "../bg-image-component"
import SmoothReveal from "../smooth-reveal"
import { OptimizedLink as Link } from "@/components/optimized-link"
import { useLanguage } from "@/components/language-provider"
import OptimizedVideo from "../OptimizedVideo"

const cabinets = [
  {
    id: 1,
    name: "Diamond VLT",
    image: cabiner1,
  },
  {
    id: 2,
    name: "Royal VLT",
    image: cabiner2,
  },
  {
    id: 3,
    name: "Premium VLT",
    image: cabiner3,
  },
  {
    id: 4,
    name: "Premium VLT",
    image: cabiner4,
  },
]

export default function CabinetSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSafari, setIsSafari] = useState(false)
  const { dictionary, lang } = useLanguage()
  const { cabinet } = dictionary.home

  // Funzione per rilevare Safari
  const detectSafari = () => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent.toLowerCase()
      const vendor = window.navigator.vendor.toLowerCase()

      // Safari ha 'safari' nell'user agent E 'apple computer' nel vendor
      // E NON ha 'chrome' nell'user agent (per escludere Chrome)
      const isSafariBrowser =
        userAgent.includes('safari') &&
        vendor.includes('apple') &&
        !userAgent.includes('chrome') &&
        !userAgent.includes('chromium')

      return isSafariBrowser
    }
    return false
  }

  useEffect(() => {
    setIsLoaded(true)
    const safariDetected = detectSafari()
    setIsSafari(safariDetected)

    // Debug log per verificare il rilevamento
    console.log('Browser detection:', {
      userAgent: window.navigator.userAgent,
      vendor: window.navigator.vendor,
      isSafari: safariDetected
    })
  }, [])

  // Componente per il contenuto overlay (video o immagine)
  const OverlayContent = ({ className }: { className: string }) => {
    if (isSafari) {
      return null
    }

    return (
      <div className="w-full h-full relative">
        <Image
          src={overlayGif}
          alt="Overlay animation"
          className={className}
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
    )
  }

  // Componente per il contenuto overlay desktop
  const OverlayContentDesktop = ({ className }: { className: string }) => {
    if (isSafari) {
      return null
    }

    return (
      <Image
        src={overlayGif}
        alt="Overlay animation"
        className={className}
        fill
        style={{ objectFit: 'contain' }}
      />
    )
  }

  return (
    <section className="relative overflow-visible flex flex-row justify-center mx-auto px-6 sm:px-12 md:px-16 lg:px-16 py-16 mt-0">
      {/* Background image centered */}
      <SmoothReveal className="absolute h-fit left-0 top-40 flex items-center justify-center z-0">
        <FloatingImage src={cherry} alt="Vital Logo" className="object-contain w-[200px] h-[200px]" />
      </SmoothReveal>

      <div className="container mx-auto relative z-10 rounded-lg m-4 md:m-8 lg:m-12 pt-0 mt-0">
        {/* Mobile Layout */}
        <div className="flex flex-col items-center md:hidden">
          <div className="w-full text-center mb-6">
            <h2 className="text-8xl sm:text-6xl font-bold text-white dharma leading-tight invisible h-0 md:h-fit md:visible">
              <SmoothReveal>{cabinet.title} {cabinet.titleLine2}</SmoothReveal>
              <SmoothReveal>{cabinet.titleLine3}</SmoothReveal>
            </h2>

            <h2 className="text-5xl sm:text-6xl font-bold text-white dharma leading-tight visible md:invisible">
              {cabinet.mobileTitle}
            </h2>
          </div>

          <div className="w-full mb-12 bg-black/20 backdrop-blur-sm rounded-md relative">
            <Carousel
              className="w-full flex items-center justify-center rounded-lg p-4"
              opts={{
                loop: true
              }}
            >
              <CarouselContent className="flex items-center">
                {cabinets.map((cabinet) => (
                  <CarouselItem key={cabinet.id} className="flex items-center justify-center">
                    <Image
                      src={cabinet.image}
                      alt={cabinet.name}
                      className="w-full h-auto max-h-[400px] object-contain mx-auto"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
            <div className="absolute bottom-[-160px] right-[-140px] md:right-[-200px] w-[350px] h-[350px] z-20">
              <OverlayContent className="w-full h-full object-contain" />
            </div>
          </div>

          <Button variant="outline" className="rounded-full hover:bg-opacity-80 text-white border-white font-medium px-3 py-1 text-base cursor-pointer">
            <Link href={`/vlt`}>{cabinet.cta}</Link>
          </Button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex w-full flex-row items-center">
          {/* Left side - Text content */}
          <div className="w-1/2 pr-8">
            <div className={`transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <h2 className="text-5xl lg:text-8xl flex flex-col items-start font-bold text-white mb-6 dharma invisible md:visible">
                <SmoothReveal>{cabinet.title}</SmoothReveal>
                <SmoothReveal>{cabinet.titleLine2}</SmoothReveal>
                <SmoothReveal>{cabinet.titleLine3}</SmoothReveal>
              </h2>

              <Link
                href="/vlt"
                className="rounded-full hover:bg-opacity-80 text-white border-white font-medium px-3 py-1 text-base cursor-pointer border inline-block text-center"
              >
                {cabinet.cta}
              </Link>

            </div>
          </div>

          {/* Right side - Cabinet carousel */}
          <div className="w-5/12 h-full relative rounded-lg bg-black/20 backdrop-blur-md">
            <Carousel
              className="w-full flex items-center justify-center rounded-lg p-4"
              opts={{
                loop: true
              }}
            >
              <CarouselContent className="flex items-center">
                {cabinets.map((cabinet) => (
                  <CarouselItem key={cabinet.id} className="flex items-center justify-center">
                    <Image
                      src={cabinet.image}
                      alt={cabinet.name}
                      className="w-full h-auto max-h-[600px] object-contain"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
            <div className="absolute bottom-[-100px] right-[-120px] md:right-[-200px] w-[300px] h-[300px] z-20">
              <OverlayContentDesktop className="w-full h-full object-contain bg-red" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}