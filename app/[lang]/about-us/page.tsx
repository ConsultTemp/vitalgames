import Image from "next/image"
import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { generateAdvancedSEOMetadata, enhancedCompanyData } from "@/lib/seo-config"
import Script from "next/script"
import SmoothReveal from "@/components/smooth-reveal"
import { Card } from "@/components/ui/card"
import vitalhq from "../../../public/vital-hq.jpeg"
import vitalpres from "../../../public/vitalgames-pres.jpeg"
import iso from "@/public/isologo.svg"
import star from "@/public/star1.png"
import diamond from "@/public/diamante1.png"
import coin from "@/public/coin2.png"
import Partners from "@/components/home/partners"
import VideoHero from "@/components/VideoHero"
import { Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import FloatingImage from "@/components/bg-image-component"
import campana from "../../../public/campana.png"
import diamante from "../../../public/diamond.png"

type Params = Promise<{ lang: Locale }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const params = await props.params

  const aboutUsMetadata = {
    it: {
      title: "Chi Siamo | Vitalgames - Leader Slot Machine dal 1996 | Milano",
      description:
        "Scopri la storia di Vitalgames: dal 1996 leader italiano nella produzione di slot machine, VLT e multigame. Sede a Milano, certificazioni ISO e ADM, oltre 25 anni di innovazione nel gaming.",
      keywords: [
        "chi siamo Vitalgames",
        "storia Vitalgames",
        "azienda slot machine Milano",
        "produttore slot machine dal 1996",
        "certificazioni ISO gaming",
        "ADM slot machine",
        "sede Vitalgames Milano",
        "team Vitalgames",
        "innovazione gaming Italia",
        "leadership slot machine",
        "esperienza gaming 25 anni",
        "qualità slot machine italiana",
      ],
    },
    en: {
      title: "About Us | Vitalgames - Slot Machine Leader since 1996 | Milan",
      description:
        "Discover Vitalgames story: Italian leader in slot machine, VLT and multigame production since 1996. Based in Milan, ISO and ADM certified, over 25 years of gaming innovation.",
      keywords: [
        "about Vitalgames",
        "Vitalgames history",
        "slot machine company Milan",
        "slot machine manufacturer since 1996",
        "ISO gaming certifications",
        "ADM slot machines",
        "Vitalgames headquarters Milan",
        "Vitalgames team",
        "gaming innovation Italy",
        "slot machine leadership",
        "25 years gaming experience",
        "Italian slot machine quality",
      ],
    },
    es: {
      title: "Quiénes Somos | Vitalgames - Líder Máquinas Tragamonedas desde 1996 | Milán",
      description:
        "Descubre la historia de Vitalgames: líder italiano en producción de máquinas tragamonedas, VLT y multijuego desde 1996. Con sede en Milán, certificaciones ISO y ADM, más de 25 años de innovación gaming.",
      keywords: [
        "quiénes somos Vitalgames",
        "historia Vitalgames",
        "empresa máquinas tragamonedas Milán",
        "fabricante máquinas tragamonedas desde 1996",
        "certificaciones ISO gaming",
        "ADM máquinas tragamonedas",
        "sede Vitalgames Milán",
        "equipo Vitalgames",
        "innovación gaming Italia",
        "liderazgo máquinas tragamonedas",
        "experiencia gaming 25 años",
        "calidad máquinas tragamonedas italiana",
      ],
    },
  }

  const currentLangData = aboutUsMetadata[params.lang]

  return generateAdvancedSEOMetadata("about-us", params.lang, {
    title: currentLangData.title,
    description: currentLangData.description,
    keywords: currentLangData.keywords,
    image: "/vitalgames-about-hero.jpg",
    additionalImages: ["/vital-hq.jpeg", "/vitalgames-pres.jpeg", "/vitalgames-team.jpg", "/vitalgames-office.jpg"],
  })
}

export default async function AboutUs(props: { params: Params }) {
  const params = await props.params
  const dictionary = await getDictionary(params.lang)

  const cards = [
    {
      id: 1,
      icon: iso,
      alt: "ISO Certification",
      description: dictionary.aboutUs.cards.iso.description,
    },
    {
      id: 2,
      icon: star,
      alt: "Star Icon",
      description: dictionary.aboutUs.cards.experience.description,
    },
    {
      id: 3,
      icon: diamond,
      alt: "Diamond Icon",
      description: dictionary.aboutUs.cards.games.description,
    },
    {
      id: 4,
      icon: coin,
      alt: "Coin Icon",
      description: dictionary.aboutUs.cards.partners.description,
    },
  ]

  // Generate comprehensive schema for About Us page
  const aboutUsSchema = {
    "@context": "https://schema.org",
    "@graph": [
      // Organization detailed schema
      {
        "@type": "Organization",
        "@id": "https://vitalgames.com/#organization",
        name: enhancedCompanyData.name,
        legalName: enhancedCompanyData.legalName,
        url: "https://vitalgames.com",
        logo: {
          "@type": "ImageObject",
          url: "https://vitalgames.com/logovital.svg",
          width: 300,
          height: 100,
        },
        foundingDate: enhancedCompanyData.foundingYear,
        description: enhancedCompanyData.description[params.lang],
        address: {
          "@type": "PostalAddress",
          streetAddress: enhancedCompanyData.address.streetAddress,
          addressLocality: enhancedCompanyData.address.addressLocality,
          addressRegion: enhancedCompanyData.address.addressRegion,
          postalCode: enhancedCompanyData.address.postalCode,
          addressCountry: enhancedCompanyData.address.addressCountry,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: enhancedCompanyData.geo.latitude,
          longitude: enhancedCompanyData.geo.longitude,
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: enhancedCompanyData.contact.telephone,
            email: enhancedCompanyData.contact.email,
            contactType: "customer service",
            availableLanguage: ["Italian", "English", "Spanish"],
          },
          {
            "@type": "ContactPoint",
            email: enhancedCompanyData.contact.salesEmail,
            contactType: "sales",
            availableLanguage: ["Italian", "English", "Spanish"],
          },
        ],
        sameAs: [
          enhancedCompanyData.social.facebook,
          enhancedCompanyData.social.instagram,
          enhancedCompanyData.social.linkedin,
          enhancedCompanyData.social.youtube,
          enhancedCompanyData.social.twitter,
        ],
        numberOfEmployees: {
          "@type": "QuantitativeValue",
          value: "75",
        },
        naics: enhancedCompanyData.business.naicsCode,
        vatID: enhancedCompanyData.vatNumber,
        award: enhancedCompanyData.business.certifications,
        knowsAbout: [
          "Slot Machine Manufacturing",
          "VLT Production",
          "Gaming Equipment",
          "Casino Technology",
          "AWP Systems",
          "Multigame Development",
          "Gaming Software",
          "Hardware Design",
        ],
        areaServed: {
          "@type": "Place",
          name: "Europe",
        },
        serviceArea: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: enhancedCompanyData.geo.latitude,
            longitude: enhancedCompanyData.geo.longitude,
          },
          geoRadius: "2000000", // 2000km radius
        },
      },
      // AboutPage schema
      {
        "@type": "AboutPage",
        "@id": `https://vitalgames.com/${params.lang}/about-us#aboutpage`,
        url: `https://vitalgames.com/${params.lang}/about-us`,
        name:
          params.lang === "it"
            ? "Chi Siamo - Vitalgames"
            : params.lang === "en"
              ? "About Us - Vitalgames"
              : "Quiénes Somos - Vitalgames",
        description: enhancedCompanyData.description[params.lang],
        mainEntity: {
          "@id": "https://vitalgames.com/#organization",
        },
        inLanguage: params.lang === "it" ? "it-IT" : params.lang === "en" ? "en-US" : "es-ES",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://vitalgames.com/#website",
        },
      },
      // Company history as CreativeWork
      {
        "@type": "CreativeWork",
        "@id": `https://vitalgames.com/${params.lang}/about-us#history`,
        name:
          params.lang === "it"
            ? "Storia di Vitalgames"
            : params.lang === "en"
              ? "Vitalgames History"
              : "Historia de Vitalgames",
        description:
          params.lang === "it"
            ? "La storia di Vitalgames dal 1996 ad oggi: 25+ anni di innovazione nel settore gaming"
            : params.lang === "en"
              ? "Vitalgames history from 1996 to today: 25+ years of innovation in gaming industry"
              : "Historia de Vitalgames desde 1996 hasta hoy: 25+ años de innovación en la industria gaming",
        author: {
          "@id": "https://vitalgames.com/#organization",
        },
        dateCreated: "1996-01-01",
        dateModified: new Date().toISOString().split("T")[0],
        keywords:
          params.lang === "it"
            ? "storia Vitalgames, innovazione gaming, leadership slot machine"
            : params.lang === "en"
              ? "Vitalgames history, gaming innovation, slot machine leadership"
              : "historia Vitalgames, innovación gaming, liderazgo máquinas tragamonedas",
      },
      // FAQ Schema for common questions
      {
        "@type": "FAQPage",
        "@id": `https://vitalgames.com/${params.lang}/about-us#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name:
              params.lang === "it"
                ? "Da quando esiste Vitalgames?"
                : params.lang === "en"
                  ? "Since when does Vitalgames exist?"
                  : "¿Desde cuándo existe Vitalgames?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                params.lang === "it"
                  ? "Vitalgames è stata fondata nel 1996 e da allora è leader nella produzione di slot machine, VLT e sistemi multigame in Italia."
                  : params.lang === "en"
                    ? "Vitalgames was founded in 1996 and has since been a leader in the production of slot machines, VLTs and multigame systems in Italy."
                    : "Vitalgames fue fundada en 1996 y desde entonces ha sido líder en la producción de máquinas tragamonedas, VLTs y sistemas multijuego en Italia.",
            },
          },
          {
            "@type": "Question",
            name:
              params.lang === "it"
                ? "Dove ha sede Vitalgames?"
                : params.lang === "en"
                  ? "Where is Vitalgames headquartered?"
                  : "¿Dónde tiene su sede Vitalgames?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                params.lang === "it"
                  ? "Vitalgames ha sede a Milano, in Lombardia, Italia. Da qui serviamo clienti in tutta Europa."
                  : params.lang === "en"
                    ? "Vitalgames is headquartered in Milan, Lombardy, Italy. From here we serve customers throughout Europe."
                    : "Vitalgames tiene su sede en Milán, Lombardía, Italia. Desde aquí servimos a clientes en toda Europa.",
            },
          },
          {
            "@type": "Question",
            name:
              params.lang === "it"
                ? "Che certificazioni ha Vitalgames?"
                : params.lang === "en"
                  ? "What certifications does Vitalgames have?"
                  : "¿Qué certificaciones tiene Vitalgames?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                params.lang === "it"
                  ? "Vitalgames possiede certificazioni ISO 9001, ADM (Agenzia delle Dogane e dei Monopoli) e marcatura CE per garantire la massima qualità e conformità normativa."
                  : params.lang === "en"
                    ? "Vitalgames holds ISO 9001, ADM (Customs and Monopolies Agency) and CE marking certifications to ensure maximum quality and regulatory compliance."
                    : "Vitalgames posee certificaciones ISO 9001, ADM (Agencia de Aduanas y Monopolios) y marcado CE para garantizar la máxima calidad y cumplimiento normativo.",
            },
          },
        ],
      },
    ],
  }

  return (
    <>
      {/* Advanced Structured Data */}
      <Script
        id="about-us-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutUsSchema),
        }}
      />

      {/* Breadcrumb Schema */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `https://vitalgames.com/${params.lang}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: params.lang === "it" ? "Chi Siamo" : params.lang === "en" ? "About Us" : "Quiénes Somos",
                item: `https://vitalgames.com/${params.lang}/about-us`,
              },
            ],
          }),
        }}
      />

      <div className="relative">
        <VideoHero title={""} subtitle={""} videoUrl="https://files.catbox.moe/mggdk0.webm" />

        {/* First Section */}
        <section className="relative min-h-screen overflow-visible pt-8">
          <div className="relative z-10 py-32 container mx-auto px-4">
            <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none overflow-visible">
              {/* Bottom left large diamond */}
              <div className="absolute top-0  w-96 md:w-96 h-96 md:h-96 left-0 animate-float-slow rotate-10">
                <FloatingImage
                  src={campana || "/placeholder.svg"}
                  alt="Gaming Bell Symbol"
                  className="w-[160px] md:w-[384px] h-[160px] md:h-[384px]"
                />
              </div>
              <div className="absolute bottom-0  w-96 md:w-96 h-96 md:h-96 right-24 animate-float-slow rotate-10">
                <FloatingImage
                  src={diamante || "/placeholder.svg"}
                  alt="Gaming Diamond Symbol"
                  className="w-[160px] md:w-[384px] h-[160px] md:h-[384px]"
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <SmoothReveal>
                <h1 className="text-8xl font-bold mb-12 text-center flex flex-col items-center">
                  <span className="dharma">{dictionary.aboutUs.title}</span>
                </h1>
              </SmoothReveal>

              <SmoothReveal className="max-w-4xl mx-auto mb-12">
                <p
                  className="text-center text-sm font-light"
                  dangerouslySetInnerHTML={{ __html: dictionary.aboutUs.description }}
                />
              </SmoothReveal>

              <div className="flex flex-col md:flex-row gap-8">
                <SmoothReveal className="p-6 rounded-lg border border-1 border-gray-800 backdrop-blur-md">
                  <Image
                    src={vitalhq || "/placeholder.svg"}
                    alt="Vitalgames Headquarters in Milan - Modern gaming equipment manufacturing facility"
                    width={500}
                    height={500}
                    className="rounded-lg object-cover aspect-square"
                    priority
                  />
                </SmoothReveal>

                <SmoothReveal className="p-6 rounded-lg border border-1 border-gray-800 backdrop-blur-md">
                  <Image
                    src={vitalpres || "/placeholder.svg"}
                    alt="Vitalgames Presentation - Showcasing innovative slot machine and VLT technology"
                    width={500}
                    height={500}
                    className="rounded-lg object-cover aspect-square"
                    priority
                  />
                </SmoothReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Winning Technology Section */}
        <section className="technology-bg" aria-labelledby="technology-section">
          <div className="flex min-h-screen flex-col items-center justify-center py-8 px-2 md:px-3">
            <div className="max-w-6xl w-full flex flex-col items-center text-center">
              <h2 id="technology-section" className="sr-only">
                {params.lang === "it"
                  ? "Tecnologia e Innovazione"
                  : params.lang === "en"
                    ? "Technology and Innovation"
                    : "Tecnología e Innovación"}
              </h2>

              {/* Three paragraphs */}
              <div className="space-y-6 mb-12 max-w-2xl">
                <p
                  className="text-xs md:text-sm text-white"
                  dangerouslySetInnerHTML={{ __html: dictionary.aboutUs.description }}
                />
                <p
                  className="text-xs md:text-sm text-white"
                  dangerouslySetInnerHTML={{ __html: dictionary.aboutUs.philosophy.description }}
                />
                <p
                  className="text-xs md:text-sm text-white"
                  dangerouslySetInnerHTML={{ __html: dictionary.aboutUs.presence.description }}
                />
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-1.5 w-full">
                {cards.map((card) => (
                  <article key={card.id} className="aspect-[5/3]">
                    <Card className="h-full w-full flex flex-col items-center justify-center text-center p-4 bg-white/5 backdrop-blur-sm border-0 text-white">
                      <div className="h-14 sm:h-16 mb-3">
                        <Image
                          src={card.icon || "/placeholder.svg"}
                          alt={card.alt}
                          width={60}
                          height={60}
                          className="object-contain h-full w-auto"
                        />
                      </div>
                      <p className="text-xs sm:text-sm" dangerouslySetInnerHTML={{ __html: card.description }} />
                    </Card>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Partners />

        {/* Contact Section */}
        <section className="relative min-h-screen contact-bg" aria-labelledby="contact-section">
          <div className="container mx-auto px-4 py-48 relative z-10">
            <div className="grid md:grid-cols-5 gap-8 max-w-6xl mx-auto">
              {/* Left Side - Contact Information */}
              <aside className="bg-white/5 backdrop-blur-sm rounded-sm p-8 h-full md:col-span-2">
                <div className="space-y-8">
                  <SmoothReveal className="mb-8">
                    <h2 id="contact-section" className="text-4xl md:text-6xl font-bold text-white dharma mb-4">
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
                <SmoothReveal className="mb-8">
                  <h2 className="text-4xl md:text-6xl font-bold text-white dharma mb-4">{dictionary.contact.title}</h2>
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
      </div>
    </>
  )
}
