"use client"
import OptimizedVideo from "./OptimizedVideo"
import { Button } from "./ui/button"
import Link from "next/link"
import { useLanguage } from "./language-provider"

export default function HeroSection() {
  const { lang } = useLanguage()

  return (
    <section className="relative w-full bg-black">
      <OptimizedVideo
        ratio="hero"
        videoId="2a8fbc891422d4e0ccea488a6709d001"
        mobileId="0fd5f233bf57bdd4903b68cd63420efa"
        width="100vw"
        overlay={false}
      />
      {/* Overlay nero trasparente */}
      <div className="absolute inset-0 bg-black/30 z-5"></div>
      {/* Overlay con testo e bottone */}
     {/*  <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold dharma text-center mb-8 px-16 uppercase">
          JOIN OUR WORLD OF GAMES
        </h1>
        <Link href={`/${lang}/games`}>
          <Button 
            variant="vitalYellow" 
            className="px-8 py-6 text-3xl !text-black dharma"
          >
            OUR GAMES
          </Button>
        </Link>
      </div> */}
    </section>
  )
}