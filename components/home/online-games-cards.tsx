'use client'
import Image from "next/image"
import { OptimizedLink as Link } from "@/components/optimized-link"
import SmoothReveal from "../smooth-reveal"
import { Button } from "../ui/button"
import { useLanguage } from "@/components/language-provider"
import { onlineGames } from "@/lib/onlinegames"
import { PlayIcon } from "lucide-react"
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
    <section className="relative overflow-visible absolute bg-gradient-to-b from-[#101010] to-black">
      <div className="container mx-auto px-6 py-12 relative z-10 pb-12 md:pb-16">
        <div className="flex flex-row items-center justify-between py-6">
          <div className="w-full flex flex-col items-start">
            <SmoothReveal>
              <h2 className="text-center text-6xl font-hitmarker-black uppercase text-white whitespace-normal md:whitespace-nowrap mb-2">
                {dict.home.onlineGames.title}
              </h2>
            </SmoothReveal>
          </div>
          <Link href={`/${lang}/games?type=online-games`}>
            <Button 
              variant={"outline"} 
              className="border border-[#505050] rounded-full mb-2 text-white font-hitmarker-text-medium text-base h-9 bg-transparent px-4 py-2 hover:bg-white/10 transition-all duration-300"
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
                  <div className="absolute bottom-0 left-0 right-0 bg-black/90 rounded-t-3xl pointer-events-none group-hover:pointer-events-auto transform-gpu translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}>
                    <div className="p-4 flex flex-col justify-end gap-3">
                      <h3 className="uppercase text-vitalYellow font-hitmarker-text-bold tracking-[-1px] text-2xl w-full text-center">
                        {game.title}
                      </h3>
                      <a
                        href={game.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        <Button
                          variant="vitalYellow"
                          className="w-full py-6 px-8 uppercase gap-1"
                        >
                          <PlayIcon className="h-5 w-5" fill="currentColor" />
                          {(dict.home.onlineGames as any).playDemo || "Play demo"}
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Mobile: card senza link, solo click per mostrare overlay */}
                <div 
                  className="md:hidden w-full aspect-[1080/1196] block rounded-xl relative transition-all duration-300 overflow-hidden cursor-pointer"
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
                  <div className={`absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center gap-4 transition-opacity duration-300 ${
                    clickedCard === game.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}>
                    <h3 className="uppercase text-vitalYellow font-hitmarker-text-bold tracking-[-1px] text-2xl text-center px-4">
                      {game.title}
                    </h3>
                    <a
                      href={game.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="vitalYellow"
                        className="px-6 py-3 uppercase gap-1"
                      >
                        <PlayIcon className="h-5 w-5" fill="currentColor" />
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

