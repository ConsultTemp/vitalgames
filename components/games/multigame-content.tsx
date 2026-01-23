import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { multigames as multigamesCards } from "@/lib/multigames"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import GameSection from "@/app/[lang]/awp-multigames/[gameId]/awp-hero"
import FloatingImage from "@/components/bg-image-component"
import cherry from "../../public/cherry.png"
import campana from "../../public/campana.png"
import diamante1 from "../../public/diamond.png"
import squalo from "../../public/squalo.png"
import bgmultigamopen from "../../public/bgmultigamopen.png"
import SmoothReveal from "../smooth-reveal"

interface MultigameContentProps {
  multigame: any
  lang: Locale
}

export default async function MultigameContent({ multigame, lang }: MultigameContentProps) {
  const dict = await getDictionary(lang)

  const translatedDescription = multigame.title + " by Vital games."

  return (
    <div className="bg-black">
      <header className="h-full">
        <GameSection
          imageUrl={multigame.mainImage}
          videoUrl={multigame.video && typeof multigame.video === 'string' && multigame.video.trim() !== '' ? multigame.video : undefined}
          videoId={multigame.videoId && multigame.videoId.trim() !== '' ? multigame.videoId : undefined}
          title={multigame.title}
          description={translatedDescription}
          fallbackImage={multigame.mainImage}
        />
      </header>

      <main className="px-4">
        {/* GAMES CARDS SECTION */}
        <section className="py-8 md:py-12 relative" aria-labelledby="games-heading">
          <div className="absolute inset-0 overflow-visible z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-[30%] left-[-32px] w-32 md:w-48 h-32 md:h-48 animate-float-slow rotate-12 opacity-80">
              <FloatingImage src={cherry || "/placeholder.svg"} alt="" className="w-full h-full" />
            </div>
            <div className="absolute top-[12%] right-[-40px] w-40 md:w-64 h-40 md:h-64 animate-float-slow rotate-12">
              <FloatingImage src={campana || "/placeholder.svg"} alt="" className="w-full h-full" />
            </div>
            <div className="absolute top-[45%] right-[-48px] w-32 md:w-48 lg:w-64 h-32 md:h-48 lg:h-64 animate-float-slow rotate-3 opacity-80">
              <FloatingImage src={diamante1 || "/placeholder.svg"} alt="" className="w-full h-full" />
            </div>
            <div className="absolute bottom-[20px] right-[-32px] w-40 md:w-56 lg:w-72 h-40 md:h-56 lg:h-72 animate-float-slow-reverse rotate-12 opacity-70">
              <FloatingImage src={squalo || "/placeholder.svg"} alt="" className="w-full h-full" />
            </div>
          </div>
          <div className="px-4 md:px-8 lg:px-16 xl:px-24 space-y-16 relative z-10">
            <h1 className="text-3xl font-hitmarker-text-bold uppercase text-white mt-10">
              {dict.includedGamesIn} {multigame.title}
            </h1>

            {multigame.games.map((game: any, index: number) => {
              // Neon color palette
              const neonColors = [
                "#39FF14", // verde neon
                "#FF00FF", // fucsia neon
                "#00FFFF", // blu elettrico (azzurro neon)
                "#FFFF00", // giallo neon
                "#FF073A"  // rosso neon
              ];
              const neon = neonColors[index % neonColors.length];
              return (
                <article
                  key={index}
                  className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} rounded-2xl items-center mb-8`}
                >
                  <div className="h-full md:w-2/5 lg:w-[55%] relative flex items-center justify-center">
                    {/* Ombra esterna */}
                    <span
                      className={`absolute top-1/2 -translate-y-1/2 pointer-events-none
                        ${index % 2 === 1
                          ? "right-[-100px] md:right-[-140px]"
                          : "left-[-100px] md:left-[-140px]"}
                        `}
                      aria-hidden="true"
                      style={{
                        width: "590px",
                        height: "540px",
                        overflow: "visible",
                        borderRadius: "50px",
                        zIndex: 20,
                        display: "block",
                        background: index % 2 === 1
                          ? `radial-gradient(circle at 100% 50%, ${neon}4D 0%, ${neon}1F 25%, ${neon}00 45%, ${neon}00 100%)`
                          : `radial-gradient(circle at 0% 50%, ${neon}4D 0%, ${neon}1F 25%, ${neon}00 45%, ${neon}00 100%)`
                      }}
                    />
                    <Image
                      src={game.mainImage || "/placeholder.svg"}
                      alt={`${game.name} - Slot machine inclusa nel sistema ${multigame.title}`}
                      className="h-full w-full object-cover rounded-lg relative z-30"
                      width={400}
                      height={400}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    />
                  </div>
                  <div className="text-left md:text-left p-3 px-0 md:p-6 w-full flex flex-col items-center">
                    <div className="w-[100%] md:w-[65%] rounded-xl  p-3 px-0 md:p-4 md:px-0 w-full flex flex-col justify-center items-start relative z-30">
                      <p className="text-sm font-hitmarker-text-bold text-vitalYellow uppercase mb-1">ALL GAMES</p>
                      <h2 className="text-5xl md:text-7xl text-white font-hitmarker-black uppercase tracking-[-0.5px] w-full text-left mb-2">{game.name}</h2>
                      <p className="text-white font-hitmarker-text-regular text-left w-full text-base md:mx-0 mb-2 text-white/60 uppercase">
                        {dict.allGamesDescriptions?.[game.slug]}
                      </p>
                      <Link href={`/${lang}/games/${game.slug}`} className="flex flex-col items-start">
                        <Button
                          variant="vitalYellow"
                          className="
                            bg-[#403c00] border border-vitalYellow
                            text-base text-white font-hitmarker-text-medium uppercase
                            px-6 py-6 mt-4 rounded-full 
                            hover:scale-105 transition-all duration-300"
                          aria-label={`Gioca ora a ${game.name}`}
                        >
                          {dict.common.buttons.playNow}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* RECOMMENDED GAMES */}
        <section className="pt-16 bg-black" aria-labelledby="recommended-games-heading">
          <div className="px-4 md:px-8 lg:px-16 xl:px-24">
            <h2
              id="recommended-games-heading"
              className="text-lg md:text-2xl uppercase text-white font-hitmarker-text-bold mb-8 text-left"
            >
              {dict.allGames.recommended.otherMultigames}
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              {Array.isArray(multigame.recommended) && multigame.recommended
                .slice(0, 3)
                .map((game: string, index: number) => {
                  const recommendedMultigame = multigamesCards.find((m) => m.slug === game)
                  return recommendedMultigame?.id ? (
                    <article key={index} className="flex-1 hover:scale-[1.02] transition-all duration-300">
                      <Link
                        href={`/${lang}/awp-multigames/${recommendedMultigame.slug}`}
                        aria-label={`Scopri ${recommendedMultigame.title} - Sistema multigame AWP`}
                      >
                        <div className="rounded-lg overflow-hidden">
                          <Image
                            src={recommendedMultigame.mainImage || "/placeholder.svg"}
                            alt={`${recommendedMultigame.title} - Sistema multigame AWP alternativo`}
                            className="w-full h-auto"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      </Link>
                    </article>
                  ) : null
                })}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}





