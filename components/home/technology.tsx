'use client'

import React from 'react'
import Image from 'next/image'
import squalo from '../../public/goldshark.png'
import campana from '../../public/campana.png'
import sprinter from '../../public/twobar.png'
import isologo from '../../public/isologo.svg'
import seven from '../../public/seven.png'
import FloatingImage from '../bg-image-component'
import SmoothReveal from '../smooth-reveal'
import certificate from '../../public/golden-certificate.png'
import vitalhq from '../../public/vital-hq.jpeg'
import vitalpres from '../../public/vitalgames-pres.jpeg'
import Link from 'next/link'
import { useLanguage } from "@/components/language-provider"

interface WinningTechnologyProps {
    className?: string
}

export function Technology({ className = '' }: WinningTechnologyProps) {
    const { dictionary: dict } = useLanguage()

    return (
        <div className="relative">
            {/* Bottom right image - positioned absolutely to be visible under footer */}


            <section className={`relative min-h-screen overflow-visible pt-8`}>
                {/* Background decorative images */}
                <div className="absolute inset-0 overflow-visible pointer-events-none w-full opacity-80">
                    {/* Top right image */}
                    <div className="absolute top-[0%] right-[-80px] w-72 h-72">
                        <FloatingImage
                            src={campana}
                            alt="Decorative element"
                            className="w-40 md:w-48 h-32 sm:h-48 md:h-72 overflow-visible"

                        />
                    </div>

                    {/* Left middle image */}
                    <div className="absolute top-[30%] left-[0%] w-64 h-64">
                        <FloatingImage
                            src={sprinter}
                            alt="Decorative element"
                            className="w-64 md:w-72 h-32 sm:h-48 md:h-72 overflow-visible"
                        />
                    </div>

                    {/* Bottom center-left image */}
                    <div className="absolute bottom-[-3%] left-[15%] w-80 h-80">
                        <FloatingImage
                            src={squalo}
                            alt="Decorative element"
                            className="w-64 md:w-72 h-32 sm:h-48 md:h-72 overflow-visible"
                        />
                    </div>
                    <div className="absolute bottom-[-10%] right-[2%] w-[300] h-[300] z-[5] pointer-events-none">
                        <FloatingImage
                            src={seven}
                            alt="Decorative element"
                            className="w-64 md:w-72 h-32 sm:h-48 md:h-72 overflow-visible"
                        />
                    </div>
                </div>

                {/* Content container */}
                <div className="relative z-10 py-32 container mx-auto px-4">
                    <div className="flex flex-col items-center">
                        {/* Title placeholder */}
                        <SmoothReveal>
                            <h2 className="text-8xl font-bold mb-12 text-center flex flex-col items-center">
                                <span className=' dharma'>{dict.home.technology.title}</span>

                                <span className="text-lg font-light text-vitalYellow">{dict.home.technology.subtitle}</span>
                            </h2>
                        </SmoothReveal>

                        {/* Content placeholder - Will be filled later */}
                        <SmoothReveal className="max-w-4xl mx-auto mb-12">
                            <p className='text-center text-sm font-light'>{dict.home.technology.description}</p>
                        </SmoothReveal>
                        <SmoothReveal className='p-6 rounded-lg border border-1 border-gray-800 flex flex-row items-center justify-center gap-4 backdrop-blur-md'>
                            <Image src={isologo} alt="ISO" width={50} height={50} />
                            <div>
                                <p>{dict.home.technology.certification.title}</p>
                                <p>{dict.home.technology.certification.standard}</p>
                            </div>
                        </SmoothReveal>
                        <SmoothReveal className="flex flex-col md:flex-row gap-8 mt-16">
                            <Image src={vitalhq} alt="Vital HQ" width={300} height={300} className="rounded-2xl" />
                            <Image src={vitalpres} alt="Vital HQ" width={300} height={300} className="rounded-2xl" />
                        </SmoothReveal>
                        <SmoothReveal className="flex justify-center mt-12">
                            <Link href="/about-us#about-us-contact" className="bg-vitalYellow text-black px-8 py-3 rounded-lg font-medium hover:bg-yellow-400 transition-colors">
                                {dict.home.technology.cta}
                            </Link>
                        </SmoothReveal>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Technology