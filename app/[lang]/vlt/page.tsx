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
            videoUrl="ab514172f1d524215552f7b53c87ef8f"
            mobileVideoUrl="2ec336e25d6e7e2b5867ecdb8b2ebed0"
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
                    <h3 className="text-lg font-bold text-white text-center">{card.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Contact Section */}
          <section className="relative min-h-screen contact-bg" aria-labelledby="contact-section">
            <div className="container mx-auto px-4 py-12 md:py-24 lg:py-48 relative z-10">
              <div className="grid md:grid-cols-5 gap-8 max-w-6xl mx-auto">
                {/* Left Side - Contact Information */}
                <aside className="bg-white/5 backdrop-blur-sm rounded-sm p-8 h-full md:col-span-2">
                  <div className="space-y-8">
                    <SmoothReveal className="mb-4 md:mb-8">
                      <h2 id="contact-section" className="text-4xl md:text-6xl font-bold text-white dharma mb-2 md:mb-4">
                        {params.lang === "it"
                          ? "I nostri contatti"
                          : params.lang === "en"
                            ? "Our contacts"
                            : "Nuestros contactos"}
                      </h2>
                    </SmoothReveal>

                    <SmoothReveal>
                      <div className="flex items-center space-x-4">
                        <Phone className="text-white" size={20} aria-hidden="true" />
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-white font-semibold">{dictionary.contact.info.phone.title}</h3>
                          </div>
                          <p className="text-gray-300 text-sm">{dictionary.contact.info.phone.value}</p>
                        </div>
                      </div>
                    </SmoothReveal>

                    <SmoothReveal>
                      <div className="flex items-center space-x-4">
                        <Mail className="text-white" size={20} aria-hidden="true" />
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-white font-semibold">{dictionary.contact.info.email.title}</h3>
                          </div>
                          <p className="text-gray-300 text-sm">{dictionary.contact.info.email.value}</p>
                        </div>
                      </div>
                    </SmoothReveal>

                    <SmoothReveal>
                      <div className="flex items-center space-x-4">
                        <MapPin className="text-white" size={20} aria-hidden="true" />
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-white font-semibold">{dictionary.contact.info.address.title}</h3>
                          </div>
                          <p className="text-gray-300 text-sm">{dictionary.contact.info.address.value}</p>
                        </div>
                      </div>
                    </SmoothReveal>
                  </div>
                </aside>

                {/* Right Side - Title and Form */}
                <div className="flex flex-col h-full md:col-span-3">
                  <SmoothReveal className="mt-2 md:mt-8">
                    <h2 className="text-4xl md:text-6xl font-bold text-white dharma mb-t md:mt-4">{dictionary.contact.title}</h2>
                  </SmoothReveal>

                  <SmoothReveal className="flex-grow">
                    <form
                      action="https://formsubmit.co/info@vitalgames.com"
                      method="POST"
                      className="space-y-6"
                      aria-label={
                        params.lang === "it"
                          ? "Modulo di contatto"
                          : params.lang === "en"
                            ? "Contact form"
                            : "Formulario de contacto"
                      }
                    >
                      <input type="hidden" name="_captcha" value="false" />
                      <input type="hidden" name="_next" value={`https://vitalgames.com/${params.lang}/thank-you`} />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-white mb-2">
                            {dictionary.contact.form.name.label}
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder={dictionary.contact.form.name.placeholder}
                            className="w-full px-4 py-2 bg-white/5 backdrop-blur-sm border border-white rounded-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            aria-describedby="name-help"
                          />
                          <span id="name-help" className="sr-only">
                            {params.lang === "it"
                              ? "Inserisci il tuo nome completo"
                              : params.lang === "en"
                                ? "Enter your full name"
                                : "Ingresa tu nombre completo"}
                          </span>
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-white mb-2">
                            {dictionary.contact.info.email.title}
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder={dictionary.contact.form.email.placeholder}
                            className="w-full px-4 py-2 bg-white/5 backdrop-blur-sm border border-white rounded-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            aria-describedby="email-help"
                          />
                          <span id="email-help" className="sr-only">
                            {params.lang === "it"
                              ? "Inserisci un indirizzo email valido"
                              : params.lang === "en"
                                ? "Enter a valid email address"
                                : "Ingresa una dirección de email válida"}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-white mb-2">
                          {dictionary.contact.form.message.label}
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          placeholder={dictionary.contact.form.message.placeholder}
                          className="w-full px-4 py-2 bg-white/5 backdrop-blur-sm border border-white rounded-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          aria-describedby="message-help"
                        ></textarea>
                        <span id="message-help" className="sr-only">
                          {params.lang === "it"
                            ? "Descrivi la tua richiesta o domanda"
                            : params.lang === "en"
                              ? "Describe your request or question"
                              : "Describe tu solicitud o pregunta"}
                        </span>
                      </div>

                      <Button
                        type="submit"
                        variant="vitalYellow"
                        className="w-full bg-vitalYellow text-black hover:opacity-90 focus:ring-2 focus:ring-yellow-400"
                      >
                        {dictionary.contact.form.submit}
                      </Button>
                    </form>
                  </SmoothReveal>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}