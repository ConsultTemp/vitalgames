'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { games } from '@/lib/allgamesmap'
import { notFound } from 'next/navigation'
import RecommendedGames from '@/components/allgames/recommended-games'

export default function GamePage() {
    const params = useParams()
    const gameId = params.gameId as string

    const game = games.find(g => g.slug === gameId)

    if (!game) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <div className="relative w-full">
                <div className="relative w-full min-h-[80vh]">
                    <Image
                        src={game.coverImage}
                        alt={game.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute left-0 top-0 h-full w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                        <p className='text-vitalYellow border-white backdrop-blur-sm border border-1 border-white w-fit px-2 py-1 rounded-sm text-xs mb-4'>Game</p>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-12">
                            {game.name}
                        </h1>
                        <h4 className="text-lg md:text-xl font-bold text-white/90 mb-4">
                            {game.subtitle}
                        </h4>
                        <p className="text-xs font-light text-white">
                            {game.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Gallery Section */}
            <div className="max-w-5xl mx-auto px-8 sm:px-16 lg:px-32 xl:px-48 py-12">
                <div className="grid grid-cols-1 gap-4">
                    {/* First image */}
                    <div className="bg-[#171717] rounded-xl p-4 border border-1 border-[#3C3C3C]">
                        <div className="relative w-full">
                            <Image
                                src={game.images[0]}
                                alt={`${game.name} - Image 1`}
                                width={1920}
                                height={1080}
                                className="w-full h-auto rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Two images side by side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#171717] rounded-xl p-4 border border-1 border-[#3C3C3C]">
                            <div className="relative w-full">
                                <Image
                                    src={game.images[1]}
                                    alt={`${game.name} - Image 2`}
                                    width={1920}
                                    height={1080}
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>
                        </div>
                        <div className="bg-[#171717] rounded-xl p-4 border border-1 border-[#3C3C3C]">
                            <div className="relative w-full">
                                <Image
                                    src={game.images[2]}
                                    alt={`${game.name} - Image 3`}
                                    width={1920}
                                    height={1080}
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Last image */}
                    <div className="bg-[#171717] rounded-xl p-4 border border-1 border-[#3C3C3C]">
                        <div className="relative w-full">
                            <Image
                                src={game.images[3]}
                                alt={`${game.name} - Image 4`}
                                width={1920}
                                height={1080}
                                className="w-full h-auto rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recommended Games Section */}
            <RecommendedGames currentGame={game} />
        </div>
    )
}
