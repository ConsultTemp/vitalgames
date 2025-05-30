'use client'

import Image from "next/image"
import { useLanguage } from "@/components/language-provider"

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

  return (
    <main className=" bg-black text-white p-4 pt-0 pb-24">
      <section className="py-16 px-0 sm:px-0 md:px-12 lg:px-16 relative">
        <div className="partners-bg absolute inset-0 opacity-[0.03]"></div>
        <div className="relative">
          {/* @ts-ignore */}
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-white dharmalight">{dict.home.partners.title}</h2>

          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="relative bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden aspect-[4/3] flex items-center justify-center p-2"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="w-full max-w-[120px] h-[60px] relative flex items-center justify-center">
                    <Image
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
