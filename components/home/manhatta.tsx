'use client'
import Image from "next/image"
import type { StaticImageData } from "next/image"
import { useLanguage } from "@/components/language-provider"

// Importazione diretta delle immagini
import sharkImage from "@/public/allgames/SHARK.jpg"
import midnightSaloonImage from "@/public/allgames/MIDNIGHT SALOON.jpg"
import misterDiamondImage from "@/public/allgames/MAGIC DIAMOND 2.jpg"
import cherryImage from "@/public/allgames/CHERRY.jpg"
import leChefImage from "@/public/allgames/LE CHEF.jpg"
import logo from "../../public/logovitalwhite2.svg"
import squaloblu from "../../public/SqualoBlu3.png"

// Definizione dell'interfaccia Game
interface Game {
  slug: string
  image: StaticImageData
  title: string
}

// Definizione dell'array di giochi
const games: Game[] = [
  {
    slug: "shark",
    image: sharkImage,
    title: "Shark",
  },
  {
    slug: "midnight-saloon",
    image: midnightSaloonImage,
    title: "Midnight Saloon",
  },
  {
    slug: "mister-diamond",
    image: misterDiamondImage,
    title: "Mister Diamond",
  },
  {
    slug: "cherry",
    image: cherryImage,
    title: "Cherry",
  },
  {
    slug: "le-chef",
    image: leChefImage,
    title: "Le Chef",
  },
]

// Componente GameCard definito nello stesso file
function GameCard({ game }: { game: Game }) {
  return (
    <div className="aspect-square bg-gray-800/50 rounded-lg overflow-hidden transition-transform hover:scale-105">
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={game.image || "/placeholder.svg"}
          alt={game.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 20vw"
        />
      </div>
    </div>
  )
}

export default function ManhattanLanding() {
  const { dictionary: dict, isLoading } = useLanguage()

  if (isLoading || !dict?.home?.manhattan) {
    return null;
  }

  return (
    <div className="min-h-screen bg-transparent text-white p-4 md:p-8 lg:p-12  relative overflow-hidden mt-[-100px]">
      {/* Gradient overlay */}
      <div className="absolute left-0 right-0 top-[25%] h-[50vh] bg-gradient-to-b from-transparent via-[#007bff]/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-4 relative z-10 mt-4">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="max-w-2xl flex flex-col gap-8 pb-4">
            <h1 className="text-7xl md:text-6xl lg:text-7xl font-extrabold tracking-tight dharma">
              <span className="text-white">{dict.home.manhattan.title}</span>{" "}
              <span className="">
                {" "}<br className="visible md:hidden"/>
                <span className="text-vitalYellow dharma-italic">{dict.home.manhattan.comingSoon}</span>
              </span>
            </h1>
            <p className="text-sm">{dict.home.manhattan.description}</p>
            <Image src={logo || "/placeholder.svg"} alt="Vital Games Logo" width={60} height={30} />
            <p className="text-sm text-gray-400">{dict.home.manhattan.ageRestriction}</p>
          </div>

          <div className="flex justify-center">
            <Image
              src={squaloblu || "/placeholder.svg"}
              alt="Shark Character"
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
        </div>

        {/* Game Thumbnails */}
        <div className="mt-12 md:mt-16 lg:mt-20">
          <h2 className="text-4xl text-white dharmalight font-bold mb-6">{dict.home.manhattan.partOfManhattan}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {games.map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
