// Comprehensive SEO configuration for Patty Car
import type { Locale } from "@/i18n-config"

// Main service keywords by language
export const serviceKeywords = {
  it: [
    // Primary keywords
    "noleggio con conducente",
    "NCC Milano",
    "auto di lusso con autista",
    "servizio autista privato",
    "transfer aeroporto Milano",
    "trasferimento VIP",
    "auto con conducente",
    "servizio limousine",

    // Service-specific keywords
    "transfer aeroporto Malpensa",
    "transfer aeroporto Linate",
    "transfer aeroporto Orio al Serio",
    "servizio autista per eventi",
    "auto matrimonio Milano",
    "auto per cerimonie",
    "trasporto executive",
    "servizio autista aziendale",
    "trasferimenti business",
    "servizio autista per hotel",
    "trasporto diplomatico",
    "autista per delegazioni",

    // Long-tail keywords
    "noleggio auto di lusso con conducente Milano",
    "servizio autista privato per eventi aziendali",
    "transfer VIP aeroporto Malpensa",
    "auto con conducente per matrimonio Milano",
    "servizio transfer hotel di lusso Milano",
    "autista privato per shopping di lusso",
    "trasporto executive per meeting aziendali",
    "servizio limousine per eventi speciali",

    // Location-specific keywords
    "NCC Milano centro",
    "auto con conducente Milano Monza",
    "servizio autista Como Bellagio",
    "transfer Lago di Como",
    "noleggio con conducente Milano Torino",
    "NCC Milano Venezia",
    "servizio autista Milano Roma",
    "transfer Milano Firenze",
  ],
  en: [
    // Primary keywords
    "chauffeur service Milan",
    "luxury car hire with driver",
    "private driver service",
    "Milan airport transfer",
    "VIP transfer service",
    "executive car service",
    "limousine service Milan",
    "professional driver hire",

    // Service-specific keywords
    "Malpensa airport transfer",
    "Linate airport pickup",
    "Orio al Serio airport transfer",
    "chauffeur service for events",
    "wedding car service Milan",
    "ceremony transportation",
    "executive transport",
    "corporate chauffeur service",
    "business transfers",
    "hotel chauffeur service",
    "diplomatic transport",
    "driver for delegations",

    // Long-tail keywords
    "luxury car with driver Milan",
    "private chauffeur for corporate events",
    "VIP airport transfer Malpensa",
    "wedding car hire with chauffeur Milan",
    "luxury hotel transfer service Milan",
    "private driver for luxury shopping",
    "executive transport for business meetings",
    "limousine service for special events",

    // Location-specific keywords
    "chauffeur service Milan city center",
    "car with driver Milan Monza",
    "chauffeur service Como Bellagio",
    "Lake Como transfer",
    "car hire with driver Milan Turin",
    "chauffeur service Milan Venice",
    "driver service Milan Rome",
    "transfer Milan Florence",
  ],
  ar: [
    // Primary keywords
    "خدمة سائق في ميلانو",
    "تأجير سيارات فاخرة مع سائق",
    "خدمة سائق خاص",
    "خدمة نقل من مطار ميلانو",
    "خدمة نقل VIP",
    "خدمة سيارات تنفيذية",
    "خدمة ليموزين ميلانو",
    "استئجار سائق محترف",

    // Service-specific keywords
    "خدمة نقل من مطار مالبينسا",
    "خدمة توصيل من مطار ليناتي",
    "خدمة نقل من مطار أوريو الساريو",
    "خدمة سائق للمناسبات",
    "خدمة سيارات الزفاف ميلانو",
    "نقل للاحتفالات",
    "نقل تنفيذي",
    "خدمة سائق للشركات",
    "نقل رجال الأعمال",
    "خدمة سائق للفنادق",
    "نقل دبلوماسي",
    "سائق للوفود",

    // Long-tail keywords
    "سيارة فاخرة مع سائق في ميلانو",
    "سائق خاص لفعاليات الشركات",
    "نقل VIP من مطار مالبينسا",
    "تأجير سيارة زفاف مع سائق في ميلانو",
    "خدمة نقل للفنادق الفاخرة في ميلانو",
    "سائق خاص للتسوق الفاخر",
    "نقل تنفيذي لاجتماعات العمل",
    "خدمة ليموزين للمناسبات الخاصة",

    // Location-specific keywords
    "خدمة سائق في وسط مدينة ميلانو",
    "سيارة مع سائق ميلانو مونزا",
    "خدمة سائق كومو بيلاجيو",
    "نقل بحيرة كومو",
    "تأجير مع سائق ميلانو تورينو",
    "خدمة سائق ميلانو البندقية",
    "خدمة سائق ميلانو روما",
    "نقل ميلانو فلورنسا",
  ],
}

// Service types with descriptions for structured data
export const serviceTypes = {
  it: [
    {
      name: "Transfer Aeroportuali",
      description:
        "Servizio di trasferimento di lusso da e per gli aeroporti di Milano Malpensa, Linate e Orio al Serio con autisti professionisti.",
      keywords: ["transfer aeroporto", "trasferimento aeroportuale", "NCC aeroporto", "servizio navetta aeroporto"],
    },
    {
      name: "Servizi per Eventi",
      description:
        "Auto di lusso con conducente per matrimoni, cerimonie, eventi aziendali e occasioni speciali in tutta Italia.",
      keywords: ["auto per matrimonio", "NCC per eventi", "auto cerimonie", "trasporto eventi speciali"],
    },
    {
      name: "Servizi Diplomatici",
      description:
        "Trasporto riservato e professionale per delegazioni diplomatiche, consolati e personalità di alto profilo.",
      keywords: ["trasporto diplomatico", "autista per delegazioni", "servizio VIP", "trasferimento personalità"],
    },
    {
      name: "Servizi per Hotel di Lusso",
      description:
        "Collaborazioni con hotel di lusso per offrire ai loro ospiti un servizio di trasporto esclusivo e personalizzato.",
      keywords: ["NCC per hotel", "trasporto ospiti hotel", "servizio autista hotel", "transfer hotel di lusso"],
    },
    {
      name: "Trasferimenti Business",
      description:
        "Soluzioni di mobilità per professionisti e aziende con esigenze di trasporto regolari, meeting e conferenze.",
      keywords: ["trasporto executive", "NCC aziendale", "autista per business", "transfer meeting"],
    },
  ],
  en: [
    {
      name: "Airport Transfers",
      description:
        "Luxury transfer service to and from Milan Malpensa, Linate and Orio al Serio airports with professional chauffeurs.",
      keywords: ["airport transfer", "airport pickup", "chauffeur airport", "airport shuttle service"],
    },
    {
      name: "Event Services",
      description:
        "Luxury cars with driver for weddings, ceremonies, corporate events and special occasions throughout Italy.",
      keywords: ["wedding car", "chauffeur for events", "ceremony transportation", "special event transport"],
    },
    {
      name: "Diplomatic Services",
      description:
        "Reserved and professional transportation for diplomatic delegations, consulates and high-profile personalities.",
      keywords: ["diplomatic transport", "chauffeur for delegations", "VIP service", "personality transfer"],
    },
    {
      name: "Luxury Hotel Services",
      description:
        "Collaborations with luxury hotels to offer their guests an exclusive and personalized transportation service.",
      keywords: ["chauffeur for hotels", "hotel guest transport", "hotel driver service", "luxury hotel transfer"],
    },
    {
      name: "Business Transfers",
      description:
        "Mobility solutions for professionals and companies with regular transportation needs, meetings and conferences.",
      keywords: ["executive transport", "corporate chauffeur", "business driver", "meeting transfer"],
    },
  ],
  ar: [
    {
      name: "خدمات نقل المطار",
      description: "خدمة نقل فاخرة من وإلى مطارات ميلانو مالبينسا، ليناتي وأوريو الساريو مع سائقين محترفين.",
      keywords: ["نقل المطار", "استقبال المطار", "سائق المطار", "خدمة نقل المطار"],
    },
    {
      name: "خدمات المناسبات",
      description: "سيارات فاخرة مع سائق للأعراس والاحتفالات وفعاليات الشركات والمناسبات الخاصة في جميع أنحاء إيطاليا.",
      keywords: ["سيارة زفاف", "سائق للمناسبات", "نقل للاحتفالات", "نقل للمناسبات الخاصة"],
    },
    {
      name: "الخدمات الدبلوماسية",
      description: "نقل محجوز ومهني للوفود الدبلوماسية والقنصليات والشخصيات رفيعة المستوى.",
      keywords: ["نقل دبلوماسي", "سائق للوفود", "خدمة VIP", "نقل الشخصيات"],
    },
    {
      name: "خدمات الفنادق الفاخرة",
      description: "تعاون مع الفنادق الفاخرة لتقديم خدمة نقل حصرية ومخصصة لضيوفهم.",
      keywords: ["سائق للفنادق", "نقل ضيوف الفندق", "خدمة سائق الفندق", "نقل الفنادق الفاخرة"],
    },
    {
      name: "نقل رجال الأعمال",
      description: "حلول التنقل للمحترفين والشركات ذات احتياجات النقل المنتظمة والاجتماعات والمؤتمرات.",
      keywords: ["نقل تنفيذي", "سائق الشركات", "سائق الأعمال", "نقل الاجتماعات"],
    },
  ],
}

// Location data for local business structured data
export const locationData = {
  name: "Patty Car",
  address: {
    streetAddress: "Via Milano, 123",
    addressLocality: "Milano",
    addressRegion: "MI",
    postalCode: "20100",
    addressCountry: "IT",
  },
  geo: {
    latitude: "45.4642",
    longitude: "9.1900",
  },
  telephone: "+39 02 1234567",
  email: "info@pattycar.com",
}

// Generate SEO metadata for each page
export function generateSEOMetadata(page: string, locale: Locale) {
  const baseUrl = "https://pattycar.com"
  const localizedPages = {
    home: {
      it: {
        title: "Patty Car | Servizio Auto di Lusso con Conducente a Milano",
        description:
          "Servizio NCC di prestigio a Milano dal 1998. Auto di lusso con conducente per transfer aeroportuali, eventi, servizi diplomatici e business.",
        keywords: [
          "noleggio con conducente Milano",
          "NCC Milano",
          "auto di lusso con autista",
          "servizio autista privato",
          "transfer aeroporto Milano",
        ],
      },
      en: {
        title: "Patty Car | Luxury Chauffeur Service in Milan",
        description:
          "Prestigious chauffeur service in Milan since 1998. Luxury cars with driver for airport transfers, events, diplomatic services and business.",
        keywords: [
          "chauffeur service Milan",
          "Milan car with driver",
          "luxury car hire with driver",
          "private driver service",
          "Milan airport transfer",
        ],
      },
      ar: {
        title: "باتي كار | خدمة سيارات فاخرة مع سائق في ميلانو",
        description:
          "خدمة سائق مرموقة في ميلانو منذ عام 1998. سيارات فاخرة مع سائق للنقل من المطار والمناسبات والخدمات الدبلوماسية والأعمال.",
        keywords: [
          "خدمة سائق في ميلانو",
          "سيارة مع سائق في ميلانو",
          "تأجير سيارات فاخرة مع سائق",
          "خدمة سائق خاص",
          "خدمة نقل من مطار ميلانو",
        ],
      },
    },
    services: {
      it: {
        title: "Servizi NCC di Lusso | Patty Car Milano",
        description:
          "Scopri i nostri servizi di noleggio con conducente: transfer aeroportuali, eventi, servizi diplomatici, hotel di lusso e business.",
        keywords: [
          "servizi NCC Milano",
          "noleggio con conducente servizi",
          "transfer aeroporto Milano",
          "auto per eventi",
          "trasporto executive",
        ],
      },
      en: {
        title: "Luxury Chauffeur Services | Patty Car Milan",
        description:
          "Discover our chauffeur services: airport transfers, events, diplomatic services, luxury hotels and business transportation.",
        keywords: [
          "Milan chauffeur services",
          "car with driver services",
          "Milan airport transfer",
          "event car service",
          "executive transport",
        ],
      },
      ar: {
        title: "خدمات سائق فاخرة | باتي كار ميلانو",
        description:
          "اكتشف خدمات السائق لدينا: نقل المطار، المناسبات، الخدمات الدبلوماسية، الفنادق الفاخرة ونقل الأعمال.",
        keywords: ["خدمات سائق ميلانو", "خدمات سيارة مع سائق", "نقل مطار ميلانو", "خدمة سيارة للمناسبات", "نقل تنفيذي"],
      },
    },
    experiences: {
      it: {
        title: "Esperienze Esclusive | Tour Privati con Autista | Patty Car",
        description:
          "Vivi esperienze uniche con i nostri tour privati: Maranello e Ferrari, Lago di Como, shopping di lusso con servizio VIP.",
        keywords: [
          "tour privati con autista",
          "esperienza Ferrari Maranello",
          "tour Lago di Como",
          "shopping di lusso con autista",
          "esperienze esclusive Milano",
        ],
      },
      en: {
        title: "Exclusive Experiences | Private Tours with Chauffeur | Patty Car",
        description:
          "Experience unique journeys with our private tours: Maranello and Ferrari, Lake Como, luxury shopping with VIP service.",
        keywords: [
          "private tours with chauffeur",
          "Ferrari Maranello experience",
          "Lake Como tour",
          "luxury shopping with driver",
          "exclusive experiences Milan",
        ],
      },
      ar: {
        title: "تجارب حصرية | جولات خاصة مع سائق | باتي كار",
        description: "استمتع برحلات فريدة مع جولاتنا الخاصة: مارانيلو وفيراري، بحيرة كومو، تسوق فاخر مع خدمة VIP.",
        keywords: [
          "جولات خاصة مع سائق",
          "تجربة فيراري مارانيلو",
          "جولة بحيرة كومو",
          "تسوق فاخر مع سائق",
          "تجارب حصرية ميلانو",
        ],
      },
    },
    about: {
      it: {
        title: "Chi Siamo | Patty Car | Servizio NCC di Prestigio dal 1998",
        description:
          "Patty Car offre servizi di noleggio con conducente di alta qualità a Milano dal 1998. Scopri la nostra storia, la flotta e il team.",
        keywords: [
          "chi siamo Patty Car",
          "storia NCC Milano",
          "servizio autista Milano storia",
          "azienda noleggio con conducente",
          "flotta auto di lusso Milano",
        ],
      },
      en: {
        title: "About Us | Patty Car | Prestigious Chauffeur Service since 1998",
        description:
          "Patty Car offers high-quality chauffeur services in Milan since 1998. Discover our history, fleet and team.",
        keywords: [
          "about Patty Car",
          "Milan chauffeur service history",
          "Milan driver service history",
          "car with driver company",
          "luxury car fleet Milan",
        ],
      },
      ar: {
        title: "من نحن | باتي كار | خدمة سائق مرموقة منذ عام 1998",
        description: "تقدم باتي كار خدمات سائق عالية الجودة في ميلانو منذ عام 1998. اكتشف تاريخنا وأسطولنا وفريقنا.",
        keywords: [
          "عن باتي كار",
          "تاريخ خدمة سائق ميلانو",
          "تاريخ خدمة سائق ميلانو",
          "شركة سيارة مع سائق",
          "أسطول سيارات فاخرة ميلانو",
        ],
      },
    },
    contact: {
      it: {
        title: "Contatti | Prenota il Tuo Servizio NCC | Patty Car Milano",
        description:
          "Contatta Patty Car per prenotare il tuo servizio di noleggio con conducente a Milano. Richiedi un preventivo per transfer, eventi o servizi business.",
        keywords: [
          "contatti NCC Milano",
          "prenotazione auto con conducente",
          "preventivo noleggio con conducente",
          "prenotazione transfer Milano",
          "contatta autista privato",
        ],
      },
      en: {
        title: "Contact | Book Your Chauffeur Service | Patty Car Milan",
        description:
          "Contact Patty Car to book your chauffeur service in Milan. Request a quote for transfers, events or business services.",
        keywords: [
          "contact Milan chauffeur",
          "book car with driver",
          "chauffeur service quote",
          "book Milan transfer",
          "contact private driver",
        ],
      },
      ar: {
        title: "اتصل بنا | احجز خدمة السائق الخاصة بك | باتي كار ميلانو",
        description:
          "اتصل بباتي كار لحجز خدمة السائق الخاصة بك في ميلانو. اطلب عرض أسعار للنقل أو المناسبات أو خدمات الأعمال.",
        keywords: ["اتصل بسائق ميلانو", "حجز سيارة مع سائق", "عرض أسعار خدمة سائق", "حجز نقل ميلانو", "اتصل بسائق خاص"],
      },
    },
  }

  return localizedPages[page as keyof typeof localizedPages][locale]
}

// Generate JSON-LD structured data
export function generateLocalBusinessSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://pattycar.com",
    name: "Patty Car",
    image: "https://pattycar.com/images/patty-car-logo.jpg",
    url: "https://pattycar.com",
    telephone: locationData.telephone,
    email: locationData.email,
    priceRange: "€€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: locationData.address.streetAddress,
      addressLocality: locationData.address.addressLocality,
      addressRegion: locationData.address.addressRegion,
      postalCode: locationData.address.postalCode,
      addressCountry: locationData.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: locationData.geo.latitude,
      longitude: locationData.geo.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [
      "https://www.facebook.com/pattycar",
      "https://www.instagram.com/pattycar_milano",
      "https://www.linkedin.com/company/patty-car",
    ],
  }
}

// Generate service schema for structured data
export function generateServiceSchema(service: any, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    provider: {
      "@type": "LocalBusiness",
      name: "Patty Car",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Milano",
        addressRegion: "MI",
        addressCountry: "IT",
      },
    },
    description: service.description,
    areaServed: {
      "@type": "City",
      name: "Milano",
    },
  }
}

