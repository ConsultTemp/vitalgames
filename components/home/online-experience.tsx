"use client"
import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"
import { useLanguage } from "../language-provider"
import bgmultigamopen from "@/public/bgmultigamopen.png"

export default function OnlineExperience() {
  const { lang } = useLanguage()

  return (
    <section className="relative w-full bg-black py-12 md:py-20 lg:py-24">
      <div className="container mx-auto">
        {/* Mobile: immagine sopra con overlay, testo leggermente sovrapposto */}
        <div className="relative lg:hidden w-full px-4 md:px-6">
          <div className="relative w-full">
            <Image
              src={bgmultigamopen}
              alt="Online Games"
              className="w-full h-auto object-cover rounded-lg"
              priority
            />
            {/* Overlay che sfuma al nero nella parte bassa */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black rounded-lg"></div>
          </div>
          {/* Testo leggermente sovrapposto - prima riga copre immagine, seconda è sotto */}
          <div className="relative -mt-12 md:-mt-16 flex flex-col items-center text-center space-y-6 px-4">
            <h2 className="text-white text-4xl md:text-5xl font-bold dharma uppercase">
              OUR EXPERIENCE APPLIED TO THE ONLINE WORLD
            </h2>
            <Link href={`/${lang}/games?type=online-games`}>
              <Button 
                variant="vitalYellow" 
                className="px-8 py-6 text-xl md:text-2xl !text-black dharma"
              >
                ONLINE GAME PORTFOLIO
              </Button>
            </Link>
          </div>
        </div>

        {/* Desktop: immagine sinistra, testo destra (allineato a destra) */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="w-full">
            <Image
              src={bgmultigamopen}
              alt="Online Games"
              className="w-full h-auto object-cover rounded-lg"
              priority
            />
          </div>
          <div className="flex flex-col items-end space-y-8">
            <h2 className="text-white text-5xl lg:text-6xl xl:text-7xl font-bold dharma uppercase text-right">
              OUR EXPERIENCE APPLIED TO THE ONLINE WORLD
            </h2>
            <Link href={`/${lang}/games?type=online-games`}>
              <Button 
                variant="vitalYellow" 
                className="px-8 py-6 text-4xl lg:text-5xl !text-black dharma h-16"
              >
                ONLINE GAME PORTFOLIO
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

