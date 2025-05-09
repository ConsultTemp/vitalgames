'use client'
import Image from "next/image"
import Link from "next/link"
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
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { dictionary: dict } = useLanguage()

  return (
    <section className="py-t md:pt-16 relative overflow-visible absolute bg-transparent">
      <div className="absolute top-[-30px] right-0 md:right-10 z-[1] max-w-[200px] md:max-w-none opacity-80">
        <FloatingImage
          src={campana}
          alt="Campana"
          className="w-48 sm:w-48 md:w-72 h-48 sm:h-48 md:h-72"
        />
      </div>
      <div className="absolute bottom-[50px] left-[-20px] z-[1]">
        <FloatingImage
          src={squalo}
          alt="Squalo"
          className="w-64 md:w-72 h-32 sm:h-48 md:h-72 overflow-visible"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10 pb-12 md:pb-36">
        <div className="mb-6 md:mb-8 w-full flex flex-col items-center">
          <SmoothReveal className="inline-block bg-vitalYellow text-black text-xs font-medium px-2 py-[3.5px] rounded mb-2">
            {dict.home.gameCards.badge}
          </SmoothReveal>
          <SmoothReveal> <h2 className="text-center text-4xl md:text-7xl font-bold text-white dharma whitespace-normal md:whitespace-nowrap px-4">{dict.home.gameCards.title}</h2></SmoothReveal>
        </div>

        <div 
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          onMouseLeave={() => setHoveredCard(null)}
        >
          {games.map((game) => (
            <div 
              key={game.id}
              className={`transition hover:scale-[1.02] duration-300 ${hoveredCard !== null && hoveredCard !== game.id ? 'opacity-50' : 'opacity-100'}`}
              onMouseEnter={() => setHoveredCard(game.id)}
            >
              <SmoothReveal>
                <Link 
                  href={`/allgames/${game.slug}`} 
                  className="w-full aspect-[1080/1196] block group rounded-sm relative x"
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
        <div className="w-full flex flex-col items-center py-16">
          <Button variant={"vitalYellow"} className="bg-vitalYellow px-8 text-sm text-black">
            <Link href="/allgames">{dict.home.gameCards.viewAll}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
