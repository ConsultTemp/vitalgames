'use client'
import Image from "next/image"
import { OptimizedLink as Link } from "@/components/optimized-link"
import { Play } from "lucide-react"
import struzzo from "../../public/struzzo.jpg"
import pepitadoro from "../../public/pepitadoro.jpg"
import lucky8 from "../../public/lucky8.jpg"
import piggy1 from "../../public/piggy1.jpg"
import mexican from "../../public/mexican.jpg"
import reggae from "../../public/allgames/REGGAE FROG.jpg"
import elfi from "../../public/elfi.jpg"
import bookofmagic from "../../public/bookofmagic.jpg"
import cowboyrevange from "../../public/cowboyrevange.jpg"
import squalo from "../../public/squalo.png"
import campana from "../../public/campana.png"
import FloatingImage from "../bg-image-component"
import SmoothReveal from "../smooth-reveal"
import { useState } from "react"
import { Button } from "../ui/button"
import { useLanguage } from "@/components/language-provider"


const games = [
  {
    id: 1,
    slug: "lo-struzzo",
    title: "Lo struzzo",
    image: struzzo,
  },
  {
    id: 9,
    slug: "reggae-frog",
    title: "Reggae Frog",
    image: reggae,
  },
  {
    id: 2,
    slug: "mexican",
    title: "Mexican",
    image: mexican,
  },
  {
    id: 3,
    slug: "book-of-magic",
    title: "Book of magic",
    image: bookofmagic,
  },
  {
    id: 4,
    slug: "elfi",
    title: "Elfi",
    image: elfi,
  },
  {
    id: 5,
    slug: "lucky-8",
    title: "Lucky8",
    image: lucky8,
  },
  {
    id: 7,
    slug: "pepita-doro",
    title: "Pepita d'oro",
    image: pepitadoro,
  },
  {
    id: 8,
    slug: "piggy-gold",
    title: "Piggy gold",
    image: piggy1,
  }

]

export default function GameCards() {
  const { dictionary: dict } = useLanguage()

  return (
    <section className="pb-16  relative overflow-visible absolute bg-transparent">
      <div className="absolute top-[-150px] right-0 md:right-10 z-[1] max-w-[160px] md:max-w-none opacity-80">
        <FloatingImage
          src={campana}
          alt="Campana"
          className="w-48 sm:w-48 md:w-72 h-48 sm:h-48 md:h-72"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10 pb-12 md:pb-36">
        <div className="flex flex-row items-center justify-between py-6">
          <div className=" w-full flex flex-col items-start">
            <SmoothReveal> <h2 className="text-center text-5xl md:text-6xl font-bold text-white dharma whitespace-normal md:whitespace-nowrap">{dict.home.gameCards.title}</h2></SmoothReveal>
          </div>
          <Link href={"/allgames"}><Button variant={"outline"} className="border border-white rounded-full text-white bg-transparent px-4 py-2 hover:bg-vitalYellow hover:text-black hover:border-vitalYellow transition-all duration-300">Vedi tutto</Button></Link>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {games.map((game) => (
            <div
              key={game.id}
              className="transition-all duration-300 hover:scale-[1.02]"
            >
              <SmoothReveal>
                <Link
                  href={`/allgames/${game.slug}`}
                  className={`w-full aspect-[1080/1196] block group rounded-sm relative transition-all duration-300 `}
                >
                  <div className="w-full h-full">
                    <Image
                      src={game.image || "/placeholder.svg"}
                      alt={game.title}
                      className="object-cover rounded-sm w-full h-full"
                    />
                  </div>
                </Link>
              </SmoothReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
