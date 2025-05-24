'use client'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { multigames } from "@/lib/multigames"
import { multigames as multigamesCards } from "@/components/home/multigames"
import { notFound } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { use } from "react"
import GameSection from "./awp-hero"

export default function MultigamePage({ params }: { params: Promise<{ gameId: string }> }) {
    const { dictionary: dict } = useLanguage();
    const resolvedParams = use(params);
    const multigame = multigames.find(m => m.slug === resolvedParams.gameId);
    
    if (!multigame) {
        notFound();
    }

    type MultigameSlug = keyof typeof dict.home.multigames.descriptions;
    const translatedDescription = dict.home.multigames.descriptions[multigame.slug as MultigameSlug] || multigame.description;

    return (
        <div>
            {/* HERO HEADER */}
            <GameSection imageUrl={multigame.mainImage} videoUrl={multigame.video} title={multigame.title} description={translatedDescription} />
            {/* GAMES CARDS SECTION */}
            <section className="py-8 md:py-12 bg-black">
                <div className="px-4 md:px-8 lg:px-16 xl:px-24">
                    {multigame.games.map((game, index) => (
                        <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} last:mb-0 rounded-2xl items-center`}>
                            <div className="h-full md:w-2/5 lg:w-1/3 relative">
                                <Image
                                    src={game.mainImage}
                                    alt={game.name}
                                    className="h-full w-full object-cover rounded-lg"
                                />
                            </div>
                            <div className="text-center md:text-left p-3 md:p-6 md:w-3/5 lg:w-2/3">
                                <div className="rounded-xl bg-black/50 p-3 md:p-4 max-w-2xl mx-8">
                                    <h3 className="text-6xl md:text-7xl font-bold text-white mb-3 md:mb-4 dharma">{game.name}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-3 md:mb-4 max-w-xl mx-auto md:mx-0 text-[#989898]">
                                   {game.subtitle}  </p>
                                    <Link href={`/allgames/${game.slug}`} className="inline-block">
                                        <Button variant="default" className="bg-black text-white border border-white rounded-full hover:opacity-80">
                                            {dict.common.buttons.playNow}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            

            {/* RECOMMENDED GAMES */}
            <section className="pt-16 bg-black">
                <div className="px-4 md:px-8 lg:px-16 xl:px-24">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center dharma">Recommended Games</h2>
                    <div className="flex flex-col md:flex-row gap-6">
                        {multigamesCards
                            .filter(m => m.slug !== multigame.slug)
                            .slice(0, 3)
                            .map((game, index) => (
                            <div key={index} className="flex-1 hover:scale-[1.02] transition-all duration-300">
                                <Link href={`/awp-multigames/${game.slug}`}>
                                    <div className="rounded-lg overflow-hidden">
                                        <Image
                                            src={game.image}
                                            alt={game.title}
                                            className="w-full h-auto"
                                            width={400}
                                            height={300}
                                        />
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}