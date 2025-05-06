import Image from "next/image"
import Link from "next/link"
import SmoothReveal from "../smooth-reveal"
import { games } from "../../lib/allgamesmap"

interface RecommendedGamesProps {
  currentGame: typeof games[0]
}

export default function RecommendedGames({ currentGame }: RecommendedGamesProps) {
  // Get the featured games for the current game
  const featuredGames = currentGame.featured.map(slug => 
    games.find(game => game.slug === slug)
  ).filter((game): game is NonNullable<typeof game> => game !== undefined)

  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient and logo pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/50 to-transparent">
        <div className="absolute inset-0 bglogopattern"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 w-full flex flex-col items-center">
            <SmoothReveal className="inline-block bg-vitalYellow text-black text-xs font-medium px-2 py-[3.5px] rounded mb-2">
              Recommended Games
            </SmoothReveal>
            <SmoothReveal>
              <h2 className="text-center text-xl md:text-4xl font-bold text-white dharma whitespace-normal md:whitespace-nowrap px-4">
                GIOCHI CONSIGLIATI
              </h2>
            </SmoothReveal>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-0 sm:px-4 md:px-8 lg:px-16">
            {featuredGames.map((game) => (
              <SmoothReveal key={game.slug}>
                <Link href={`/allgames/${game.slug}`} className="w-full aspect-[1080/1196] block group rounded-lg overflow-hidden">
                  <Image
                    src={game.mainImage}
                    alt={game.name}
                    className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 w-full h-full"
                  />
                </Link>
              </SmoothReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 