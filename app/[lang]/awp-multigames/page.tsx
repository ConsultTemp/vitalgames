"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import bgawp from "@/public/bgawp.png"
import SmoothReveal from "@/components/smooth-reveal"
import Head from "next/head"

// Importa qui le immagini dei giochi come in multigames.tsx
import casinoroyale from "@/public/multigames/casinoroyale.png"
import casinoroyaleHover from "@/public/multigames/casinoroyalehover.jpg"
import diamante from "@/public/multigames/diamante.png"
import diamanteHover from "@/public/multigames/diamantehover.jpg"
import goldenclub from "@/public/multigames/goldenclub.png"
import piggygold from "@/public/multigames/piggygold.png"
import piggygoldHover from "@/public/multigames/piggygoldhover.jpg"
import rubino from "@/public/multigames/rubino.png"
import zaffiro from "@/public/multigames/zaffiro.png"

const multigames = [
  {
    id: 1,
    slug: "casino-royale",
    title: "Casino Royale",
    image: casinoroyale,
    hoverImage: casinoroyaleHover,
    description: "Sistema multigame con 10 giochi a tema casinò classico, interfaccia elegante e jackpot progressivo.",
  },
  {
    id: 2,
    slug: "diamante",
    title: "Diamante Multigame",
    image: diamante,
    hoverImage: diamanteHover,
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
    hoverImage: piggygoldHover,
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
    description:
      "Sistema elegante con 8 giochi a tema gemme, effetti visivi spettacolari e alta percentuale di vincita.",
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
          <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
            <h1 className="text-4xl md:text-6xl font-bold text-white dharma mb-4 text-center">AWP MULTIGAMES</h1>
            <p className="text-lg md:text-2xl text-white text-center">
              Scopri la nostra selezione di sistemi multigame per bar e sale giochi
            </p>
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
                      href={`/multigame/${game.slug}`}
                      className="w-full block group rounded-lg relative overflow-hidden hover:scale-105 transition-all duration-300"
                    >
                      <div className="w-full h-full relative">
                        <Image
                          src={game.image || "/placeholder.svg"}
                          alt={game.title}
                          className="object-cover w-full h-full"
                        />
                        {game.hoverImage && (
                          <>
                            <div
                              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 bg-transparent rounded-full transition-all duration-700 ${hoveredCard === game.id ? "w-[400%] h-[400%]" : ""}`}
                              style={{
                                transform:
                                  hoveredCard === game.id
                                    ? "translate(-50%, -50%) scale(1)"
                                    : "translate(-50%, -50%) scale(0)",
                                transition: "all 700ms cubic-bezier(0.4, 0, 0.2, 1)",
                                opacity: hoveredCard === game.id ? "1" : "0",
                                transitionProperty: "transform, opacity",
                                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                              }}
                            />
                            <div
                              className={`absolute inset-0 transition-opacity duration-300 ${hoveredCard === game.id ? "opacity-100" : "opacity-0"}`}
                              style={{
                                clipPath: hoveredCard === game.id ? "circle(100% at center)" : "circle(0% at center)",
                                transition: "clip-path 700ms cubic-bezier(0.4, 0, 0.2, 1)",
                                opacity: hoveredCard === game.id ? "1" : "0",
                                transitionProperty: "clip-path, opacity",
                                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                              }}
                            >
                              <Image
                                src={game.hoverImage || "/placeholder.svg"}
                                alt={`${game.title} hover`}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </>
                        )}
                        <div
                          className={`absolute bottom-0 left-0 right-0 h-full flex flex-col items-center justify-end pb-4 transition-all duration-500 ${hoveredCard === game.id ? "opacity-100" : "opacity-0"}`}
                          style={{
                            background:
                              hoveredCard === game.id
                                ? "linear-gradient(to bottom, transparent 0%, transparent 0%, rgba(0,0,0,1) 100%)"
                                : "transparent",
                            transition: "all 500ms cubic-bezier(0.4, 0, 0.2, 1)",
                            opacity: hoveredCard === game.id ? "1" : "0",
                            transitionProperty: "background, opacity",
                            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                          }}
                        >
                          <h3 className="text-white text-base font-bold mb-2">{game.title}</h3>
                          <p className="text-white/80 text-xs mb-4 px-4 text-center">{game.description}</p>
                          <button className="bg-white hover:opacity-90 text-black px-8 py-3 text-sm rounded-full flex items-center gap-2">
                            Scopri di più
                          </button>
                        </div>
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
