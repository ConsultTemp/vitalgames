'use client'
import Image from "next/image"
import { OptimizedLink as Link } from "@/components/optimized-link"
import SmoothReveal from "../smooth-reveal"
import { Button } from "../ui/button"
import { useLanguage } from "@/components/language-provider"
import { onlineGames } from "@/lib/onlinegames"
import { Play } from "lucide-react"
import { useState } from "react"

// Prendi i primi 8 online games
const games = onlineGames.slice(0, 8)

export default function OnlineGamesCards() {
  const { dictionary: dict, lang } = useLanguage()
  const [clickedCard, setClickedCard] = useState<number | null>(null)

  const handleCardClick = (gameId: number) => {
    setClickedCard(clickedCard === gameId ? null : gameId)
  }

  return (
    <section className="relative overflow-visible absolute bg-transparent">
      <div className="container mx-auto px-4 relative z-10 pb-12 md:pb-16">
        <div className="flex flex-row items-center justify-between py-6">
          <div className="w-full flex flex-col items-start">
            <SmoothReveal>
              <h2 className="text-center text-5xl md:text-6xl font-bold text-white dharma whitespace-normal md:whitespace-nowrap">
                {dict.home.onlineGames.title}
              </h2>
            </SmoothReveal>
          </div>
          <Link href={`/${lang}/onlinegames`}>
            <Button 
              variant={"outline"} 
              className="border border-white rounded-full text-white bg-transparent px-4 py-2 hover:bg-vitalYellow hover:text-black hover:border-vitalYellow transition-all duration-300"
            >
              {dict.home.onlineGames.viewAll}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              className="transition-all duration-300 hover:scale-[1.02]"
            >
              <SmoothReveal>
                {/* Desktop: card con hover per mostrare overlay */}
                <div 
                  className="hidden md:block w-full aspect-[1080/1196] group rounded-sm relative transition-all duration-300 overflow-hidden"
                >
                  <div className="w-full h-full">
                    <Image
                      src={game.image || "/placeholder.svg"}
                      alt={game.title}
                      className="object-cover rounded-sm w-full h-full"
                    />
                  </div>
                  {/* Overlay nero trasparente su hover desktop */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
                    <a
                      href={game.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="vitalYellow"
                        className="px-6 py-3 text-lg !text-black dharma flex items-center gap-2"
                      >
                        <Play className="h-5 w-5" />
                        {(dict.home.onlineGames as any).playDemo || "Play demo"}
                      </Button>
                    </a>
                  </div>
                </div>

                {/* Mobile: card senza link, solo click per mostrare overlay */}
                <div 
                  className="md:hidden w-full aspect-[1080/1196] block rounded-sm relative transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => handleCardClick(game.id)}
                >
                  <div className="w-full h-full">
                    <Image
                      src={game.image || "/placeholder.svg"}
                      alt={game.title}
                      className="object-cover rounded-sm w-full h-full"
                    />
                  </div>
                  {/* Overlay nero trasparente su click mobile - con fade */}
                  <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
                    clickedCard === game.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}>
                    <a
                      href={game.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="vitalYellow"
                        className="px-6 py-3 text-lg !text-black dharma flex items-center gap-2"
                      >
                        <Play className="h-5 w-5" />
                        {(dict.home.onlineGames as any).playDemo || "Play demo"}
                      </Button>
                    </a>
                  </div>
                </div>
              </SmoothReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

