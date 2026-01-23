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
        <div className='
        flex flex-col sm:flex-row items-center gap-4 justify-start
        bg-transparent md:bg-[#101010] rounded-3xl
        p-4 md:p-8
        '>
            <Image 
              src={responsible} 
              alt="Logo" 
              width={60} 
              height={60}
              className="w-12 h-12 md:w-16 md:h-16"
              loading="lazy"
              sizes="(max-width: 768px) 48px, 64px"
            />
            <div className='flex flex-col items-center sm:items-start text-center sm:text-left max-w-[90%] sm:max-w-none'>
                <h3 className='text-sm md:text-base font-extrabold mb-1'>
                    {dict.home.ageRestriction.title}
                </h3>
                <p className='text-xs font-regular leading-relaxed w-full md:w-3/4 lg:w-2/3'>{dict.home.ageRestriction.description}</p>
            </div>
        </div>
    </div>
  )
}