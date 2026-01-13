"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { multigames } from "@/lib/multigames"
import { notFound } from "next/navigation"
import { useLanguage } from "@/components/language-provider"

export default function Multigame() {
  const params = useParams()
  const gameId = params.gameId as string
  const { dictionary: dict, lang } = useLanguage()
  console.log(gameId)

  // Cerca il gioco corrispondente nel multigames object
  const game = multigames.find((m) => m?.games && m.games.some((g) => g.slug === gameId))      

  // Se non trova il gioco, mostra 404
  if (!game) {
    return null
  }

  return (
    <section className="container mx-auto flex flex-col gap-8 bg-black text-white pb-24 px-4 py-16">
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-5/12 flex flex-col justify-center">
          <h2 className="text-lg md:text-2xl uppercase text-white font-hitmarker-text-bold mb-8">{dict.multigameDetail.partOf}</h2>
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
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
        <p className="text-base uppercase text-vitalYellow font-hitmarker-text-bold">MULTIGAME</p>
        <h4 className="text-5xl md:text-7xl font-bold mb-3 font-hitmarker-black uppercase tracking-[-0.5px]">{game.title}</h4>
        {/* @ts-ignore */}
          <p className="text-sm font-hitmarker-text-regular mb-8 text-white/60 uppercase">{dict.home.multigames.descriptions?.[game.slug]}</p>
          <div>
            <Link href={`/${lang}/awp-multigames/${game.slug}`}>
              <Button variant="vitalYellow" className="px-8 py-6 uppercase">
                Scopri di più
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
