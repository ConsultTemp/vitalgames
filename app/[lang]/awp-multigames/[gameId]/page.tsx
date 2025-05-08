'use client'
import Image from "next/image"
import { Play } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import SmoothReveal from "@/components/smooth-reveal"
import { multigames } from "@/lib/multigames"
import { notFound } from "next/navigation"
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function MultigamePage({ params }: { params: { gameId: string } }) {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [videoRefs, setVideoRefs] = useState<HTMLVideoElement[]>([]);
    const multigame = multigames.find(m => m.slug === params.gameId);
    
    if (!multigame) {
        notFound();
    }

    const recommendedMultigames = multigames.filter(m => multigame.recommended.includes(m.slug));

    const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
    const scrollNext = () => emblaApi && emblaApi.scrollNext();

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi, onSelect]);

    useEffect(() => {
        // Pause all videos
        videoRefs.forEach(video => {
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });

        // Play the selected video
        if (videoRefs[selectedIndex]) {
            const playPromise = videoRefs[selectedIndex].play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Playback failed:", error);
                });
            }
        }
    }, [selectedIndex, videoRefs]);

    const addVideoRef = useCallback((video: HTMLVideoElement | null) => {
        if (video && !videoRefs.includes(video)) {
            setVideoRefs(prev => [...prev, video]);
        }
    }, [videoRefs]);

    return (
        <div>
            {/* HERO HEADER */}
            <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
                <Image
                    src={multigame.coverImage}
                    alt={multigame.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
                    <div className="mb-8">
                        <Image
                            src={multigame.logo}
                            alt={`${multigame.title} Logo`}
                            width={200}
                            height={200}
                            className="mb-4"
                        />
                        <p className="text-lg md:text-2xl text-white text-center">{multigame.description}</p>
                    </div>
                </div>
            </div>

            {/* VIDEO CAROUSEL SECTION */}
            <section className="relative bg-transparent pt-32">
                <div className="container mx-auto px-4 relative z-10 pb-12">
                    <div className="mb-6 md:mb-8 w-full flex flex-col items-center">
                        <SmoothReveal className="inline-block bg-vitalYellow text-black text-xs font-medium px-2 py-[3.5px] rounded mb-2">
                            VIDEO GALLERY
                        </SmoothReveal>
                        <SmoothReveal>
                            <h2 className="text-center text-4xl md:text-7xl font-bold text-white dharma whitespace-normal md:whitespace-nowrap px-4">
                                GUARDA I VIDEO
                            </h2>
                        </SmoothReveal>
                    </div>
                    
                    <div className="relative max-w-4xl mx-auto">
                        <div className="overflow-hidden" ref={emblaRef}>
                            <div className="flex">
                                {multigame.videos.map((video, index) => (
                                    <div key={index} className="flex-[0_0_100%] min-w-0 relative">
                                        <div className="w-full rounded-lg overflow-hidden">
                                            <video
                                                ref={addVideoRef}
                                                src={video}
                                                className="w-full h-full object-cover rounded-lg"
                                                controls={false}
                                                loop
                                                autoPlay={index === 0}
                                                muted
                                                playsInline
                                                poster={multigame.coverImage.src}
                                                preload="auto"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                            onClick={scrollPrev}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                            onClick={scrollNext}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </section>

            {/* GAMES CARDS SECTION */}
            <section className="relative bg-transparent pt-32">
                {/* Side gradients */}
                <div
                    className="absolute top-[60%] -translate-y-1/2 left-0 w-[500px] h-[1200px] pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle at left center, rgba(255, 196, 0, 0.35) 0%, rgba(255, 196, 0, 0.2) 30%, rgba(255, 196, 0, 0.1) 50%, transparent 70%)'
                    }}
                />
                <div
                    className="absolute top-[40%] -translate-y-1/2 right-0 w-[500px] h-[1200px] pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle at right center, rgba(59, 130, 246, 0.35) 0%, rgba(59, 130, 246, 0.2) 30%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)'
                    }}
                />

                <div className="container mx-auto px-4 relative z-10 pb-12 md:pb-36">
                    <div className="mb-6 md:mb-8 w-full flex flex-col items-center">
                        <SmoothReveal className="inline-block bg-vitalYellow text-black text-xs font-medium px-2 py-[3.5px] rounded mb-2">
                            {multigame.title}
                        </SmoothReveal>
                        <SmoothReveal>
                            <h2 className="text-center text-4xl md:text-7xl font-bold text-white dharma whitespace-normal md:whitespace-nowrap px-4">
                                Scopri {multigame.title}
                            </h2>
                        </SmoothReveal>
                    </div>
                    <div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 px-0"
                    >
                        {multigame.games.map((game, index) => (
                            <SmoothReveal key={index}>
                                <Link
                                    href={`/allgames/${game.slug}`}
                                    className="w-full aspect-[1080/1196] block group rounded-lg overflow-hidden relative"
                                >
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
            </section>

            {/* RECOMMENDED MULTIGAMES SECTION */}
           {/*  <section className="relative bg-transparent">
                <div className="container mx-auto px-4 relative z-10 pb-12 md:pb-36">
                    <div className="mb-6 md:mb-8 w-full flex flex-col items-center">
                        <SmoothReveal className="inline-block bg-vitalYellow text-black text-xs font-medium px-2 py-[3.5px] rounded mb-2">
                            MULTIGAMES CONSIGLIATI
                        </SmoothReveal>
                        <SmoothReveal>
                            <h2 className="text-center text-4xl md:text-7xl font-bold text-white dharma whitespace-normal md:whitespace-nowrap px-4">
                                SCOPRI ALTRI MULTIGAMES
                            </h2>
                        </SmoothReveal>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-0 sm:px-4 md:px-4 lg:px-8">
                        {recommendedMultigames.map((game) => (
                            <div key={game.id}>
                                <SmoothReveal>
                                    <Link
                                        href={`/multigame/${game.slug}`}
                                        className="w-full block group rounded-lg relative overflow-hidden hover:scale-105 transition-all duration-300"
                                    >
                                        <div className="w-full h-full relative">
                                            <Image
                                                src={game.coverImage}
                                                alt={game.title}
                                                className="object-cover w-full h-full"
                                            />
                                            <div className="absolute inset-0 bg-black/50" />
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <h3 className="text-white text-xl font-bold mb-2">{game.title}</h3>
                                                <p className="text-white text-sm text-center px-4">{game.description}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </SmoothReveal>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}
        </div>
    )
} 