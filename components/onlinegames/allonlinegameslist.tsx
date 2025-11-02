import Image from "next/image"
import SmoothReveal from "../smooth-reveal"
import { onlineGames } from "../../lib/onlinegames"
import FloatingImage from "../bg-image-component";
import campana from '../../public/campana.png'

export default function AllOnlineGamesList() {
  return (
    <section className="py-16 md:pt-16 relative overflow-visible absolute bg-transparent px-4 ">

      <div className="container mx-auto relative z-10 pb-12 md:pb-36 relative overflow-visible">
        <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none overflow-visible">
          {/* Bottom left large diamond */}
          <div className="absolute bottom-[-100px]  w-96 md:w-96 h-96 md:h-96 right-[-200px] animate-float-slow rotate-10">
            <FloatingImage src={campana || "/placeholder.svg"} alt="Diamond" className="w-[160px] md:w-[384px] h-[160px] md:h-[384px]" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3">
          {onlineGames.map((game) => (
            <SmoothReveal key={game.title}>
              <div className="bg-[#161c22] rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-102 group">
                {/* Game Image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={game.image}
                    alt={game.title}
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                
                {/* Card Content */}
                <div className="p-3 text-center">
                  {/* Game Title */}
                  <h3 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide dharma mb-0 line-clamp-2 whitespace-nowrap flex items-center justify-center">
                    {game.title}
                  </h3>
                  
                  {/* Game Description */}
                  <p className="text-white text-lg font-medium mb-5">
                    {game.description}
                  </p>
                  
                  {/* Play Demo Button */}
                  <a
                    href={game.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full bg-vitalYellow hover:opacity-80 text-black font-bold py-2 px-6 rounded-md transition-colors duration-300 text-lg whitespace-nowrap"
                  >
                    Play demo
                  </a>
                </div>
              </div>
            </SmoothReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
