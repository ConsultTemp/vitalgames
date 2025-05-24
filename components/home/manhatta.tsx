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
      <div className="relative w-full h-full">
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
    <div className="min-h-screen bg-black text-white p-4 md:p-8 lg:p-12  relative overflow-hidden my-16">
      {/* Gradient overlay */}
      <div className="absolute left-0 right-0 top-[25%] h-[50vh] bg-gradient-to-b from-transparent via-[#007bff]/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10 mt-4">
        {/* Header Section */}
        <div className="">
          <h1 className="text-7xl md:text-6xl lg:text-7xl font-extrabold tracking-tight dharma">
            <span className="text-white">{dict.home.manhattan.title}</span>{" "}
            <span className="italic dharmalight">
              {" "}
              <span className="text-vitalYellow">{dict.home.manhattan.comingSoon}</span>
            </span>
          </h1>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center" style={{ marginTop: "0px" }}>
          <div className="max-w-2xl">
            <p className="text-sm">{dict.home.manhattan.description}</p>

            <div className="">
              <Image src={logo || "/placeholder.svg"} alt="Vital Games Logo" width={100} height={40} className="my-4" />
              <p className="text-sm text-gray-400">{dict.home.manhattan.ageRestriction}</p>
            </div>
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
          {/* Desktop layout */}
          <div className="hidden md:grid md:grid-cols-5 gap-4">
            {games.map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>

          {/* Custom mobile layout: 2-1-2 */}
          <div className="grid gap-4 md:hidden">
            {/* First row - 2 cards */}
            <div className="grid grid-cols-2 gap-4">
              <GameCard game={games[0]} />
              <GameCard game={games[1]} />
            </div>

            {/* Second row - 1 centered card */}
            <div className="flex justify-center">
              <div className="w-full max-w-[calc(50%-0.5rem)]">
                <GameCard game={games[2]} />
              </div>
            </div>

            {/* Third row - 2 cards */}
            <div className="grid grid-cols-2 gap-4">
              <GameCard game={games[3]} />
              <GameCard game={games[4]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
