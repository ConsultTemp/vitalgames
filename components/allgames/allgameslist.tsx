import Image from "next/image"
import Link from "next/link"
import SmoothReveal from "../smooth-reveal"
import { games } from "../../lib/allgamesmap"

export default function AllGamesList() {
  // Sort games to put coming soon games first
  const sortedGames = [...games].sort((a, b) => {
    if (a.isComingSoon && !b.isComingSoon) return -1;
    if (!a.isComingSoon && b.isComingSoon) return 1;
    return 0;
  });

  return (
    <section className="py-t md:pt-16 relative overflow-hidden absolute bg-transparent">
      
      <div className="container mx-auto px-4 relative z-10 pb-12 md:pb-36">
        

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {sortedGames.map((game) => (
            <SmoothReveal key={game.name}>
              <Link key={game.name} href={`/allgames/${game.slug}`} className="w-full aspect-[1080/1196] block group rounded-lg overflow-hidden relative">
                <Image
                  src={game.mainImage}
                  alt={game.name}
                  className={`object-cover] rounded-lg transition-transform duration-300 group-hover:scale-105 w-full h-full ${game.isComingSoon ? 'opacity-20' : ''}`}
                />
                {game.isComingSoon && (
                  <>
                    <div className="absolute inset-0 border-2 border-red-500 rounded-lg" />
                    <div className="absolute w-full top-0 left-0 right-0 flex flex-col items-center text-center font-bold">
                      <p className="bg-red-500 text-white w-fit px-2 py-1 text-xs rounded-b-md">COMING SOON</p>
                    </div>
                  </>
                )}
              </Link>
            </SmoothReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
