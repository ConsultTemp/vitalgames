'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { games } from '@/lib/allgamesmap'
import { notFound } from 'next/navigation'
import RecommendedGames from '@/components/allgames/recommended-games'
import Multigame from './game-of'
import SmoothReveal from '@/components/smooth-reveal'
import { multigames } from '@/lib/multigames'
import Link from 'next/link'
import { useLanguage } from '@/components/language-provider'

export default function GamePage() {
    const params = useParams()
    const gameId = params.gameId as string
    const { dictionary: dict } = useLanguage()

    const game = games.find(g => g.slug === gameId)

    if (!game) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <div className="relative w-full">
                <div className="relative w-full min-h-[100vh]">
                    <Image
                        src={game.coverImage}
                        alt={game.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute left-0 top-0 h-full w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                        <h1 className="text-8xl md:text-9xl font-bold text-white dharma">
                            {game.name}
                        </h1>
                        <p className="text-sm font-light text-white">
                            {game.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Gallery Section */}
            <div className="max-w-full mx-auto px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 pt-8 md:pt-12 overflow-hidden h-fit pb-0">
                <div className="relative w-full h-[30vh] sm:h-[40vh] md:h-[60vh]">
                    <div className="flex animate-infinite-scroll -ml-[1000px] sm:-ml-[1500px] md:-ml-[2000px]">
                        {/* Left side images */}
                        {game.images.map((image, index) => (
                            <div key={`left-${index}`} className="flex-shrink-0 w-[250px] sm:w-[350px] md:w-[500px] mx-2 sm:mx-3 md:mx-4 h-full">
                                <div className="bg-[#171717] rounded-xl p-2 sm:p-3 md:p-4 border border-1 border-[#3C3C3C] h-full">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={image}
                                            alt={`${game.name} - Image ${index + 1}`}
                                            width={1920}
                                            height={1080}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Center images */}
                        {game.images.map((image, index) => (
                            <div key={`center-${index}`} className="flex-shrink-0 w-[250px] sm:w-[350px] md:w-[500px] mx-2 sm:mx-3 md:mx-4 h-full">
                                <div className="bg-[#171717] rounded-xl p-2 sm:p-3 md:p-4 border border-1 border-[#3C3C3C] h-full">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={image}
                                            alt={`${game.name} - Image ${index + 1}`}
                                            width={1920}
                                            height={1080}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Right side images */}
                        {game.images.map((image, index) => (
                            <div key={`right-${index}`} className="flex-shrink-0 w-[250px] sm:w-[350px] md:w-[500px] mx-2 sm:mx-3 md:mx-4 h-full">
                                <div className="bg-[#171717] rounded-xl p-2 sm:p-3 md:p-4 border border-1 border-[#3C3C3C] h-full">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={image}
                                            alt={`${game.name} - Image ${index + 1}`}
                                            width={1920}
                                            height={1080}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Multigame />
            {/* RECOMMENDED GAMES SECTION */}
            <section className="relative overflow-visible">
                {/* Background with gradient and logo pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-black via-black/50 to-transparent">
                    <div className="absolute inset-0 bg-black"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <div className="container mx-auto px-4">
                        <div className="mb-8 w-full flex flex-col items-start">
                            <SmoothReveal>
                                <h2 className="text-start dharma text-4xl md:text-6xl font-bold text-white dharma whitespace-normal md:whitespace-nowrap">
                                    {dict.allGames.youMightAlsoLike}
                                </h2>
                            </SmoothReveal>
                        </div>

                        <div>
                            <div className="absolute left-0 right-0 top-[0%] h-[50vh] bg-gradient-to-b from-transparent via-[#007bff]/20 to-transparent pointer-events-none" />

                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 md:gap-6">
                                {multigames.slice(0, 5).map((game) => (
                                    <SmoothReveal key={game.id}>
                                        <Link href={`/awp-multigames/${game.slug}`} className="block group rounded-lg overflow-hidden">
                                            <Image
                                                src={game.mainImage}
                                                alt={game.title}
                                                width={1080}
                                                height={1196}
                                                className="w-full h-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </Link>
                                    </SmoothReveal>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
