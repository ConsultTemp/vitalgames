'use client'
import Image from "next/image"
import { Card } from "@/components/ui/card"
import logo from "../../public/logovital.svg"
import iso from "../../public/isologo.svg"
import star from "../../public/star1.png"
import diamond from "../../public/diamante1.png"
import coin from "../../public/coin2.png"
import { useLanguage } from "@/components/language-provider"
import FloatingImage from "../bg-image-component"
import diamante from '../../public/diamond.png'

export default function WinningTechnology() {
  const { dictionary: dict } = useLanguage()

  const cards = [
    {
      id: 1,
      icon: iso,
      alt: "ISO Certification",
      description: dict.home.winningTechnology.cards.iso.description,
    },
    {
      id: 2,
      icon: star,
      alt: "Star Icon",
      description: dict.home.winningTechnology.cards.experience.description,
    },
    {
      id: 3,
      icon: diamond,
      alt: "Diamond Icon",
      description: dict.home.winningTechnology.cards.games.description,
    },
    {
      id: 4,
      icon: coin,
      alt: "Coin Icon",
      description: dict.home.winningTechnology.cards.partners.description,
    },
  ]

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center py-6 px-4 md:px-3 relative">

      <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none">
        {/* Bottom left large diamond */}
        <div className="absolute top-4   w-40 md:w-96 h-40 md:h-96 left-[-50px] md:left-[-150px] animate-float-slow rotate-10">
          <FloatingImage src={diamante || "/placeholder.svg"} alt="Diamond" className="w-[160px] md:w-[384px] h-[160px] md:h-[384px]" />
        </div>
      </div>
      <div className="max-w-6xl w-full flex flex-col items-center text-center z-2">
        {/* Logo */}
        <div className="w-32 h-32 md:w-40 md:h-40 relative mb-8">
          <Image src={logo || "/placeholder.svg"} alt="Vital Games Logo" fill className="object-contain" priority />
        </div>

        {/* Main Title */}
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white">{dict.home.winningTechnology.title}</h1>

        {/* First Text Block */}
        <p className="text-sm md:text-sm mb-5 font-extralight text-white max-w-2xl">
          {dict.home.winningTechnology.description}
        </p>

        {/* Second Text Block */}
        <p className="text-sm md:text-sm mb-6 font-extralight text-white max-w-2xl">
          {dict.home.winningTechnology.description2}
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-1.5 w-full">
          {cards.map((card) => (
            <div key={card.id} className="aspect-[5/3]">
              <Card className="h-full w-full flex flex-col items-center justify-center text-center p-4 bg-white/5 backdrop-blur-sm border-0 text-white">
                <div className="h-14 sm:h-16 mb-3">
                  <Image
                    src={card.icon || "/placeholder.svg"}
                    alt={card.alt}
                    width={60}
                    height={60}
                    className="object-contain h-full w-auto"
                  />
                </div>
                <p className="text-xs sm:text-xs">{card.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
