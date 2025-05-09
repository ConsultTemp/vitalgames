'use client'
import React from 'react';
import Image from 'next/image';
import herobg from '../../public/bgallgames.png'
import { useLanguage } from "@/components/language-provider"

const HeroAllgames = () => {
    const { dictionary: dict } = useLanguage()

    return (
        <div className="relative w-full h-screen px-32">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={herobg}
                    alt="Games Collection"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center h-full px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <h1 className="text-4xl sm:text-5xl dharma md:text-6xl lg:text-7xl font-bold text-white">
                        {dict.allGames.hero.title}
                    </h1>
                    <p className="text-sm sm:text-sm text-white/90">
                        {dict.allGames.hero.subtitle}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HeroAllgames;
