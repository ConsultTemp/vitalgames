"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import bgawp from "@/public/awpbg.png"
import SmoothReveal from "@/components/smooth-reveal"
import Head from "next/head"
import { useLanguage } from "@/components/language-provider"
import VideoHero from "@/components/VideoHero"

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
import fortuneultralink from "@/public/multigames/Multigames/Fortune Ultralink/fortune_ultralink.jpg"
import manhattan from "@/public/multigames/Multigames/Manhattan/MANHATTAN.jpg"
import FloatingImage from "@/components/bg-image-component"
import sevens from '../../../public/seven.png'
import bar from '../../../public/bar.png'

const multigames = [
  {
    id: 14,
    slug: "manhattan",
    title: "Manhattan",
    image: manhattan,
    description: "Sistema sportivo con 8 giochi a tema calcio, perfetto per gli appassionati di sport.",
  },
  {
    id: 10,
    slug: "champions",
    title: "Champions",
    image: champions,
    description: "Sistema sportivo con 8 giochi a tema calcio, perfetto per gli appassionati di sport.",
  },
  {
    id: 13,
    slug: "fortune-ultralink",
    title: "Fortune Ultralink",
    image: fortuneultralink,
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
    id: 4,
    slug: "piggy-gold",
    title: "Piggy Gold Multigame",
    image: piggygold,
    description: "Divertente sistema con 10 giochi a tema denaro e fortuna, perfetto per un pubblico giovane.",
  },
  {
    id: 1,
    slug: "casino-royale",
    title: "Casino Royale",
    image: casinoroyale,
    description: "Sistema multigame con 10 giochi a tema casinò classico, interfaccia elegante e jackpot progressivo.",
  },
  {
    id: 8,
    slug: "circus",
    title: "Circus",
    image: circus,
    description: "Sistema divertente con 10 giochi a tema circo, perfetto per un pubblico giovane e dinamico.",
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
    id: 3,
    slug: "golden-club",
    title: "Golden Club",
    image: goldenclub,
    description: "Esperienza VIP con 8 giochi selezionati, tema lussuoso e meccaniche di gioco innovative.",
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
  const { dictionary: dict } = useLanguage()

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
      <div className="w-screen">
        {/* HERO HEADER */}
        <VideoHero
          title={dict.awpMultigames.page.title}
          subtitle={dict.awpMultigames.page.subtitle}
          videoUrl="https://files.catbox.moe/bpgqmj.mp4"
        />

        {/* MULTIGAMES CARDS SECTION */}
        <section className="relative bg-black pt-16 flex flex-col items-center overflow-visible">
          {/* Side gradients */}
          <div
            className="absolute top-[60%] -translate-y-1/2 left-0 w-[500px] h-[1200px] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at left center, rgba(255, 196, 0, 0.35) 0%, rgba(255, 196, 0, 0.2) 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-[40%] -translate-y-1/2 right-0 w-[500px] h-[1200px] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at right center, rgba(59, 130, 246, 0.35) 0%, rgba(59, 130, 246, 0.2) 30%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)",
            }}
          />

          <div className="container mx-auto px-4 relative z-10 pb-12 md:pb-36 overflow-visible">
            <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none overflow-visible">
              {/* Bottom left large diamond */}
              <div className="absolute top-[-100px]  w-96 md:w-96 h-96 md:h-96 left-[-150px] animate-float-slow rotate-10">
                <FloatingImage src={bar || "/placeholder.svg"} alt="Diamond" className="w-[160px] md:w-[384px] h-[160px] md:h-[384px]" />
              </div>
              <div className="absolute bottom-0   w-40 md:w-96 h-40 md:h-96 right-[-50px] md:right-0 animate-float-slow rotate-10">
                <FloatingImage src={sevens || "/placeholder.svg"} alt="Diamond" className="w-[160px] md:w-[384px] h-[160px] md:h-[384px]" />
              </div>
            </div>
            <div
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full"
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

        {/* RECOMMENDED GAMES SECTION */}
        <section className="relative overflow-visible">
          {/* Background with gradient and logo pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/50 to-transparent">
            <div className="absolute inset-0 bg-black"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="container mx-auto px-4">
              <div className="mb-8 w-full flex flex-col items-start">
                <SmoothReveal>
                  <h2 className="text-start dharma text-3xl md:text-5xl font-bold text-white dharma whitespace-normal md:whitespace-nowrap">
                    {dict.awpMultigames.page.section.title}
                  </h2>
                </SmoothReveal>
              </div>

              <div>
                <div className="absolute left-0 right-0 top-[0%] h-[50vh] bg-gradient-to-b from-transparent via-[#007bff]/20 to-transparent pointer-events-none" />

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                  {multigames.slice(0, 5).map((game) => (
                    <SmoothReveal key={game.id}>
                      <Link href={`/awp-multigames/${game.slug}`} className="w-full aspect-[1080/1196] block group rounded-lg overflow-hidden relative">
                        <Image
                          src={game.image}
                          alt={game.title}
                          className="object-cover rounded-lg w-full h-full"
                        />
                      </Link>
                    </SmoothReveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
