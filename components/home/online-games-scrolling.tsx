'use client'
import Image from "next/image"
import { onlineGames } from "@/lib/onlinegames"
import { OptimizedLink as Link } from "@/components/optimized-link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export default function OnlineGamesScrolling() {
  const { dictionary: dict, lang } = useLanguage()
  
  
  // Duplica i giochi per creare un loop infinito senza interruzioni
  // Creiamo 2 copie per permettere il loop infinito (l'animazione va da 0 a -50%)
  const duplicatedGames = [...onlineGames, ...onlineGames]
  // Per la seconda riga invertiamo l'ordine per creare movimento opposto
  const reversedGames = [...onlineGames].reverse()
  const duplicatedReversedGames = [...reversedGames, ...reversedGames]

  return (
    <section className="relative w-full py-10 md:py-15 overflow-hidden bg-black mb-12 md:mb-16">
      {/* Container con overflow hidden e gradienti ai bordi */}
      <div className="relative w-full overflow-hidden">
        {/* Gradiente sinistro - visibile ma non troppo marcato */}
        <div 
          className="absolute left-0 top-0 h-full w-32 md:w-56 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)'
          }}
        />
        
        {/* Gradiente destro - visibile ma non troppo marcato */}
        <div 
          className="absolute right-0 top-0 h-full w-32 md:w-56 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)'
          }}
        />
        
        {/* Gradiente inferiore - più accentuato verticalmente */}
        <div 
          className="absolute left-0 bottom-0 w-full h-32 md:h-48 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 10%, rgba(0,0,0,0.85) 60%, transparent 100%)'
          }}
        />
        
        {/* Overlay aggiuntivo per effetto vignette leggero */}
        <div 
          className="absolute inset-0 z-9 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 20%, transparent 60%, rgba(0,0,0,0.25) 100%)'
          }}
        />

        {/* Prima riga - scorre da sinistra a destra */}
        <div className="mb-3 md:mb-4 relative">
          <div className="flex animate-infinite-scroll-slow">
            {duplicatedGames.map((game, index) => (
              <div
                key={`row1-${game.id}-${index}`}
                className="flex-shrink-0 mx-1 md:mx-2 w-[200px] h-[200px] md:w-[280px] md:h-[280px]"
              >
                <div className="w-full h-full rounded-md overflow-hidden border border-white/50">
                  <Image
                    src={game.image || "/placeholder.svg"}
                    alt={game.title}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seconda riga - scorre da destra a sinistra (direzione opposta) */}
        <div className="relative">
          <div className="flex animate-infinite-scroll-slow-reverse">
            {duplicatedReversedGames.map((game, index) => (
              <div
                key={`row2-${game.id}-${index}`}
                className="flex-shrink-0 mx-1 md:mx-2 w-[200px] h-[200px] md:w-[280px] md:h-[280px]"
              >
                <div className="w-full h-full rounded-md overflow-hidden border border-white/50">
                  <Image
                    src={game.image || "/placeholder.svg"}
                    alt={game.title}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Titolo, paragrafo e bottone - in basso a sinistra, responsive */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="
          text-white text-3xl md:text-7xl text-center md:text-left
          font-hitmarker-black tracking-[-0.5px] uppercase 
          mb-1">
            {dict.home?.onlineGames?.title || "Game Library"}
          </h2>
          <p className="text-white font-hitmarker-text-regular text-xs md:text-lg mb-3 md:mb-4 max-w-md text-center md:text-left leading-thight uppercase">
            {dict.home?.onlineGames?.description || "All online games titles, from upcoming releases to classic favorites."}
          </p>
          <Link href={`/${lang}/games?type=online-games`}>
            <Button 
              variant={"vitalYellow"} 
              className="
              bg-[#403c00] border border-vitalYellow w-full md:w-auto
              text-white font-hitmarker-text-medium rounded-full h-12 text-base uppercase 
              px-8
              hover:scale-105 transition-all duration-300 
              hover:bg-vitalYellow hover:text-black"
            >
              {dict.home?.onlineGames?.viewAll || "View all"}
  </Button>
</Link>
</div>
</div>
</section>
)
}
