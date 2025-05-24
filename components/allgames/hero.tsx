'use client'
import React from 'react';
import Image from 'next/image';
import herobg from '../../public/bgallgames.png'
import allGamesBg from '../../public/allgamesbg.png'
import { useLanguage } from "@/components/language-provider"

const HeroAllgames = () => {
    const { dictionary: dict } = useLanguage()

    return (
        <div className="relative w-full">
            <div className="relative min-h-[44vh] w-full">
                <Image src={allGamesBg || "/placeholder.svg"} alt="All games Hero" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-[-50px] left-0 right-0 p-8 md:p-12">
                    <div className="max-w-5xl mx-auto text-center">
                        <h1 className="text-8xl md:text-8xl dharma font-bold text-white">{dict.allGames.hero.title}</h1>
                        <p className="text-sm font-light text-white/80 max-w-2xl mx-auto">
                            {dict.allGames.hero.subtitle}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroAllgames;
