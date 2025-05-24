"use client"

import Image from "next/image"
import VLT_HERO from "@/public/bgvlt.png"
import VLT_CARD1 from "@/public/vlts/SLOT_2022_Alta 1.png"
import VLT_CARD2 from "@/public/vlts/SLOT_2022_Alta.png"
import VLT_CARD3 from "@/public/vlts/SLOT_2022_Bassa.png"
import VLT_CARD4 from "@/public/vlts/Sidney LQ 1.png"
import VLT_CARD5 from "@/public/vlts/Octagon LQ 1.png"
import VLT_CARD6 from "@/public/vlts/TRIOOCTAGON LQ.png"
import Head from "next/head"
import { useLanguage } from "@/components/language-provider"
import VideoHero from "@/components/VideoHero"

const vltCards = [
  {
    name: "VLT Classic",
    image: VLT_CARD1,
    description: {
      it: "Cabinet VLT classico con design elegante e interfaccia intuitiva, ideale per sale giochi tradizionali.",
      en: "Classic VLT cabinet with elegant design and intuitive interface, ideal for traditional gaming halls.",
      es: "Cabinet VLT clásico con diseño elegante e interfaz intuitiva, ideal para salas de juego tradicionales."
    },
  },
  {
    name: "VLT Pro",
    image: VLT_CARD2,
    description: {
      it: "Versione professionale con schermo HD e sistema audio avanzato per un'esperienza di gioco immersiva.",
      en: "Professional version with HD screen and advanced audio system for an immersive gaming experience.",
      es: "Versión profesional con pantalla HD y sistema de audio avanzado para una experiencia de juego inmersiva."
    },
  },
  {
    name: "VLT Deluxe",
    image: VLT_CARD3,
    description: {
      it: "Cabinet di lusso con finiture premium e tecnologia all'avanguardia per sale VLT esclusive.",
      en: "Luxury cabinet with premium finishes and cutting-edge technology for exclusive VLT halls.",
      es: "Cabinet de lujo con acabados premium y tecnología de vanguardia para salas VLT exclusivas."
    },
  },
  {
    name: "VLT Premium",
    image: VLT_CARD4,
    description: {
      it: "Soluzione premium con doppio schermo e illuminazione LED personalizzabile per massimizzare l'attrattiva.",
      en: "Premium solution with dual screen and customizable LED lighting to maximize appeal.",
      es: "Solución premium con doble pantalla e iluminación LED personalizable para maximizar el atractivo."
    },
  },
  {
    name: "VLT Gold",
    image: VLT_CARD5,
    description: {
      it: "Design ottagonale distintivo con grafica 4K e sistema di jackpot collegato per vincite più emozionanti.",
      en: "Distinctive octagonal design with 4K graphics and linked jackpot system for more exciting wins.",
      es: "Diseño octogonal distintivo con gráficos 4K y sistema de jackpot vinculado para ganancias más emocionantes."
    },
  },
  {
    name: "VLT Platinum",
    image: VLT_CARD6,
    description: {
      it: "La nostra soluzione top di gamma con triplo schermo, effetti visivi straordinari e comfort ergonomico.",
      en: "Our top-of-the-line solution with triple screen, extraordinary visual effects and ergonomic comfort.",
      es: "Nuestra solución de gama alta con triple pantalla, efectos visuales extraordinarios y confort ergonómico."
    },
  },
]

export default function VLTPage() {
  const { dictionary: dict, lang } = useLanguage()

  return (
    <>
      <Head>
        <title>Cabinet VLT | Videolottery di Alta Qualità | Vitalgames</title>
        <meta
          name="description"
          content="Scopri la nostra gamma di cabinet VLT di alta qualità. Sistemi videolottery innovativi con grafica avanzata e jackpot collegati in rete per sale dedicate."
        />
        <meta
          name="keywords"
          content="VLT, videolottery, cabinet VLT, slot machine sala VLT, jackpot VLT, produttore VLT Italia, VLT certificate ADM, VLT legali Italia"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: vltCards.map((card, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Product",
                name: card.name,
                description: card.description[lang],
                brand: {
                  "@type": "Brand",
                  name: "Vitalgames",
                },
                manufacturer: {
                  "@type": "Organization",
                  name: "Vitalgames",
                },
                category: "Video Lottery Terminal",
                image: card.image.src,
              },
            })),
          })}
        </script>
      </Head>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <VideoHero 
          title="CABINET VLT"
          subtitle={dict.vlt.hero.description}
          videoUrl="https://files.catbox.moe/pvi9mx.mp4"
        />

        {/* Cards Section */}
        <div className="mx-auto px-8 sm:px-16 lg:px-32 xl:px-48 py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {vltCards.map((card, index) => (
              <div key={index} className="bg-[#171717] rounded-xl p-4 border border-1 border-[#3C3C3C] aspect-square py-8">
                <div className="relative aspect-square w-full p-4 mb-8">
                  <Image
                    src={card.image || "/placeholder.svg"}
                    alt={card.name}
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-bold text-white text-center">{card.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
