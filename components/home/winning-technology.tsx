import React from 'react'
import Image from 'next/image'
import squalo from '../../public/squalo.png'
import campana from '../../public/campana.png'
import sprinter from '../../public/sprinter.png'
import seven from '../../public/seven.png'

interface WinningTechnologyProps {
  className?: string
}

export function WinningTechnology({ className = '' }: WinningTechnologyProps) {
  return (
    <section className={`relative min-h-screen overflow-hidden bg-black py-16 ${className}`}>
      {/* Background decorative images */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top right image */}
        <div className="absolute top-[10%] right-[10%] w-72 h-72">
          <Image 
            src={squalo}
            alt="Decorative element"
            width={288}
            height={288}
            className="w-full h-auto opacity-20"
          />
        </div>

        {/* Left middle image */}
        <div className="absolute top-[40%] left-[5%] w-64 h-64">
          <Image 
            src={campana}
            alt="Decorative element"
            width={256}
            height={256}
            className="w-full h-auto opacity-20"
          />
        </div>

        {/* Bottom center-left image */}
        <div className="absolute bottom-[10%] left-[25%] w-80 h-80">
          <Image 
            src={sprinter}
            alt="Decorative element"
            width={320}
            height={320}
            className="w-full h-auto opacity-20"
          />
        </div>
        
        {/* Bottom right image that extends outside the container */}
        <div className="absolute bottom-[-35%] right-[-15%] w-[600px] h-[600px]">
          <Image 
            src={seven}
            alt="Decorative element"
            width={600}
            height={600}
            className="w-full h-auto opacity-25"
            priority
          />
        </div>
      </div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Title placeholder */}
          <h2 className="text-8xl font-bold text-white mb-12 text-center dharma">
            WINNING
            <br />
            TECHNOLOGY
          </h2>

          {/* Content placeholder - Will be filled later */}
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-300 text-center mb-8">
              Contenuto da aggiungere in seguito...
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WinningTechnology 