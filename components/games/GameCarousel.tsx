"use client"

import { useRef } from "react"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Game {
  id: number
  slug: string
  title: string
  description: string
  image: string | StaticImageData
}

interface GameCarouselProps {
  games: Game[]
  onGameClick?: () => void
}

export function GameCarousel({ games, onGameClick }: GameCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = direction === "left" ? -280 : 280
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-400">Featured Games</h3>
        <div className="flex space-x-1">
          <button
            onClick={() => scroll("left")}
            className="h-7 w-7 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-white"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="h-7 w-7 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-white"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Carousel container with fade effect */}
      <div className="relative overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide snap-x"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {games.map((game) => (
            <div key={game.id} className="min-w-[250px] snap-start">
              <Link href={`/allgames/${game.slug}`} onClick={onGameClick}>
                <div className="bg-black rounded-lg overflow-hidden border border-gray-700 hover:border-vitalYellow transition-colors">
                  <div className="relative aspect-video">
                    <Image src={game.image || "/placeholder.svg"} alt={game.title} fill className="object-cover" />
                  </div>
                  <div className="p-3">
                    <h3 className="text-white font-medium text-sm">{game.title}</h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        {/* Right fade effect overlay */}
        <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>

        {/* Improved right fade effect overlay */}
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-black via-black/10 to-transparent pointer-events-none"></div>
      </div>
    </div>
  )
}