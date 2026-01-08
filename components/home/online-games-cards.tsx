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
      <div className="container mx-auto px-6 py-12 relative z-10 pb-12 md:pb-16">
        <div className="flex flex-row items-center justify-between py-6">
          <div className="w-full flex flex-col items-start">
            <SmoothReveal>
              <h2 className="text-center text-3xl font-hitmarker-black uppercase text-white whitespace-normal md:whitespace-nowrap mb-6">
                {dict.home.onlineGames.title}
              </h2>
            </SmoothReveal>
          </div>
          <Link href={`/${lang}/games?type=online-games`}>
            <Button 
              variant={"outline"} 
              className="border border-[#505050] rounded-full mb-6 text-white font-hitmarker-text-medium text-base h-9 bg-transparent px-4 py-2 hover:bg-white/10 transition-all duration-300"
            >
              {dict.home.onlineGames.viewAll}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {games.map((game) => (
            <div
              key={game.id}
              className="transition-all duration-300 hover:scale-[1.02]"
            >
              <SmoothReveal>
                {/* Desktop: card con hover per mostrare overlay */}
                <div 
                  className="hidden md:block w-full aspect-[1080/1196] group rounded-2xl border border-[#505050] relative transition-all duration-300 overflow-hidden"
                >
                  <div className="w-full h-full">
                    <Image
                      src={game.image || "/placeholder.svg"}
                      alt={game.title}
                      className="object-cover rounded-sm w-full h-full"
                    />
                  </div>
                  {/* Tendina animata che sale da sotto su hover desktop */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-lg transform rounded-t-3xl translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none group-hover:pointer-events-auto">
                    <div className="p-4 flex flex-col justify-end gap-3">
                      <h3 className="uppercase text-white font-hitmarker-black text-2xl w-full text-center">
                        {game.title}
                      </h3>
                      <a
                        href={game.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        <Button
                          className="w-full bg-vitalYellow hover:scale-105 transition-all duration-300 text-black font-hitmarker-text-medium rounded-full h-12 text-base uppercase"
                        >
                          <Play className="h-5 w-5" />
                          {(dict.home.onlineGames as any).playDemo || "Play demo"}
                        </Button>
                      </a>
                    </div>
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
                        className="px-6 py-3 text-base !text-black rounded-full flex items-center gap-2"
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

