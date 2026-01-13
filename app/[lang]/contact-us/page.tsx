import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { generateAdvancedSEOMetadata, enhancedCompanyData } from "@/lib/seo-config"
import Script from "next/script"
import SecureContactForm from "@/components/contact/secure-form"
import { PageTransitionOverlay } from "@/components/page-transition-overlay"

type Params = Promise<{ lang: Locale }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const params = await props.params

  const contactMetadata = {
    it: {
      title: "Contatti Vitalgames | Produttore Slot Machine Milano | Assistenza Clienti",
      description:
        "Contatta Vitalgames, leader nella produzione di slot machine dal 1996. Sede a Milano, assistenza clienti dedicata, supporto tecnico specializzato per AWP, VLT e multigames.",
      keywords: [
        "contatti Vitalgames",
        "Vitalgames Milano",
        "sede Vitalgames",
        "telefono Vitalgames",
        "email Vitalgames",
        "assistenza clienti Vitalgames",
        "supporto tecnico slot machine",
        "produttore slot machine Milano",
      ],
    },
    en: {
      title: "Contact Vitalgames | Slot Machine Manufacturer Milan | Customer Support",
      description:
        "Contact Vitalgames, leader in slot machine production since 1996. Based in Milan, dedicated customer service, specialized technical support for AWP, VLT and multigames.",
      keywords: [
        "Vitalgames contact",
        "Vitalgames Milan",
        "Vitalgames headquarters",
        "Vitalgames phone",
        "Vitalgames email",
        "Vitalgames customer service",
        "slot machine technical support",
        "slot machine manufacturer Milan",
      ],
    },
    es: {
      title: "Contacto Vitalgames | Fabricante Máquinas Tragamonedas Milán | Soporte Cliente",
      description:
        "Contacta Vitalgames, líder en producción de máquinas tragamonedas desde 1996. Con sede en Milán, servicio al cliente dedicado, soporte técnico especializado para AWP, VLT y multijuegos.",
      keywords: [
        "contacto Vitalgames",
        "Vitalgames Milán",
        "sede Vitalgames",
        "teléfono Vitalgames",
        "email Vitalgames",
        "servicio cliente Vitalgames",
        "soporte técnico máquinas tragamonedas",
        "fabricante máquinas tragamonedas Milán",
      ],
    },
  }

  const currentLangData = contactMetadata[params.lang]

  return generateAdvancedSEOMetadata("contact", params.lang, {
    title: currentLangData.title,
    description: currentLangData.description,
    keywords: currentLangData.keywords,
    image: "/vitalgames-contact-hero.jpg",
  })
}

export default async function ContactUs(props: { params: Params }) {
  const params = await props.params
  const dictionary = await getDictionary(params.lang)

  // Generate ContactPage schema
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `https://www.vitalgamesdigital.com/${params.lang}/contact-us#contactpage`,
        url: `https://www.vitalgamesdigital.com/${params.lang}/contact-us`,
        name:
          params.lang === "it"
            ? "Contatti - Vitalgames"
            : params.lang === "en"
              ? "Contact Us - Vitalgames"
              : "Contacto - Vitalgames",
        description: (dictionary as any).contactForm?.title || "Contact Vitalgames",
        mainEntity: {
          "@id": "https://www.vitalgamesdigital.com/#organization",
        },
        inLanguage: params.lang === "it" ? "it-IT" : params.lang === "en" ? "en-US" : "es-ES",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.vitalgamesdigital.com/#website",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://www.vitalgamesdigital.com/#organization",
        name: enhancedCompanyData.name,
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
        address: {
          "@type": "PostalAddress",
          streetAddress: enhancedCompanyData.address.streetAddress,
          addressLocality: enhancedCompanyData.address.addressLocality,
          addressRegion: enhancedCompanyData.address.addressRegion,
          postalCode: enhancedCompanyData.address.postalCode,
          addressCountry: enhancedCompanyData.address.addressCountry,
        },
      },
    ],
  }

  return (
    <>
      {/* Structured Data */}
      <Script
        id="contact-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema),
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
                item: `https://www.vitalgamesdigital.com/${params.lang}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name:
                  params.lang === "it"
                    ? "Contatti"
                    : params.lang === "en"
                      ? "Contact Us"
                      : "Contacto",
                item: `https://www.vitalgamesdigital.com/${params.lang}/contact-us`,
              },
            ],
          }),
        }}
      />
      <PageTransitionOverlay />

      <div className="relative bg-black min-h-screen overflow-x-hidden">
        <SecureContactForm lang={params.lang} />
      </div>
    </>
  )
}

