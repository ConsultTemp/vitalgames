"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import { OptimizedLink as Link } from "@/components/optimized-link"
import { multigames } from "@/lib/multigames"
import { notFound } from "next/navigation"
import { useLanguage } from "@/components/language-provider"

export default function Multigame() {
  const params = useParams()
  const gameId = params.gameId as string
  const { dictionary: dict } = useLanguage()
  console.log(gameId)

  // Cerca il gioco corrispondente nel multigames object
  const game = multigames.find((m) => m.games.some((g) => g.slug === gameId))      

  // Se non trova il gioco, mostra 404
  if (!game) {
    return null
  }

  return (
    <section className="container mx-auto flex flex-col gap-8 bg-black text-white pb-24 px-4 py-16">
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-5/12 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 dharma">{dict.multigameDetail.partOf}</h2>
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={game.mainImage || "/placeholder.svg"}
              alt={game.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>

        <div className="w-full md:w-7/12 flex flex-col justify-center">
        <h4 className="text-4xl md:text-7xl font-bold mb-3 dharma">{game.title}</h4>
        {/* @ts-ignore */}
          <p className="text-sm mb-8 text-gray-300">{dict.home.multigames.descriptions?.[game.slug]}</p>
          <div>
            <Link
              href={`/awp-multigames/${game.slug}`}
              className="inline-block px-6 py-3 bg-transparent border border-white rounded-full text-white hover:bg-white hover:text-black transition-colors"
            >
              Scopri di più
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
