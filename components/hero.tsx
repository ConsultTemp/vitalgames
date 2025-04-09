"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"
import img from '../public/hero.png'

export default function Hero({ dictionary }: { dictionary: any }) {
  const { lang } = useLanguage()

  return (
    <section className="relative h-screen">
      {/* Hero background image with optimized loading */}
      <div className="absolute inset-0 z-0">
        <Image
          src={img}
          alt="Luxury car service - Patty Car Milano"
          fill
          priority
          className="object-cover brightness-50"
          sizes="100vw"
          fetchPriority="high"
          loading="eager"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-white pt-16 text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-light mb-6 atacama">{dictionary.title}</h1>
          <p className="text-sm md:text-sm mb-8 font-light">{dictionary.description}</p>
          <Link
            href={`/${lang}/booking`}
            className="inline-block bg-white text-red-700 px-8 py-3 hover:bg-gray-200 transition-colors"
          >
            {dictionary.ctaButton}
          </Link>
        </div>
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-0 left-0 right-0 text-center text-white z-10 w-full bg-black">
        <p className="text-sm atacama text-darkGray py-4">{dictionary.bottomText}</p>
      </div>

      {/* Structured data for hero section */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Patty Car Luxury Chauffeur Service",
            description: dictionary.description,
            provider: {
              "@type": "LocalBusiness",
              name: "Patty Car",
              image: "https://pattycar.com/images/patty-car-logo.jpg",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Milano",
                addressRegion: "MI",
                addressCountry: "IT",
              },
              telephone: "+39 02 1234567",
            },
          }),
        }}
      />
    </section>
  )
}

