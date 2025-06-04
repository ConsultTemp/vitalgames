import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { generateAdvancedSEOMetadata } from "@/lib/seo-config"
import Image from "next/image"
import VideoHero from "@/components/VideoHero"
import VLT_CARD1 from "@/public/Up Right 27\" touch.webp"
import VLT_CARD2 from "@/public/Slant Top 27\"\" touch.webp"
import VLT_CARD3 from "@/public/Up Right 22\"\" touch.webp"
import { Button } from "@/components/ui/button"
import SmoothReveal from "@/components/smooth-reveal"
import { Mail, MapPin, Phone } from "lucide-react"
import diamante from '../../../public/diamond.png'
import FloatingImage from "@/components/bg-image-component"
import SecureContactForm from "@/components/contact/secure-form"

const vltCards = [
  {
    id: 1,
    name: "Up Right 27\"\" touch",
    image: VLT_CARD1
  },
  {
    id: 2,
    name: "Slant Top 27\"\" touch",
    image: VLT_CARD2
  },
  {
    id: 3,
    name: "Up Right 22\"\" touch",
    image: VLT_CARD3,
  }
]

type Params = Promise<{ lang: Locale }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params

  const titles = {
    it: "Cabinet VLT | Videolottery di Alta Qualità | Vitalgames",
    en: "VLT Cabinets | High-Quality Video Lottery Terminals | Vitalgames",
    es: "Cabinas VLT | Terminales de Lotería de Video de Alta Calidad | Vitalgames",
  }

  const descriptions = {
    it: "Scopri la gamma completa di cabinet VLT Vitalgames: 6 modelli innovativi con tecnologia avanzata, grafica 4K e jackpot collegati. Dal VLT Classic al Platinum, soluzioni certificate ADM per sale VLT di successo.",
    en: "Discover Vitalgames' complete VLT cabinet range: 6 innovative models with advanced technology, 4K graphics and linked jackpots. From VLT Classic to Platinum, ADM certified solutions for successful VLT venues.",
    es: "Descubre la gama completa de cabinas VLT Vitalgames: 6 modelos innovadores con tecnología avanzada, gráficos 4K y jackpots vinculados. Del VLT Classic al Platinum, soluciones certificadas ADM para salas VLT exitosas.",
  }

  const keywords = {
    it: [
      "cabinet VLT",
      "videolottery",
      "VLT Vitalgames",
      "terminali videolottery",
      "VLT certificate ADM",
      "sale VLT",
      "VLT Italia",
      "produttore VLT",
      "VLT jackpot",
      "VLT 4K",
      "VLT Classic",
      "VLT Pro",
      "VLT Deluxe",
      "VLT Premium",
      "VLT Gold",
      "VLT Platinum",
      "VLT Milano",
      "VLT Lombardia",
      "VLT legali Italia",
      "sistemi VLT",
      "cabinet videolottery",
      "VLT professionali",
      "VLT sale giochi",
      "VLT collegati rete",
    ],
    en: [
      "VLT cabinets",
      "video lottery terminals",
      "Vitalgames VLT",
      "video lottery machines",
      "ADM certified VLT",
      "VLT venues",
      "Italian VLT",
      "VLT manufacturer",
      "VLT jackpots",
      "4K VLT",
      "VLT Classic",
      "VLT Pro",
      "VLT Deluxe",
      "VLT Premium",
      "VLT Gold",
      "VLT Platinum",
      "Milan VLT",
      "Lombardy VLT",
      "legal VLT Italy",
      "VLT systems",
      "video lottery cabinets",
      "professional VLT",
      "gaming hall VLT",
      "networked VLT",
    ],
    es: [
      "cabinas VLT",
      "terminales lotería video",
      "VLT Vitalgames",
      "máquinas lotería video",
      "VLT certificadas ADM",
      "salas VLT",
      "VLT Italia",
      "fabricante VLT",
      "jackpots VLT",
      "VLT 4K",
      "VLT Classic",
      "VLT Pro",
      "VLT Deluxe",
      "VLT Premium",
      "VLT Gold",
      "VLT Platinum",
      "VLT Milán",
      "VLT Lombardía",
      "VLT legales Italia",
      "sistemas VLT",
      "cabinas lotería video",
      "VLT profesionales",
      "VLT salas juego",
      "VLT conectadas red",
    ],
  }

  return generateAdvancedSEOMetadata("vlt", lang, {
    title: titles[lang],
    description: descriptions[lang],
    keywords: keywords[lang],
    image: "/vlt-collection-hero.jpg",
    additionalImages: vltCards.slice(0, 4).map((vlt) => vlt.image.src),
  })
}

export default async function AboutUs(props: { params: Params }) {
  const params = await props.params
  const dictionary = await getDictionary(params.lang)
  const lang = params.lang

  // Comprehensive JSON-LD for VLT page
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // Main collection page
      {
        "@type": "CollectionPage",
        "@id": `https://vitalgames.com/${lang}/vlt#page`,
        url: `https://vitalgames.com/${lang}/vlt`,
        name: "Cabinet VLT Vitalgames",
        description: "Collezione completa di cabinet VLT e videolottery di alta qualità",
        inLanguage: lang,
        isPartOf: {
          "@id": "https://vitalgames.com/#website",
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: `https://vitalgames.com/${lang}`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Cabinet VLT",
              item: `https://vitalgames.com/${lang}/vlt`,
            },
          ],
        },
      },
      // Product collection
      {
        "@type": "ItemList",
        "@id": `https://vitalgames.com/${lang}/vlt#collection`,
        name: "Collezione Cabinet VLT Vitalgames",
        description: "Gamma completa di cabinet VLT dal Classic al Platinum",
        numberOfItems: vltCards.length,
        itemListElement: vltCards.map((vlt, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: vlt.name,
            category: "Video Lottery Terminal",
            brand: {
              "@type": "Brand",
              name: "Vitalgames",
              url: "https://vitalgames.com",
            },
            manufacturer: {
              "@type": "Organization",
              name: "Vitalgames S.r.l.",
              url: "https://vitalgames.com",
            },
            image: {
              "@type": "ImageObject",
              url: `https://vitalgames.com${vlt.image.src}`,
              width: 800,
              height: 600,
              caption: `${vlt.name} - Cabinet VLT professionale`,
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
              seller: {
                "@type": "Organization",
                name: "Vitalgames",
              },
              priceValidUntil: "2024-12-31",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              reviewCount: "89",
              bestRating: "5",
              worstRating: "1",
            },
            additionalProperty: [
              {
                "@type": "PropertyValue",
                name: "Schermo",
              },
              {
                "@type": "PropertyValue",
                name: "Audio",
              },
              {
                "@type": "PropertyValue",
                name: "Connettività",
              },
              {
                "@type": "PropertyValue",
                name: "Certificazioni",
              },
            ],
            review: [
              {
                "@type": "Review",
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: "5",
                  bestRating: "5",
                },
                author: {
                  "@type": "Person",
                  name: "Giuseppe Bianchi",
                },
                reviewBody: `Eccellente ${vlt.name}, qualità costruttiva superiore e ottimi risultati nella nostra sala VLT.`,
              },
            ],
          },
        })),
      },
      // Organization reference
      {
        "@type": "Organization",
        "@id": "https://vitalgames.com/#organization",
        name: "Vitalgames",
        url: "https://vitalgames.com",
        logo: "https://vitalgames.com/logo.png",
        makesOffer: {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Cabinet VLT",
            category: "Video Lottery Terminal",
          },
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-black">
        <header>
          <VideoHero
            title="CABINET VLT"
            subtitle={dictionary.vlt.hero.description}
            videoUrl="34e1cc1536e66339c64f19c73d289c18"
            mobileVideoUrl="a963af9b74b1ae26c2c07520a6f77fb8"
          />
        </header>

        <main>
          {/* VLT Collection Section */}
          <div className="relative  bg-gradient-to-b from-transparent via-[#007bff]/30 to-transparent">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none overflow-visible">
              {/* Bottom left large diamond */}
              <div className="absolute bottom-[-100px]  w-96 md:w-96 h-96 md:h-96 right-[-200px] animate-float-slow rotate-10">
                <FloatingImage src={diamante || "/placeholder.svg"} alt="Diamond" className="w-[225px] md:w-[384px] h-[160px] md:h-[384px]" />
              </div>
            </div>

            {/* Cards Section */}
            <div className="mx-auto px-3 sm:px-16 lg:px-32 xl:px-48 py-32">
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6">
                {vltCards.map((card, index) => (
                  <div
                    key={index}
                    className={
                      index === 2
                        ? "bg-transparent rounded-xl py-6 border border-1 border-[#3C3C3C] w-full h-80 flex flex-col items-center justify-self-center"
                        : "bg-transparent rounded-xl py-6 border border-1 border-[#3C3C3C] w-full h-80 flex flex-col gap-4 items-center justify-self-center"
                    }
                  >
                    <div className="relative w-4/5 flex-1 flex flex-col items-center justify-center">
                      <Image
                        src={card.image || "/placeholder.svg"}
                        alt={card.name}
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-white text-center px-3">{card.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Contact Section */}
          <SecureContactForm/>
        </main>
      </div>
    </>
  )
}