'use client'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import diamond from "../../public/diamond.png"
import logomagic from "../../public/logo-magic.svg"
import { Play } from "lucide-react"
import FloatingImage from "../bg-image-component"
import SmoothReveal from "../smooth-reveal"
import { useLanguage } from "@/components/language-provider"
import { OptimizedLink as Link } from "@/components/optimized-link"
import misterdiamond from "../../public/misterdiamond.jpeg"

// Import slot machine symbols
import jolly from "../../public/symbols/JOLLY.png"
import miss10 from "../../public/symbols/MISS_10.png"
import sevenNero from "../../public/symbols/7NERO.png"
import scatter from "../../public/symbols/SCATTER.png"
import sevenBlu from "../../public/symbols/7BLU.png"
import sevenRossi from "../../public/symbols/7ROSSI.png"
import campana from "../../public/symbols/campana 2.png"
import bar2 from "../../public/symbols/2BAR.png"
import ciliegia from "../../public/symbols/ciliegia.png"
import bar1 from "../../public/symbols/1BAR.png"
import bar3 from "../../public/symbols/3BAR.png"

const InfiniteScrollGallery = () => {
  const symbols = [
    jolly,
    miss10,
    sevenNero,
    sevenBlu,
    sevenRossi,
    campana,
    bar2,
    ciliegia,
    bar1,
    bar3,
  ]

  return (
    <div className="w-full flex flex-col items-center justify-center py-4 my-6 right-0">


      <Image
        src={scatter}
        alt="Scatter Symbol"
        width={300}
        height={300}
        className="relative w-[300px] h-[300px] object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
      />
      {/* Blur background */}{/* 
      <div className="absolute w-[1000000px] inset-0 backdrop-blur-sm bg-black/30 -z-10"></div> */}

      {/* Scrolling symbols container - background layer */}
      {/* <div className="flex animate-infinite-scroll opacity-30 gap-[50px]">
        {[...symbols, ...symbols, ...symbols, ...symbols, ...symbols, ...symbols, ...symbols, ...symbols].map((symbol, index) => (
          <div key={index} className="flex-shrink-0 w-[120px] h-[120px] mx-2">
            <Image
              src={symbol}
              alt={`Slot Symbol ${index + 1}`}
              width={120}
              height={120}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        ))}
      </div> */}

      {/* Large Scatter symbol - foreground layer */}
      {/*  <div className="">
        <div className="">
          <div className=" inset-0 bg-blue-500 blur-2xl opacity-50 rounded-full"></div>
          
        </div><Image
            src={scatter}
            alt="Scatter Symbol"
            width={300}
            height={300}
            className="relative w-[300px] h-[300px] object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          />
      </div> */}
    </div>
  )
}

export default function Home() {
  const { dictionary: dict } = useLanguage()

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent mb-16 px-4">
      {/* Central circular teal glow effect */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] pointer-events-none"></div>

      {/* Floating diamonds - positioned absolutely */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top left small diamond */}
        <div className="absolute left-[25%] top-[5%] md:left-[40%] md:left-[48%] w-6 md:w-16 h-6 md:h-16 animate-float-slow rotate-25">
          <FloatingImage src={diamond || "/placeholder.svg"} alt="Diamond" className="w-[24px] md:w-[64px] h-[24px] md:h-[64px] opacity-50" />
        </div>

        {/* Top right small diamond */}
        <div className="absolute top-[8%] right-[60%] md:right-[48%] w-6 md:w-16 h-6 md:h-16 animate-float-slow -rotate-20">
          <FloatingImage src={diamond || "/placeholder.svg"} alt="Diamond" className="w-[24px] md:w-[64px] h-[24px] md:h-[64px] opacity-50" />
        </div>

        {/* Middle left diamond */}
        <div className="absolute top-[12%] left-[17%] md:left-[20%] w-20 md:w-48 h-20 md:h-48 animate-float rotate-15">
          <FloatingImage src={diamond || "/placeholder.svg"} alt="Diamond" className="w-[80px] md:w-[192px] h-[80px] md:h-[192px] opacity-50" />
        </div>

        {/* Middle right diamond */}
        <div className="absolute top-[18%] right-[35%] md:right-[30%] w-20 md:w-48 h-20 md:h-48 animate-float -rotate-25">
          <FloatingImage src={diamond || "/placeholder.svg"} alt="Diamond" className="w-[80px] md:w-[192px] h-[80px] md:h-[192px] opacity-50" />
        </div>

        {/* Bottom left large diamond */}
        <div className="absolute top-[20%] left-[5%] md:left-[2%] w-40 md:w-96 h-40 md:h-96 animate-float-slow rotate-10">
          <FloatingImage src={diamond || "/placeholder.svg"} alt="Diamond" className="w-[160px] md:w-[384px] h-[160px] md:h-[384px] opacity-50" />
        </div>

        {/* Bottom right large diamond */}
        <div className="absolute top-[32%] right-[5%] md:right-[8%] w-40 md:w-96 h-40 md:h-96 animate-float-slow -rotate-20">
          <FloatingImage src={diamond || "/placeholder.svg"} alt="Diamond" className="w-[160px] md:w-[384px] h-[160px] md:h-[384px] opacity-50" />
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none backdrop-blur-sm bg-transparent z-100 w-full h-full">
      </div>

      {/* Content */}
      <div className="relative z-10 py-12 flex flex-col items-center w-full">
        {/* Logo */}
        <SmoothReveal className="mb-8 max-w-[100px]">
          <Image src={logomagic || "/placeholder.svg"} alt="logo" />
        </SmoothReveal>

        {/* Main heading */}
        <SmoothReveal>
          <h1 className="text-white text-5xl md:text-7xl font-bold text-center mb-8 leading-tight dharma">
            {dict.home.magicDiamond.title}
            <br />
            <span className="text-vitalYellow">{dict.home.magicDiamond.titleLine2}</span>
          </h1>
        </SmoothReveal>

        {/* Description */}
        {/* <SmoothReveal>
          <div className="max-w-3xl text-white text-center mb-12">
            <p className="mb-4 text-xs font-normal px-3">
              Scopri l'energia scintillante di Mr. Diamond, la slot dove ogni spin può attivare bonus esplosivi! Raccogli
              diamanti blu e rossi, sblocca giri gratuiti e scegli gemme misteriose per vincite moltiplicate fino a 2000x.
              Con il Buy Bonus, entri subito nell'azione. E grazie ad Autoplay e Quick Spin, il ritmo non si ferma mai!
            </p>
          </div>
        </SmoothReveal> */}

        {/* Infinite Scroll Gallery */}
       {/*  <div className="w-screen mb-12">
          <InfiniteScrollGallery />
        </div> */}
        <div className="w-full flex flex-col items-center justify-center mt-4 mb-12">
          <div className="w-full max-w-[600px] md:max-w-[650px] rounded-xl overflow-hidden relative">
            <Image 
              src={misterdiamond} 
              alt="Scatter Symbol" 
              className="w-full h-auto object-cover"
              priority
              style={{ borderRadius: '12px' }}
            />
          </div>
        </div>

        {/* Call to action */}
        <div className="w-full flex flex-col md:flex-row justify-center md:justify-between items-center max-w-4xl">
          <SmoothReveal className="flex flex-col items-center md:items-start mb-8 md:mb-0">
            <p className="text-white text-sm font-light mb-1">{dict.home.magicDiamond.playNow}</p>
            <h2 className="text-white text-4xl font-bold">{dict.home.magicDiamond.gameTitle}</h2>
          </SmoothReveal>
          <SmoothReveal className="flex flex-row gap-4 justify-center">
            <Button className="bg-vitalYellow hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded-full flex flex-row">
              <Play className="text-black w-3 h-3 mr-2" />
              {dict.home.magicDiamond.startDemo}
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/5 font-bold px-4 py-2 rounded-full"
            >
              <Link href="/allgames/magic-diamond-2">{dict.home.magicDiamond.learnMore}</Link>
            </Button>
          </SmoothReveal>
        </div>
      </div>
    </div>
  )
}
