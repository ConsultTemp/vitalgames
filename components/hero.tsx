"use client"
import { useState, useEffect, useRef } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { StaticImageData } from "next/image"


type Slide = {
  type: "video" | "image"
  src: string | StaticImageData
  alt?: string
}

const slides: Slide[] = [
  {
    type: "video",
    src: "https://files.catbox.moe/6d4v6k.mp4",
  },
]

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setIsLoaded(true)

    // Ensure video plays automatically and loops
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error)
      })
    }
  }, [])

  return (
    <section className="relative w-full h-screen">
      {/* Carousel container */}
      <div className="absolute inset-0">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full h-full"
        >
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-screen">
                  {slide.type === "video" ? (
                    <video
                      ref={index === 0 ? videoRef : null}
                      src={typeof slide.src === "string" ? slide.src : ""}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <Image
                      src={slide.src}
                      alt={slide.alt || ""}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>

      {/* Coming soon text - positioned at bottom left */}
      <div className="absolute bottom-8 left-8 z-20">
        <div className="inline-block text-vitalYellow text-sm font-medium rounded">
          Coming soon...
        </div>
      </div>
    </section>
  )
}
