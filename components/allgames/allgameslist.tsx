import Image from "next/image"
import Link from "next/link"
import SmoothReveal from "../smooth-reveal"
import { games } from "../../lib/allgamesmap"
import FloatingImage from "../bg-image-component";
import campana from '../../public/campana.png'
export default function AllGamesList() {
  // Sort games to put coming soon games first
  const sortedGames = [...games].sort((a, b) => {
    if (a.isComingSoon && !b.isComingSoon) return -1;
    if (!a.isComingSoon && b.isComingSoon) return 1;
    return 0;
  });

  return (
    <section className="py-16 md:pt-16 relative overflow-visible absolute bg-transparent px-4 ">
      
      <div className="container mx-auto relative z-10 pb-12 md:pb-36 relative overflow-visible">
      <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none overflow-visible">
              {/* Bottom left large diamond */}
              <div className="absolute bottom-[-100px]  w-96 md:w-96 h-96 md:h-96 right-[-200px] animate-float-slow rotate-10">
                <FloatingImage src={campana || "/placeholder.svg"} alt="Diamond" className="w-[160px] md:w-[384px] h-[160px] md:h-[384px]" />
              </div>
            </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {sortedGames.map((game) => (
            <SmoothReveal key={game.name}>
              <Link key={game.name} href={`/allgames/${game.slug}`} className="w-full aspect-[1080/1196] block group rounded-lg overflow-hidden relative">
                <Image
                  src={game.mainImage}
                  alt={game.name}
                  className={`object-cover] rounded-lg transition-transform duration-300 group-hover:scale-105 w-full h-full`}
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
