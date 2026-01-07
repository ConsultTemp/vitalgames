'use client'

import Image from "next/image"
import { useLanguage } from "@/components/language-provider"
import { useState } from "react"

// Importa direttamente i loghi
import sisalLogo from "../../public/partners/Sisal.webp"
import lottomaticaLogo from "../../public/partners/Lottomatica.webp"
import bet365Logo from "../../public/partners/Bet 365.webp"
import goldBetLogo from "../../public/partners/Goldbet.webp"
import admLogo from "../../public/partners/ADM.webp"
import eurobetLogo from "../../public/partners/Eurobet.webp"
import admiralLogo from "../../public/partners/Admiral.webp"
import gamenetLogo from "../../public/partners/Gamenet.webp"
import flutterLogo from "../../public/partners/Flutter.webp"
import nLogo from "../../public/partners/Novamatic.webp"
import bmmTestlabsLogo from "../../public/partners/Bmm Testlabs.webp"
import titogamingLogo from "../../public/partners/Trtgraphic.webp"
import isoLogo from "../../public/partners/ISO9001.webp"
import cirsaLogo from "../../public/partners/Cirsa.webp"
import betflagLogo from "../../public/partners/Betflag.webp"
import setLogo from "../../public/partners/Set.webp"

// Dati dei partner con i loghi importati
const partners = [
  { id: 16, name: "Set", logo: setLogo },
  { id: 1, name: "Sisal", logo: sisalLogo },
  { id: 2, name: "Lottomatica", logo: lottomaticaLogo },
  { id: 3, name: "Bet365", logo: bet365Logo },
  { id: 4, name: "GoldBet", logo: goldBetLogo },
  { id: 5, name: "ADM", logo: admLogo },
  { id: 6, name: "Eurobet", logo: eurobetLogo },
  { id: 7, name: "Admiral", logo: admiralLogo },
  { id: 8, name: "Gamenet", logo: gamenetLogo },
  { id: 9, name: "Flutter", logo: flutterLogo },
  { id: 10, name: "Novamatic", logo: nLogo },
  { id: 11, name: "BMM Testlabs", logo: bmmTestlabsLogo },
  { id: 12, name: "Titogaming", logo: titogamingLogo },
  { id: 13, name: "ISO 9001", logo: isoLogo },
  { id: 14, name: "Cirsa", logo: cirsaLogo },
  { id: 15, name: "Betflag", logo: betflagLogo }
]

export default function Partners() {
  const { dictionary: dict } = useLanguage()
  const [hoveredPartner, setHoveredPartner] = useState<number | null>(null)
  const [clickedPartner, setClickedPartner] = useState<number | null>(null)

  // Duplica i partner per il loop infinito (3 volte per garantire continuità)
  const duplicatedPartners = [...partners, ...partners, ...partners]

  return (
    <main className="bg-black text-white p-4 pt-0 pb-24">
      <section className="py-16 px-0 sm:px-0 md:px-12 lg:px-16 relative">
        <div className="relative">
          {/* @ts-ignore */}
          <h2 className="text-6xl md:text-7xl font-bold text-center mb-8 text-white dharmalight">{dict.home.partners.title}</h2>

          <div className="overflow-hidden relative">
            {/* Sfumatura sinistra */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            {/* Sfumatura destra */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex animate-scroll-infinite">
              {duplicatedPartners.map((partner, index) => {
                const isActive = hoveredPartner === partner.id || clickedPartner === partner.id
                return (
                  <div
                    key={`${partner.id}-${index}`}
                    className="flex-shrink-0 flex items-center justify-center px-3"
                    onMouseEnter={() => setHoveredPartner(partner.id)}
                    onMouseLeave={() => setHoveredPartner(null)}
                    onClick={() => setClickedPartner(clickedPartner === partner.id ? null : partner.id)}
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="w-[270px] h-[135px] relative flex items-center justify-center">
                        <Image
                          src={partner.logo || "/placeholder.svg"}
                          alt={partner.name}
                          fill
                          className={`object-contain transition-opacity duration-300 ${
                            isActive ? 'opacity-100' : 'opacity-50'
                          }`}
                          sizes="270px"
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scroll-infinite {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-${(partners.length * 276)}px);
            }
          }
          .animate-scroll-infinite {
            animation: scroll-infinite 40s linear infinite;
          }
        `
      }} />
    </main>
  )
}
