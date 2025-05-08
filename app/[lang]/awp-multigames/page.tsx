"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import bgawp from "@/public/bgawp.png"
import SmoothReveal from "@/components/smooth-reveal"
import Head from "next/head"

// Importa qui le immagini dei giochi come in multigames.tsx
import casinoroyale from "@/public/multigames-cards/CASINO ROYALE_Converted.jpg"
import diamante from "@/public/multigames-cards/DIAMANTE_Converted.jpg"
import goldenclub from "@/public/multigames-cards/GOLDEN CLUB ORO_Converted.jpg"
import piggygold from "@/public/multigames-cards/PIGGY GOLD MULTIGAME_Converted.jpg"
import rubino from "@/public/multigames-cards/RUBINO_Converted.jpg"
import zaffiro from "@/public/multigames-cards/ZAFFIRO_Converted.jpg"
import topazio from "@/public/multigames-cards/TOPAZIO_Converted.jpg"
import circus from "@/public/multigames-cards/CIRCUS_Converted.jpg"
import pool4 from "@/public/multigames-cards/POOL 4_Converted.jpg"
import champions from "@/public/multigames-cards/CHAMPIONS.png"
import ipfum from "@/public/multigames-cards/IP FUM.png"
import luckyslot from "@/public/multigames-cards/lucky_slot.png"

const multigames = [
  {
    id: 1,
    slug: "casino-royale",
    title: "Casino Royale",
    image: casinoroyale,
    description: "Sistema multigame con 10 giochi a tema casinò classico, interfaccia elegante e jackpot progressivo.",
  },
  {
    id: 2,
    slug: "diamante",
    title: "Diamante Multigame",
    image: diamante,
    description: "La nostra soluzione premium con 12 giochi esclusivi, grafica HD e funzionalità bonus avanzate.",
  },
  {
    id: 3,
    slug: "golden-club",
    title: "Golden Club",
    image: goldenclub,
    description: "Esperienza VIP con 8 giochi selezionati, tema lussuoso e meccaniche di gioco innovative.",
  },
  {
    id: 4,
    slug: "piggy-gold",
    title: "Piggy Gold Multigame",
    image: piggygold,
    description: "Divertente sistema con 10 giochi a tema denaro e fortuna, perfetto per un pubblico giovane.",
  },
  {
    id: 5,
    slug: "rubino",
    title: "Rubino",
    image: rubino,
    description: "Multigame con 6 giochi premium, grafica vibrante e funzionalità bonus esclusive.",
  },
  {
    id: 6,
    slug: "zaffiro",
    title: "Zaffiro",
    image: zaffiro,
    description: "Sistema elegante con 8 giochi a tema gemme, effetti visivi spettacolari e alta percentuale di vincita.",
  },
  {
    id: 7,
    slug: "topazio",
    title: "Topazio",
    image: topazio,
    description: "Multigame con 8 giochi premium, grafica raffinata e funzionalità bonus esclusive.",
  },
  {
    id: 8,
    slug: "circus",
    title: "Circus",
    image: circus,
    description: "Sistema divertente con 10 giochi a tema circo, perfetto per un pubblico giovane e dinamico.",
  },
  {
    id: 9,
    slug: "pool-4",
    title: "Pool 4",
    image: pool4,
    description: "Multigame con 8 giochi premium, grafica moderna e funzionalità bonus innovative.",
  },
  {
    id: 10,
    slug: "champions",
    title: "Champions",
    image: champions,
    description: "Sistema sportivo con 8 giochi a tema calcio, perfetto per gli appassionati di sport.",
  },
  {
    id: 11,
    slug: "ip-fum",
    title: "IP FUM",
    image: ipfum,
    description: "Multigame con 8 giochi premium, grafica moderna e funzionalità bonus innovative.",
  },
  {
    id: 12,
    slug: "lucky-slot",
    title: "Lucky Slot",
    image: luckyslot,
    description: "Sistema con 8 giochi a tema fortuna, grafica accattivante e funzionalità bonus esclusive.",
  },
]

export default function AwpMultigamesPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <>
      <Head>
        <title>AWP Multigames | Sistemi Multi Gioco per Bar e Sale | Vitalgames</title>
        <meta
          name="description"
          content="I nostri sistemi AWP multigame offrono diverse slot in un'unica macchina. Massimizza l'intrattenimento e l'offerta di gioco nei bar e nelle sale giochi."
        />
        <meta
          name="keywords"
          content="AWP multigame, multi gioco, slot multiple, sistema multigame, cabinet multigame, slot machine bar, slot machine sala giochi, multigame Italia"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: multigames.map((game, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Product",
                name: game.title,
                description: game.description,
                brand: {
                  "@type": "Brand",
                  name: "Vitalgames",
                },
                manufacturer: {
                  "@type": "Organization",
                  name: "Vitalgames",
                },
                category: "AWP Multigame",
                image: game.image.src,
                url: `https://vitalgames.com/awp-multigames/${game.slug}`,
              },
            })),
          })}
        </script>
      </Head>
      <div>
        {/* HERO HEADER */}
        <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
          <Image
            src={bgawp || "/placeholder.svg"}
            alt="AWP Multigames Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex flex-col items-start justify-center h-full w-full px-4 md:px-8 lg:px-16 xl:px-24">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white dharma mb-4">AWP MULTIGAMES</h1>
              <p className="text-sm text-white">
                Scopri la nostra selezione di sistemi multigame per bar e sale giochi
              </p>
            </div>
          </div>
        </div>

        {/* MULTIGAMES CARDS SECTION */}
        <section className="relative bg-transparent">
          {/* Side gradients */}
          <div
            className="absolute top-[60%] -translate-y-1/2 left-0 w-[500px] h-[1200px] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at left center, rgba(255, 196, 0, 0.35) 0%, rgba(255, 196, 0, 0.2) 30%, rgba(255, 196, 0, 0.1) 50%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-[40%] -translate-y-1/2 right-0 w-[500px] h-[1200px] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at right center, rgba(59, 130, 246, 0.35) 0%, rgba(59, 130, 246, 0.2) 30%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)",
            }}
          />

          <div className="container mx-auto px-4 relative z-10 pb-12 md:pb-36">
            <div className="mb-6 md:mb-8 w-full flex flex-col items-center">
              <SmoothReveal className="inline-block bg-vitalYellow text-black text-xs font-medium px-2 py-[3.5px] rounded mb-2">
                AWP MULTIGAMES
              </SmoothReveal>
              <SmoothReveal>
                <h2 className="text-center text-4xl md:text-7xl font-bold text-white dharma whitespace-normal md:whitespace-nowrap px-4">
                  SCOPRI I NOSTRI MULTIGAMES
                </h2>
              </SmoothReveal>
              <SmoothReveal>
                <p className="text-center text-white/80 max-w-2xl mt-4">
                  Sistemi multigame innovativi che offrono diverse slot in un'unica macchina, ideali per bar e sale
                  giochi che vogliono massimizzare l'offerta di intrattenimento
                </p>
              </SmoothReveal>
            </div>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-0 sm:px-4 md:px-4 lg:px-8"
              onMouseLeave={() => setHoveredCard(null)}
            >
              {multigames.map((game) => (
                <div key={game.id} className="transition-all duration-300" onMouseEnter={() => setHoveredCard(game.id)}>
                  <SmoothReveal>
                    <Link
                      href={`/awp-multigames/${game.slug}`}
                      className="w-full block group rounded-lg relative overflow-hidden hover:scale-105 transition-all duration-300"
                    >
                      <div className="w-full h-full relative">
                        <Image
                          src={game.image || "/placeholder.svg"}
                          alt={game.title}
                          className="object-cover w-full h-full"
                        />
                        {hoveredCard === game.id && (
                          <div
                            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-transparent rounded-full transition-all duration-700 ${hoveredCard === game.id ? "w-[400%] h-[400%]" : ""}`}
                            style={{
                              transform: "translate(-50%, -50%) scale(1)",
                              transition: "all 700ms cubic-bezier(0.4, 0, 0.2, 1)",
                              opacity: "1",
                              transitionProperty: "transform, opacity",
                              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                          />
                        )}
                      </div>
                    </Link>
                  </SmoothReveal>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
