"use client"

import { useRef } from "react"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

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
  type: string
}

export function GameCarousel({ games, onGameClick, type }: GameCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { dictionary: dict } = useLanguage()

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = direction === "left" ? -280 : 280
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="relative" onClick={onGameClick}>
      <Link href="/awp-multigames" className="flex items-end justify-between mb-4">
        <h3 className="text-2xl font-semibold text-white">Multigames</h3>
        <div className="flex space-x-1 flex flex-row items-center gap-1 text-white whitespace-nowrap text-xs">
          <div className="text-sm font-medium text-white">{dict.allGames.recommended.viewAll} </div><ArrowRight className="w-4 h-4" />
        </div>
      </Link>

      {/* Carousel container with fade effect */}
      <div className="relative overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide snap-x"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {games.map((game) => (
            <div key={game.id} className="min-w-[250px] snap-start">
              <Link 
                href={`/${type}/${game.slug}`} 
                onClick={(e) => {
                  if (onGameClick) {
                    onGameClick();
                  }
                }}
              >
                <div className="bg-black rounded-lg overflow-hidden transition-colors aspect-[12/9]">
                  <div className="relative w-full h-full">
                    <Image 
                      src={game.image || "/placeholder.svg"} 
                      alt={game.title} 
                      fill
                      className="object-contain" 
                    />
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