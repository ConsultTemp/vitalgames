'use client'

import React from 'react'
import Image from 'next/image'
import responsible from '../../public/responsible.png'
import { useLanguage } from "@/components/language-provider"
import FloatingImage from '../bg-image-component'
import seven from '../../public/seven.png'

interface AgeRestrictionsProps {
  className?: string
}

export default function AgeRestrictions({ className = '' }: AgeRestrictionsProps) {
  const { dictionary: dict } = useLanguage()

  return (
    <div className={` relativew-full px-4 sm:px-8 md:px-16 lg:px-32 relative bg-black`}>
      <div className="absolute inset-0 ovrflow-hidden"></div>
        <div className='flex flex-col sm:flex-row items-center gap-4 justify-start p-4 sm:p-6 md:p-8 backdrop-blur-sm border border-1 border-white/10 rounded-lg'>
            <Image 
              src={responsible} 
              alt="Logo" 
              width={60} 
              height={60}
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
            />
            <div className='flex flex-col items-center sm:items-start text-center sm:text-left max-w-[90%] sm:max-w-none'>
                <h3 className='text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4'>
                    {dict.home.ageRestriction.title}
                </h3>
                <p className='text-xs sm:text-sm font-light leading-relaxed w-full md:w-3/4 lg:w-2/3'>{dict.home.ageRestriction.description}</p>
            </div>
        </div>
    </div>
  )
}