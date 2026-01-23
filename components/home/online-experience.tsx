"use client"
import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"
import { useLanguage } from "../language-provider"
import { Card } from "../ui/card"
import diamonds from "@/public/diamanti-montagna.webp"
import bgMultigame from "@/public/light-rays.webp"
import game from "@/public/screen-gioco.webp"

export default function OnlineExperience() {
  const { lang, dictionary } = useLanguage()
  const { onlineExperience } = dictionary.home

  return (
    <section className="relative w-full bg-black py-16">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="group relative overflow-hidden border border-[#505050] hover:border-vitalYellow transition-all duration-500 bg-black rounded-2xl">
          {/* Sfondo bgMultigame di tutta la card - sempre visibile su mobile, visibile solo su hover su desktop */}
          <div className="absolute inset-0 opacity-50 lg:opacity-0 transition-opacity duration-500 lg:group-hover:opacity-25">
            <Image
              src={bgMultigame}
              alt="Background"
              className="w-full h-full object-cover object-center lg:object-left"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 1200px"
            />
          </div>
          
          {/* Mobile: tutto verticale con bgMultigame come sfondo */}
          <div className="relative lg:hidden w-full overflow-visible">
            {/* Contenuto mobile */}
            <div className="relative flex flex-col items-center text-center space-y-6 p-8 md:p-12 pb-0">
              {/* Testi in alto */}
              <div className="relative flex flex-col items-center space-y-6 mb-4">
                <h2 className="text-white text-4xl md:text-5xl font-hitmarker font-semibold">
                  {onlineExperience.title}
                </h2>
                {/* Bottone */}
                <Link href={`/${lang}/games?type=online-games`}>
                  <Button 
                    className="
                    bg-[#403c00] border border-vitalYellow 
                    hover:scale-105 transition-all duration-300 
                    px-8 text-white font-hitmarker-text-medium rounded-full h-12 text-base uppercase 
                    hover:bg-vitalYellow hover:text-black hover:animate-pulse"
                  >
                    {onlineExperience.button}
                  </Button>
                </Link>
              </div>
              {/* Game sotto i testi - sempre ingrandita su mobile */}
              <div className="relative w-full flex justify-center z-0">
                <div className="relative w-64 md:w-80 h-auto scale-125">
                  <Image
                    src={game}
                    alt="Game screen"
                    className="w-full h-auto object-contain"
                    loading="lazy"
                    sizes="(max-width: 768px) 256px, 320px"
                  />
                </div>
              </div>
            </div>
            {/* Diamonds in fondo - attaccata al bordo in basso, senza padding */}
            <div className="relative w-full -mt-12 z-10">
              <Image
                src={diamonds}
                alt="Diamonds"
                className="w-full h-auto object-contain"
                loading="lazy"
                sizes="100vw"
              />
            </div>
          </div>

          {/* Desktop: grid 2 colonne */}
          <div className="relative hidden lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch min-h-[600px]">
            {/* Colonna sinistra: game sopra e diamonds sotto - sovrapposte */}
            <div className="relative w-full overflow-visible">
              <div className="relative h-full flex flex-col justify-between">
                {/* Game sopra - più grande e leggermente sovrapposto */}
                <div className="relative flex justify-center items-start z-0 mt-8">
                  <div className="relative w-[600px] xl:w-[750px] h-auto p-12 transition-transform duration-500 group-hover:scale-110">
                    <Image
                      src={game}
                      alt="Game screen"
                      className="w-full h-auto object-contain"
                      loading="lazy"
                      sizes="(max-width: 1280px) 600px, 750px"
                    />
                    {/* Velo nero trasparente sopra game - scompare su hover, z-index tra game e diamonds */}
                    <div className="absolute inset-0 bg-black/60 transition-opacity duration-500 group-hover:opacity-0 z-[5] rounded-lg"></div>
                  </div>
                </div>
                {/* Diamonds sotto - attaccata allo schermo, z-index maggiore per essere sopra */}
                <div className="relative w-full -mt-40 z-10">
                  <Image
                    src={diamonds}
                    alt="Diamonds"
                    className="w-full h-auto object-contain"
                    loading="lazy"
                    sizes="100vw"
                  />
                </div>
              </div>
            </div>
            {/* Colonna destra: testo e bottone (invariato) */}
            <div className="flex flex-col items-end justify-center space-y-8 p-8">
              <h2 className="text-white text-5xl md:text-7xl font-hitmarker font-semibold text-right">
                {onlineExperience.titlePart1}
                <span className="text-vitalYellow">{onlineExperience.titlePart2}</span>
                {onlineExperience.titlePart3}
              </h2>
              <Link href={`/${lang}/games?type=online-games`}>
                <Button 
                  className="bg-[#403c00] border border-vitalYellow hover:scale-105 transition-all duration-300 px-8 text-white font-hitmarker-text-medium rounded-full h-12 text-base hover:bg-vitalYellow hover:text-black"
                >
                  {onlineExperience.button.toUpperCase()}
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

