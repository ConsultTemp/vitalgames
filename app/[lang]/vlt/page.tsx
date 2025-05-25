import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { generateAdvancedSEOMetadata } from "@/lib/seo-config"
import Image from "next/image"
import VideoHero from "@/components/VideoHero"
import VLT_CARD1 from "@/public/vlts/SLOT_2022_Alta 1.png"
import VLT_CARD2 from "@/public/vlts/SLOT_2022_Alta.png"
import VLT_CARD3 from "@/public/vlts/SLOT_2022_Bassa.png"
import VLT_CARD4 from "@/public/vlts/Sidney LQ 1.png"
import VLT_CARD5 from "@/public/vlts/Octagon LQ 1.png"
import VLT_CARD6 from "@/public/vlts/TRIOOCTAGON LQ.png"

const vltCards = [
  {
    id: 1,
    name: "VLT Classic",
    model: "VLT-CL-2024",
    image: VLT_CARD1,
    price: "€12,500",
    features: ["Design elegante", "Interfaccia intuitiva", "Schermo 22''", "Audio stereo"],
    description: {
      it: "Cabinet VLT classico con design elegante e interfaccia intuitiva, ideale per sale giochi tradizionali. Schermo HD 22 pollici e sistema audio stereo per un'esperienza coinvolgente.",
      en: "Classic VLT cabinet with elegant design and intuitive interface, ideal for traditional gaming halls. 22-inch HD screen and stereo audio system for an engaging experience.",
      es: "Cabinet VLT clásico con diseño elegante e interfaz intuitiva, ideal para salas de juego tradicionales. Pantalla HD de 22 pulgadas y sistema de audio estéreo para una experiencia atractiva.",
    },
    specifications: {
      screen: "22'' HD LED",
      audio: "Sistema stereo 2.1",
      connectivity: "Ethernet, WiFi",
      certification: "ADM, CE",
    },
  },
  {
    id: 2,
    name: "VLT Pro",
    model: "VLT-PR-2024",
    image: VLT_CARD2,
    price: "€15,800",
    features: ["Schermo HD", "Audio avanzato", "LED personalizzabili", "Ergonomia premium"],
    description: {
      it: "Versione professionale con schermo HD e sistema audio avanzato per un'esperienza di gioco immersiva. Illuminazione LED personalizzabile e design ergonomico.",
      en: "Professional version with HD screen and advanced audio system for an immersive gaming experience. Customizable LED lighting and ergonomic design.",
      es: "Versión profesional con pantalla HD y sistema de audio avanzado para una experiencia de juego inmersiva. Iluminación LED personalizable y diseño ergonómico.",
    },
    specifications: {
      screen: "24'' Full HD LED",
      audio: "Sistema surround 5.1",
      connectivity: "Ethernet, WiFi, Bluetooth",
      certification: "ADM, CE, ISO",
    },
  },
  {
    id: 3,
    name: "VLT Deluxe",
    model: "VLT-DX-2024",
    image: VLT_CARD3,
    price: "€18,900",
    features: ["Finiture premium", "Tecnologia avanzata", "Design esclusivo", "Comfort superiore"],
    description: {
      it: "Cabinet di lusso con finiture premium e tecnologia all'avanguardia per sale VLT esclusive. Materiali di alta qualità e comfort superiore per i giocatori.",
      en: "Luxury cabinet with premium finishes and cutting-edge technology for exclusive VLT halls. High-quality materials and superior comfort for players.",
      es: "Cabinet de lujo con acabados premium y tecnología de vanguardia para salas VLT exclusivas. Materiales de alta calidad y comodidad superior para los jugadores.",
    },
    specifications: {
      screen: "27'' 4K LED",
      audio: "Sistema premium 7.1",
      connectivity: "Ethernet, WiFi, Bluetooth, NFC",
      certification: "ADM, CE, ISO, Energy Star",
    },
  },
  {
    id: 4,
    name: "VLT Premium",
    model: "VLT-PM-2024",
    image: VLT_CARD4,
    price: "€22,500",
    features: ["Doppio schermo", "LED personalizzabili", "Design innovativo", "Massima attrattiva"],
    description: {
      it: "Soluzione premium con doppio schermo e illuminazione LED personalizzabile per massimizzare l'attrattiva. Design innovativo e tecnologia di ultima generazione.",
      en: "Premium solution with dual screen and customizable LED lighting to maximize appeal. Innovative design and latest generation technology.",
      es: "Solución premium con doble pantalla e iluminación LED personalizable para maximizar el atractivo. Diseño innovador y tecnología de última generación.",
    },
    specifications: {
      screen: "Dual 24'' Full HD + 10'' Touch",
      audio: "Sistema premium 7.1 con subwoofer",
      connectivity: "Ethernet, WiFi, Bluetooth, NFC, 5G",
      certification: "ADM, CE, ISO, Energy Star, RoHS",
    },
  },
  {
    id: 5,
    name: "VLT Gold",
    model: "VLT-GD-2024",
    image: VLT_CARD5,
    price: "€28,900",
    features: ["Design ottagonale", "Grafica 4K", "Jackpot collegato", "Vincite emozionanti"],
    description: {
      it: "Design ottagonale distintivo con grafica 4K e sistema di jackpot collegato per vincite più emozionanti. Esperienza di gioco unica e coinvolgente.",
      en: "Distinctive octagonal design with 4K graphics and linked jackpot system for more exciting wins. Unique and engaging gaming experience.",
      es: "Diseño octogonal distintivo con gráficos 4K y sistema de jackpot vinculado para ganancias más emocionantes. Experiencia de juego única y atractiva.",
    },
    specifications: {
      screen: "32'' 4K OLED Curved",
      audio: "Sistema immersivo 9.1 con vibrazione",
      connectivity: "Ethernet, WiFi 6, Bluetooth 5.0, NFC, 5G",
      certification: "ADM, CE, ISO, Energy Star, RoHS, FCC",
    },
  },
  {
    id: 6,
    name: "VLT Platinum",
    model: "VLT-PT-2024",
    image: VLT_CARD6,
    price: "€35,500",
    features: ["Triplo schermo", "Effetti straordinari", "Comfort ergonomico", "Top di gamma"],
    description: {
      it: "La nostra soluzione top di gamma con triplo schermo, effetti visivi straordinari e comfort ergonomico. L'eccellenza assoluta nel mondo VLT.",
      en: "Our top-of-the-line solution with triple screen, extraordinary visual effects and ergonomic comfort. Absolute excellence in the VLT world.",
      es: "Nuestra solución de gama alta con triple pantalla, efectos visuales extraordinarios y confort ergonómico. Excelencia absoluta en el mundo VLT.",
    },
    specifications: {
      screen: "Triple 27'' 4K OLED + 15'' Control Touch",
      audio: "Sistema cinematografico 11.1 con effetti 3D",
      connectivity: "Ethernet, WiFi 6E, Bluetooth 5.2, NFC, 5G, Satellite",
      certification: "ADM, CE, ISO, Energy Star, RoHS, FCC, UL",
    },
  },
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

export default async function VLTPage({ params }: { params: Params }) {
  const { lang } = await params
  const dict = await getDictionary(lang)

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
            "@id": `https://vitalgames.com/${lang}/vlt/${vlt.model.toLowerCase()}`,
            name: vlt.name,
            model: vlt.model,
            description: vlt.description[lang],
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
              price: vlt.price.replace("€", "").replace(",", ""),
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
                value: vlt.specifications.screen,
              },
              {
                "@type": "PropertyValue",
                name: "Audio",
                value: vlt.specifications.audio,
              },
              {
                "@type": "PropertyValue",
                name: "Connettività",
                value: vlt.specifications.connectivity,
              },
              {
                "@type": "PropertyValue",
                name: "Certificazioni",
                value: vlt.specifications.certification,
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
            subtitle={dict.vlt.hero.description}
            videoUrl="https://files.catbox.moe/pvi9mx.mp4"
          />
        </header>

        <main>
          {/* VLT Collection Section */}
          <div className="min-h-screen bg-black">

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
        </main>
      </div>
    </>
  )
}
