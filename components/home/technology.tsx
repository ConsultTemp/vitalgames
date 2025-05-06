import React from 'react'
import Image from 'next/image'
import squalo from '../../public/goldshark.png'
import campana from '../../public/campana.png'
import sprinter from '../../public/twobar.png'
import isologo from '../../public/isologo.svg'
import seven from '../../public/seven.png'
import FloatingImage from '../bg-image-component'
import SmoothReveal from '../smooth-reveal'

interface WinningTechnologyProps {
    className?: string
}

export function Technology({ className = '' }: WinningTechnologyProps) {
    return (
        <div className="relative">
            {/* Bottom right image - positioned absolutely to be visible under footer */}


            <section className={`relative min-h-screen overflow-visible pb-16 pt-8`}>
                {/* Background decorative images */}
                <div className="absolute inset-0 overflow-visible pointer-events-none w-full opacity-80">
                    {/* Top right image */}
                    <div className="absolute top-[10%] right-[-80px] w-72 h-72">
                        <FloatingImage
                            src={campana}
                            alt="Decorative element"
                            className="w-40 md:w-48 h-32 sm:h-48 md:h-72 overflow-visible"

                        />
                    </div>

                    {/* Left middle image */}
                    <div className="absolute top-[30%] left-[-10%] w-64 h-64">
                        <FloatingImage
                            src={sprinter}
                            alt="Decorative element"
                            className="w-64 md:w-72 h-32 sm:h-48 md:h-72 overflow-visible"
                        />
                    </div>

                    {/* Bottom center-left image */}
                    <div className="absolute bottom-[-10%] left-[15%] w-80 h-80">
                        <FloatingImage
                            src={squalo}
                            alt="Decorative element"
                            className="w-64 md:w-72 h-32 sm:h-48 md:h-72 overflow-visible"
                        />
                    </div>
                    <div className="absolute bottom-[-25%] right-[2%] w-[300] h-[300] z-[5] pointer-events-none">
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
                        <h2 className="text-8xl font-bold dharma text-white mb-12 text-center dharma">
                            <span className='text-vitalYellow'>VITAL GAMES</span>
                            <br />
                            WINNING TECHNOLOGY
                        </h2>
                        </SmoothReveal>

                        {/* Content placeholder - Will be filled later */}
                        <SmoothReveal className="max-w-4xl mx-auto">
                            <p className="text-white font-extralight text-xs w-full text-center mb-8 px-3">
                                Vitalgames è stata fondata nel 1996 a Milano.<br />
                                Nel corso degli anni si è potuta affermare tra le migliori e più conosciute<br />
                                aziende produttrici di software di giochi d'Italia.
                            </p>
                        </SmoothReveal>
                        <SmoothReveal className='p-6 rounded-lg border border-1 border-gray-800 flex flex-row items-center justify-center gap-4 backdrop-blur-md'>
                            <Image src={isologo} alt="ISO" width={50} height={50} />
                            <div>
                                <p>Qualità italiana certificata</p>
                                <p>ISO 9001</p>
                            </div>
                        </SmoothReveal>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Technology