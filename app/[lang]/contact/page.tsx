import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { generateAdvancedSEOMetadata } from "@/lib/seo-config"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import SmoothReveal from "@/components/smooth-reveal"
import { Button } from "@/components/ui/button"

type Params = Promise<{ lang: Locale }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)

  // Default to English if the language is not supported
  const supportedLang = ["en", "it", "es"].includes(lang) ? lang : "en"

  const titles = {
    it: "Contatti Vitalgames | Produttore Slot Machine Milano | Assistenza Clienti",
    en: "Contact Vitalgames | Slot Machine Manufacturer Milan | Customer Support",
    es: "Contacto Vitalgames | Fabricante Máquinas Tragamonedas Milán | Soporte Cliente",
  }

  const descriptions = {
    it: "Contatta Vitalgames, leader nella produzione di slot machine dal 1996. Sede a Milano, assistenza clienti dedicata, supporto tecnico specializzato per AWP, VLT e multigames. Richiedi informazioni sui nostri prodotti.",
    en: "Contact Vitalgames, leader in slot machine production since 1996. Based in Milan, dedicated customer service, specialized technical support for AWP, VLT and multigames. Request information about our products.",
    es: "Contacta Vitalgames, líder en producción de máquinas tragamonedas desde 1996. Con sede en Milán, servicio al cliente dedicado, soporte técnico especializado para AWP, VLT y multijuegos. Solicita información sobre nuestros productos.",
  }

  const keywords = {
    it: [
      "contatti Vitalgames",
      "Vitalgames Milano",
      "sede Vitalgames",
      "telefono Vitalgames",
      "email Vitalgames",
      "assistenza clienti Vitalgames",
      "supporto tecnico slot machine",
      "produttore slot machine Milano",
      "contatti produttore AWP",
      "assistenza VLT Italia",
      "supporto multigames",
      "Vitalgames Lombardia",
      "richiesta informazioni slot machine",
      "preventivo slot machine",
      "assistenza post vendita gaming",
      "supporto tecnico cabinet",
      "manutenzione slot machine Milano",
      "ricambi slot machine Italia",
    ],
    en: [
      "Vitalgames contact",
      "Vitalgames Milan",
      "Vitalgames headquarters",
      "Vitalgames phone",
      "Vitalgames email",
      "Vitalgames customer service",
      "slot machine technical support",
      "slot machine manufacturer Milan",
      "AWP manufacturer contact",
      "VLT support Italy",
      "multigames support",
      "Vitalgames Lombardy",
      "slot machine information request",
      "slot machine quote",
      "gaming after-sales support",
      "cabinet technical support",
      "slot machine maintenance Milan",
      "slot machine parts Italy",
    ],
    es: [
      "contacto Vitalgames",
      "Vitalgames Milán",
      "sede Vitalgames",
      "teléfono Vitalgames",
      "email Vitalgames",
      "servicio cliente Vitalgames",
      "soporte técnico máquinas tragamonedas",
      "fabricante máquinas tragamonedas Milán",
      "contacto fabricante AWP",
      "soporte VLT Italia",
      "soporte multijuegos",
      "Vitalgames Lombardía",
      "solicitud información máquinas tragamonedas",
      "cotización máquinas tragamonedas",
      "soporte postventa gaming",
      "soporte técnico cabinas",
      "mantenimiento máquinas tragamonedas Milán",
      "repuestos máquinas tragamonedas Italia",
    ],
  }

  // Ensure we have valid data for the supported language
  const title = titles[supportedLang] || titles.en
  const description = descriptions[supportedLang] || descriptions.en
  const keywordsList = keywords[supportedLang] || keywords.en

  return generateAdvancedSEOMetadata("contact", supportedLang, {
    title,
    description,
    keywords: keywordsList,
    image: "/contact-vitalgames-milano.jpg",
    additionalImages: ["/vitalgames-sede-milano.jpg", "/vitalgames-team-support.jpg"],
  })
}

export default async function ContactPage({ params }: { params: Params }) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  // Comprehensive JSON-LD for contact page
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // Main organization with detailed contact info
      {
        "@type": "Organization",
        "@id": "https://vitalgames.com/#organization",
        name: "Vitalgames S.r.l.",
        legalName: "Vitalgames S.r.l.",
        url: "https://vitalgames.com",
        logo: "https://vitalgames.com/logo.png",
        foundingDate: "1996",
        description:
          "Leading Italian manufacturer of slot machines, VLTs and multigame systems since 1996. Specialized in AWP, VLT and online gaming solutions.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Via Milano, 123",
          addressLocality: "Milano",
          addressRegion: "MI",
          postalCode: "20100",
          addressCountry: "IT",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "45.4642",
          longitude: "9.1900",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+39 02 1234567",
            contactType: "customer service",
            areaServed: "IT",
            availableLanguage: ["Italian", "English", "Spanish"],
            hoursAvailable: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "09:00",
              closes: "18:00",
            },
          },
          {
            "@type": "ContactPoint",
            email: "info@vitalgames.com",
            contactType: "customer service",
            areaServed: "IT",
          },
          {
            "@type": "ContactPoint",
            email: "sales@vitalgames.com",
            contactType: "sales",
            areaServed: ["IT", "EU"],
          },
          {
            "@type": "ContactPoint",
            email: "support@vitalgames.com",
            contactType: "technical support",
            areaServed: ["IT", "EU"],
          },
        ],
        sameAs: [
          "https://www.facebook.com/vitalgames",
          "https://www.instagram.com/vitalgames_official",
          "https://www.linkedin.com/company/vitalgames",
        ],
        makesOffer: {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Slot Machine Systems",
            category: "Gaming Equipment",
          },
        },
      },
      // Contact page schema
      {
        "@type": "ContactPage",
        "@id": `https://vitalgames.com/${lang}/contact#page`,
        url: `https://vitalgames.com/${lang}/contact`,
        name: dict.contact.title,
        description: dict.contact.subtitle,
        inLanguage: lang,
        isPartOf: {
          "@id": "https://vitalgames.com/#website",
        },
        mainEntity: {
          "@id": "https://vitalgames.com/#organization",
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
              name: dict.contact.title,
              item: `https://vitalgames.com/${lang}/contact`,
            },
          ],
        },
      },
      // FAQ Schema for common questions
      {
        "@type": "FAQPage",
        "@id": `https://vitalgames.com/${lang}/contact#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Dove si trova la sede di Vitalgames?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "La sede principale di Vitalgames si trova a Milano, in Via Milano 123, 20100 Milano (MI), Italia.",
            },
          },
          {
            "@type": "Question",
            name: "Quali sono gli orari di assistenza clienti?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Il nostro servizio clienti è disponibile dal lunedì al venerdì dalle 9:00 alle 18:00. Per emergenze tecniche offriamo supporto 24/7.",
            },
          },
          {
            "@type": "Question",
            name: "Come posso richiedere assistenza tecnica?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Puoi contattare il nostro supporto tecnico via email a support@vitalgames.com o telefonicamente al +39 02 1234567.",
            },
          },
          {
            "@type": "Question",
            name: "Vitalgames offre servizi di manutenzione?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sì, offriamo servizi completi di manutenzione, assistenza post-vendita e fornitura ricambi per tutti i nostri prodotti.",
            },
          },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="relative min-h-screen cabinet-bg">
        <div className="container mx-auto px-4 py-48 relative z-10">
          <div className="max-w-6xl mx-auto bg-black/50 rounded-sm p-8 backdrop-blur-sm">
            <header className="text-center mb-12">
              <SmoothReveal>
                <h1 className="text-4xl md:text-6xl font-bold text-white dharma mb-4">{dict.contact.title}</h1>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">{dict.contact.subtitle}</p>
              </SmoothReveal>
            </header>

            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Information */}
              <section className="lg:col-span-1 space-y-8" aria-labelledby="contact-info-heading">
                <h2 id="contact-info-heading" className="text-2xl font-bold text-white mb-6">
                  Informazioni di Contatto
                </h2>

                <SmoothReveal>
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                    <div className="flex items-start space-x-4">
                      <Phone className="w-6 h-6 text-vitalYellow mt-1 flex-shrink-0" aria-hidden="true" />
                      <div>
                        <h3 className="text-white font-semibold mb-2">{dict.contact.info.phone.title}</h3>
                        <p className="text-gray-300 text-sm mb-2">
                          <a
                            href={`tel:${dict.contact.info.phone.value}`}
                            className="hover:text-vitalYellow transition-colors"
                            aria-label={`Chiama ${dict.contact.info.phone.value}`}
                          >
                            {dict.contact.info.phone.value}
                          </a>
                        </p>
                        <p className="text-gray-400 text-xs">Lun-Ven: 9:00-18:00</p>
                      </div>
                    </div>
                  </div>
                </SmoothReveal>

                <SmoothReveal>
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                    <div className="flex items-start space-x-4">
                      <Mail className="w-6 h-6 text-vitalYellow mt-1 flex-shrink-0" aria-hidden="true" />
                      <div>
                        <h3 className="text-white font-semibold mb-2">{dict.contact.info.email.title}</h3>
                        <div className="space-y-1">
                          <p className="text-gray-300 text-sm">
                            <a
                              href={`mailto:${dict.contact.info.email.value}`}
                              className="hover:text-vitalYellow transition-colors"
                              aria-label={`Invia email a ${dict.contact.info.email.value}`}
                            >
                              {dict.contact.info.email.value}
                            </a>
                          </p>
                          <p className="text-gray-300 text-sm">
                            <a
                              href="mailto:sales@vitalgames.com"
                              className="hover:text-vitalYellow transition-colors"
                              aria-label="Invia email al reparto vendite"
                            >
                              sales@vitalgames.com
                            </a>
                            <span className="text-gray-400 text-xs block">Vendite</span>
                          </p>
                          <p className="text-gray-300 text-sm">
                            <a
                              href="mailto:support@vitalgames.com"
                              className="hover:text-vitalYellow transition-colors"
                              aria-label="Invia email al supporto tecnico"
                            >
                              support@vitalgames.com
                            </a>
                            <span className="text-gray-400 text-xs block">Supporto Tecnico</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SmoothReveal>

                <SmoothReveal>
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                    <div className="flex items-start space-x-4">
                      <MapPin className="w-6 h-6 text-vitalYellow mt-1 flex-shrink-0" aria-hidden="true" />
                      <div>
                        <h3 className="text-white font-semibold mb-2">{dict.contact.info.address.title}</h3>
                        <address className="text-gray-300 text-sm not-italic">
                          {dict.contact.info.address.value}
                          <br />
                          20100 Milano (MI), Italia
                        </address>
                      </div>
                    </div>
                  </div>
                </SmoothReveal>

                <SmoothReveal>
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                    <div className="flex items-start space-x-4">
                      <Clock className="w-6 h-6 text-vitalYellow mt-1 flex-shrink-0" aria-hidden="true" />
                      <div>
                        <h3 className="text-white font-semibold mb-2">Orari di Apertura</h3>
                        <div className="text-gray-300 text-sm space-y-1">
                          <p>Lunedì - Venerdì: 9:00 - 18:00</p>
                          <p>Sabato - Domenica: Chiuso</p>
                          <p className="text-vitalYellow text-xs mt-2">Supporto tecnico 24/7 per emergenze</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SmoothReveal>
              </section>

              {/* Contact Form */}
              <section className="lg:col-span-2" aria-labelledby="contact-form-heading">
                <h2 id="contact-form-heading" className="text-2xl font-bold text-white mb-6">
                  Invia un Messaggio
                </h2>

                <SmoothReveal>
                  <form
                    action="https://formsubmit.co/info@vitalgames.com"
                    method="POST"
                    className="space-y-6"
                    noValidate
                  >
                    {/* Hidden fields for FormSubmit */}
                    <input type="hidden" name="_subject" value="Nuovo messaggio dal sito Vitalgames" />
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_template" value="table" />

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-white mb-2 font-medium">
                          {dict.contact.form.name.label} *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          placeholder={dict.contact.form.name.placeholder}
                          className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vitalYellow focus:border-transparent transition-all"
                          aria-describedby="name-error"
                        />
                        <div id="name-error" className="text-red-400 text-sm mt-1 hidden" role="alert">
                          Il nome è obbligatorio
                        </div>
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-white mb-2 font-medium">
                          Azienda
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          placeholder="Nome della tua azienda"
                          className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vitalYellow focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-white mb-2 font-medium">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder="tua.email@esempio.com"
                          className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vitalYellow focus:border-transparent transition-all"
                          aria-describedby="email-error"
                        />
                        <div id="email-error" className="text-red-400 text-sm mt-1 hidden" role="alert">
                          Inserisci un'email valida
                        </div>
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-white mb-2 font-medium">
                          {dict.contact.info.phone.title}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="+39 123 456 7890"
                          className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vitalYellow focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-white mb-2 font-medium">
                        Oggetto *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-vitalYellow focus:border-transparent transition-all"
                        aria-describedby="subject-error"
                      >
                        <option value="">Seleziona un argomento</option>
                        <option value="Informazioni prodotti">Informazioni sui prodotti</option>
                        <option value="Richiesta preventivo">Richiesta preventivo</option>
                        <option value="Supporto tecnico">Supporto tecnico</option>
                        <option value="Assistenza post-vendita">Assistenza post-vendita</option>
                        <option value="Partnership">Opportunità di partnership</option>
                        <option value="Altro">Altro</option>
                      </select>
                      <div id="subject-error" className="text-red-400 text-sm mt-1 hidden" role="alert">
                        Seleziona un oggetto
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-white mb-2 font-medium">
                        {dict.contact.form.message.label} *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        placeholder={dict.contact.form.message.placeholder}
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vitalYellow focus:border-transparent transition-all resize-vertical"
                        aria-describedby="message-error"
                      ></textarea>
                      <div id="message-error" className="text-red-400 text-sm mt-1 hidden" role="alert">
                        Il messaggio è obbligatorio
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="privacy"
                        name="privacy"
                        required
                        className="mt-1 w-4 h-4 text-vitalYellow bg-transparent border-white/20 rounded focus:ring-vitalYellow focus:ring-2"
                        aria-describedby="privacy-error"
                      />
                      <label htmlFor="privacy" className="text-gray-300 text-sm">
                        Accetto il trattamento dei dati personali secondo la{" "}
                        <a href={`/${lang}/privacy`} className="text-vitalYellow hover:underline">
                          Privacy Policy
                        </a>{" "}
                        *
                      </label>
                      <div id="privacy-error" className="text-red-400 text-sm mt-1 hidden" role="alert">
                        Devi accettare la privacy policy
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-vitalYellow text-black hover:bg-vitalYellow/90 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                      aria-describedby="submit-help"
                    >
                      {dict.contact.form.submit}
                    </Button>
                    <p id="submit-help" className="text-gray-400 text-sm text-center">
                      Ti risponderemo entro 24 ore lavorative
                    </p>
                  </form>
                </SmoothReveal>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
