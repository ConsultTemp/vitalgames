"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import cabiner1 from "../../public/SLOT_2022_Alta.png"
import cabiner2 from "../../public/SLOT_2022_Bassa.png"
import cabiner3 from "../../public/Octagon LQ.png"
import cabiner4 from "../../public/TRIOOCTAGON LQ.png"
import cherry from "../../public/cherry.png"
import FloatingImage from "../bg-image-component"
import SmoothReveal from "../smooth-reveal"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const carouselRef = useRef(null)
  const { dictionary, lang } = useLanguage()
  const { cabinet } = dictionary.home

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cabinets.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cabinets.length) % cabinets.length)
  }

  return (
    <section className="relative overflow-hidden flex flex-row justify-center mx-auto px-6 sm:px-12 md:px-16 lg:px-16 py-16 mt-0">
      {/* Background image centered */}
      <SmoothReveal className="absolute h-fit left-0 top-40 flex items-center justify-center z-0">
        <FloatingImage src={cherry} alt="Vital Logo" className="object-contain w-[200px] h-[200px]" />
      </SmoothReveal>

      <div className="container mx-auto relative z-10 rounded-lg m-4 md:m-8 lg:m-12 pt-0 mt-0">
        <div className="w-full flex flex-col justify-center md:flex-row items-center">
          {/* Left side - Text content */}
          <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-8">
            <div
              className={`transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              {/* Piccola scritta sopra il titolo */}
              <SmoothReveal>
                {" "}
                <p className="text-vitalYellow text-sm mb-2 font-medium">{cabinet.subtitle}</p>
              </SmoothReveal>

              <h2 className="text-8xl flex flex-col items-start font-bold text-white mb-6 dharma">
                <SmoothReveal>{cabinet.title}</SmoothReveal>
                <SmoothReveal>{cabinet.titleLine2}</SmoothReveal>
                <SmoothReveal>{cabinet.titleLine3}</SmoothReveal>
              </h2>

              <SmoothReveal>
                {" "}
                <p className="text-gray-300 text-sm mb-8 w-1/2">{cabinet.description}</p>
              </SmoothReveal>

              <SmoothReveal>
                {" "}
                <Button variant="outline" className="rounded-full hover:bg-opacity-80 text-white border-white font-medium px-6 py-2">
                  <Link href={`/${lang}/vlt`}>{cabinet.cta}</Link>
                </Button>
              </SmoothReveal>
            </div>
          </div>

          {/* Right side - Cabinet carousel con sfondo grigio scuro */}
          <SmoothReveal className="w-full h-full relative rounded-lg">
            {/* Carousel container con sfondo grigio scuro */}
            <div ref={carouselRef} className="relative flex flex-col items-center h-full w-full justify-center">
              <Image 
                src={cabinets[3].image || "/placeholder.svg"} 
                alt={cabinets[3].name} 
                className="h-full w-auto md:h-[350px] lg:h-[450px]" 
              />
            </div>
          </SmoothReveal>
        </div>
      </div>
    </section>
  )
}
