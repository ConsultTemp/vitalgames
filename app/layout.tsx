import type React from "react"
import { Inter } from 'next/font/google'
import "./globals.css"
import type { Metadata } from "next"
import { i18n } from "@/i18n-config"
import { enhancedCompanyData, generateComprehensiveSchema, gameKeywords } from "@/lib/seo-config"
import Script from "next/script"
import IntroVideo from "./components/IntroVideo"

const inter = Inter({ subsets: ["latin"], display: "swap", preload: true })

export const metadata: Metadata = {
  title: {
    default: "Vitalgames | Produttore Leader Slot Machine, VLT e Multigame dal 1996",
    template: "%s | Vitalgames - Leader Gaming Equipment Italia",
  },
  description: "🎰 Dal 1996, Vitalgames è il leader italiano nella produzione di slot machine, VLT e sistemi multigame. Soluzioni certificate ADM per bar, sale giochi e casinò. Sede Milano. ✅ Qualità garantita",
  keywords: [
    // Primary keywords
    "slot machine",
    "VLT",
    "AWP", 
    "multigame",
    "produttore slot machine",
    "slot machine Italia",
    "giochi da casinò",
    "macchinette da gioco",
    "cabinet slot",
    "gaming equipment",
    // Location-specific
    "slot machine Milano",
    "produttore slot machine Italia", 
    "VLT Italia",
    "slot machine Lombardia",
    // Brand-specific
    "Vitalgames",
    "slot machine certificate ADM",
    "slot machine legali Italia",
    // Product-specific
    "cabinet VLT",
    "AWP multigame",
    "slot machine bar",
    "slot machine sala giochi",
    // Technical
    "produzione slot machine",
    "gaming machines manufacturer",
    "casino equipment Italy"
  ],
  authors: [
    { name: "Vitalgames", url: "https://vitalgames.com" },
    { name: "Vitalgames Team" },
    { name: "Gaming Equipment Experts" }
  ],
  creator: "Vitalgames S.r.l.",
  publisher: "Vitalgames S.r.l.",
  generator: "Next.js - Vitalgames",
  applicationName: "Vitalgames",
  referrer: "origin-when-cross-origin",
  category: "Gaming Equipment Manufacturing",
  classification: "Business",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://vitalgames.com"),
  alternates: {
    canonical: "https://vitalgames.com",
    languages: {
      "it-IT": "https://vitalgames.com/it",
      "en-US": "https://vitalgames.com/en", 
      "es-ES": "https://vitalgames.com/es",
      "x-default": "https://vitalgames.com/it",
    },
    types: {
      "application/rss+xml": "https://vitalgames.com/rss.xml",
    },
  },
  openGraph: {
    title: "Vitalgames | Leader Produzione Slot Machine, VLT e Multigame dal 1996",
    description: "🎰 Dal 1996, Vitalgames è il leader italiano nella produzione di slot machine, VLT e sistemi multigame. Soluzioni certificate ADM per bar, sale giochi e casinò. Sede Milano.",
    url: "https://vitalgames.com",
    siteName: "Vitalgames",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "https://vitalgames.com/images/og-vitalgames-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Vitalgames - Leader Slot Machine Italia dal 1996",
        type: "image/jpeg",
      },
      {
        url: "https://vitalgames.com/images/og-vitalgames-logo.png", 
        width: 800,
        height: 600,
        alt: "Vitalgames Logo - Produttore Slot Machine",
        type: "image/png",
      },
      {
        url: "https://vitalgames.com/images/og-vitalgames-products.jpg",
        width: 1200,
        height: 630, 
        alt: "Slot Machine VLT AWP Multigame Vitalgames",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitalgames | Leader Slot Machine Italia dal 1996",
    description: "🎰 Produttore leader di slot machine, VLT e multigame. Soluzioni certificate ADM per bar, sale giochi e casinò. Milano.",
    images: ["https://vitalgames.com/images/twitter-vitalgames-hero.jpg"],
    creator: "@VitalgamesOfficial",
    site: "@VitalgamesOfficial",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    }
  },
  verification: {
    google: "vitalgames-google-verification-code",
    yandex: "vitalgames-yandex-verification-code", 
    yahoo: "vitalgames-yahoo-verification-code",
    other: {
      "msvalidate.01": "vitalgames-bing-verification-code",
      "facebook-domain-verification": "vitalgames-facebook-verification",
      "pinterest-site-verification": "vitalgames-pinterest-verification",
      "yandex-verification": "vitalgames-yandex-verification",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#1a365d",
      },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Vitalgames",
    statusBarStyle: "black-translucent",
    startupImage: [
      {
        url: "/apple-startup-640x1136.png",
        media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/apple-startup-750x1334.png", 
        media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)",
      },
    ],
  },
  other: {
    "google-site-verification": "vitalgames-google-verification-code",
    "msvalidate.01": "vitalgames-bing-verification-code",
    "yandex-verification": "vitalgames-yandex-verification-code",
    "facebook-domain-verification": "vitalgames-facebook-verification",
    "pinterest-site-verification": "vitalgames-pinterest-verification",
    "theme-color": "#1a365d",
    "msapplication-TileColor": "#1a365d",
    "msapplication-config": "/browserconfig.xml",
  },
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang?: string }
}) {
  const lang = params?.lang || i18n.defaultLocale

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* DNS Prefetch and Preconnect for Performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//connect.facebook.net" />
        <link rel="dns-prefetch" href="//platform.twitter.com" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* Preload Critical Assets */}
        <link rel="preload" as="image" href="/images/vitalgames-hero.jpg" />
        <link rel="preload" as="image" href="/images/vitalgames-logo.svg" />
        <link rel="preload" as="font" href="/fonts/inter-var.woff2" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for immediate rendering */
            body { margin: 0; font-family: Inter, system-ui, sans-serif; }
            .hero-section { min-height: 100vh; background: linear-gradient(135deg, #1a365d 0%, #2d5a87 100%); }
            .loading-spinner { display: none; }
          `
        }} />

        {/* Comprehensive Structured Data */}
        <Script
          id="vitalgames-organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateComprehensiveSchema("organization")),
          }}
        />

        {/* Local Business Schema for Milan Location */}
        <Script
          id="vitalgames-local-business-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://vitalgames.com/#localbusiness",
              name: enhancedCompanyData.name,
              legalName: enhancedCompanyData.legalName,
              image: [
                "https://vitalgames.com/images/vitalgames-building.jpg",
                "https://vitalgames.com/images/vitalgames-factory.jpg",
                "https://vitalgames.com/images/vitalgames-showroom.jpg"
              ],
              url: "https://vitalgames.com",
              telephone: enhancedCompanyData.contact.telephone,
              email: enhancedCompanyData.contact.email,
              priceRange: "€€€",
              currenciesAccepted: "EUR",
              paymentAccepted: ["Cash", "Credit Card", "Bank Transfer", "Wire Transfer"],
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
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "09:00",
                  closes: "18:00",
                },
                {
                  "@type": "OpeningHoursSpecification", 
                  dayOfWeek: "Saturday",
                  opens: "09:00",
                  closes: "13:00",
                }
              ],
              sameAs: Object.values(enhancedCompanyData.social),
              foundingDate: enhancedCompanyData.foundingYear,
              vatID: enhancedCompanyData.vatNumber,
              naics: enhancedCompanyData.business.naicsCode,
              industry: enhancedCompanyData.business.industry,
              numberOfEmployees: {
                "@type": "QuantitativeValue",
                minValue: 50,
                maxValue: 100,
                unitText: "employees"
              },
              areaServed: [
                {
                  "@type": "Country",
                  name: "Italy"
                },
                {
                  "@type": "Place", 
                  name: "Europe"
                }
              ],
              serviceArea: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: enhancedCompanyData.geo.latitude,
                  longitude: enhancedCompanyData.geo.longitude,
                },
                geoRadius: "2000000" // 2000km radius
              },
              knowsAbout: [
                "Slot Machine Manufacturing",
                "VLT Production", 
                "Gaming Equipment Design",
                "Casino Technology",
                "AWP Systems",
                "Multigame Development",
                "Gaming Software",
                "Cabinet Design",
                "ADM Certification",
                "Gaming Compliance"
              ],
              award: enhancedCompanyData.business.certifications,
              hasCredential: enhancedCompanyData.business.licenses,
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "247",
                bestRating: "5",
                worstRating: "1"
              }
            }),
          }}
        />

        {/* Website Schema */}
        <Script
          id="vitalgames-website-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://vitalgames.com/#website",
              url: "https://vitalgames.com",
              name: "Vitalgames",
              alternateName: ["Vitalgames S.r.l.", "Vitalgames Milano", "Vitalgames Italy"],
              description: "Leading Italian manufacturer of slot machines, VLTs and multigame systems since 1996. Based in Milan, serving Europe with innovative gaming solutions.",
              publisher: {
                "@id": "https://vitalgames.com/#organization"
              },
              inLanguage: ["it-IT", "en-US", "es-ES"],
              copyrightYear: "1996",
              copyrightHolder: {
                "@id": "https://vitalgames.com/#organization"
              },
              potentialAction: [
                {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: "https://vitalgames.com/search?q={search_term_string}"
                  },
                  "query-input": "required name=search_term_string"
                },
                {
                  "@type": "SubscribeAction",
                  target: {
                    "@type": "EntryPoint", 
                    urlTemplate: "https://vitalgames.com/newsletter"
                  }
                }
              ],
              mainEntity: {
                "@id": "https://vitalgames.com/#organization"
              }
            }),
          }}
        />

        {/* Breadcrumb Schema for Homepage */}
        <Script
          id="vitalgames-breadcrumb-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://vitalgames.com"
                }
              ]
            }),
          }}
        />

        {/* FAQ Schema for Common Questions */}
        <Script
          id="vitalgames-faq-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Che tipo di slot machine produce Vitalgames?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Vitalgames produce slot machine AWP per bar e sale giochi, cabinet VLT per sale dedicate, sistemi multigame e slot online. Tutti i nostri prodotti sono certificati ADM e conformi alle normative italiane."
                  }
                },
                {
                  "@type": "Question", 
                  name: "Dove ha sede Vitalgames?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Vitalgames ha sede a Milano, in Lombardia, Italia. Dal 1996 progettiamo e produciamo gaming equipment per il mercato italiano ed europeo."
                  }
                },
                {
                  "@type": "Question",
                  name: "Vitalgames produce anche software per slot machine?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sì, Vitalgames sviluppa sia hardware che software per slot machine. I nostri giochi includono grafica HD, bonus innovativi e meccaniche di gioco coinvolgenti."
                  }
                },
                {
                  "@type": "Question",
                  name: "Come posso diventare partner di Vitalgames?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Per diventare partner Vitalgames, contattaci tramite il nostro form di contatto o chiama il +39 02 1234567. Offriamo soluzioni personalizzate per bar, sale giochi e operatori del settore."
                  }
                }
              ]
            }),
          }}
        />

        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXXX');
            `,
          }}
        />

        

        {/* Critical Resource Hints */}
        <link rel="prefetch" href="/images/slot-machines-gallery.jpg" />
        <link rel="prefetch" href="/images/vlt-cabinets.jpg" />
        <link rel="prefetch" href="/images/multigames-systems.jpg" />
        
        {/* Canonical and Hreflang will be handled by individual pages */}
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
        >
          Vai al contenuto principale
        </a>

        <IntroVideo />
        <main id="main-content">
          {children}
        </main>

        {/* Service Worker Registration */}
        <Script
          id="service-worker"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
