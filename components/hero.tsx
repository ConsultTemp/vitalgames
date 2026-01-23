"use client"
import OptimizedVideo from "./OptimizedVideo"
import { Button } from "./ui/button"
import { OptimizedLink as Link } from "./optimized-link"
import { useLanguage } from "./language-provider"
import Image from "next/image"
import vitalgamesLogo from "../public/vitalgamesdigital-logo.svg"

export default function HeroSection() {
  const { lang, dictionary: dict } = useLanguage()

  return (
    <section className="relative w-full bg-black min-h-[20vh] md:min-h-screen flex items-end">
      <OptimizedVideo
        ratio="hero"
        videoId="2a8fbc891422d4e0ccea488a6709d001"
        mobileId="6c3d0602527049492d76b7de48d0ff3e"
        width="100vw"
        overlay={false}
      />
      
      {/* Fade nero dal basso fino al 50% dello schermo */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: '100%',
          background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 5%, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.2) 80%, transparent 100%)',
        }}
      />

      {/* Contenuto con testo e bottone */}
      <div className="absolute inset-0 flex flex-col items-start justify-end z-10 px-6 md:px-16 pb-16 md:pb-40">
        <div className="max-w-3xl text-left">
          <div className="relative w-full max-w-5xl mb-4 h-20 md:h-48">
            <Image
              src={vitalgamesLogo}
              alt="Vital Games Digital"
              fill
              className="object-contain object-left"
              priority
              sizes="(max-width: 768px) 90vw, 1200px"
            />
          </div>
          <p className="text-white text-base md:text-lg mb-7 max-w-2xl font-hitmarker-text-regular uppercase">
            {dict.hero?.description || "Dal 1996 guidiamo l’evoluzione del gioco con soluzioni sicure e all'avanguardia."}
          </p>
          <Link href="/games">
            <Button className="bg-[#403c00] border border-vitalYellow hover:scale-105 transition-all duration-300 px-8 text-white font-hitmarker-text-medium rounded-full h-12 text-base hover:bg-vitalYellow hover:text-black hover:animate-pulse"
              size="lg"
            >
              {dict.hero?.ctaButton || "I NOSTRI GIOCHI"}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}