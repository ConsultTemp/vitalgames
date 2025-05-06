// Comprehensive SEO configuration for Vitalgames
import type { Locale } from "@/i18n-config"

// Main gaming keywords by language
export const gameKeywords = {
  it: [
    // Primary keywords
    "slot machine",
    "VLT",
    "AWP",
    "multigame",
    "giochi da casinò",
    "produttore slot machine",
    "slot machine fisiche",
    "slot online",
    "macchinette da gioco",
    "cabinet slot",

    // Product-specific keywords
    "VLT Italia",
    "AWP multigame",
    "slot machine bar",
    "slot machine sala giochi",
    "produzione slot machine",
    "slot machine Milano",
    "cabinet VLT",
    "giochi AWP",
    "slot machine legali",
    "slot machine AAMS",

    // Long-tail keywords
    "produttore italiano slot machine",
    "slot machine per sale giochi",
    "slot machine per casinò",
    "slot machine con jackpot",
    "slot machine con bonus game",
    "slot machine tema frutta",
    "slot machine tema egizio",
    "slot machine tema fantasy",
    "slot machine tema western",
    "slot machine tema horror",

    // Location-specific keywords
    "slot machine Milano",
    "produttore slot machine Italia",
    "slot machine Lombardia",
    "slot machine autorizzate Italia",
    "slot machine certificate ADM",
    "slot machine legali Italia",
  ],
  en: [
    // Primary keywords
    "slot machines",
    "VLT",
    "AWP",
    "multigame",
    "casino games",
    "slot machine manufacturer",
    "physical slot machines",
    "online slots",
    "gaming machines",
    "slot cabinets",

    // Product-specific keywords
    "VLT Italy",
    "AWP multigame",
    "bar slot machines",
    "arcade slot machines",
    "slot machine production",
    "Milan slot machines",
    "VLT cabinets",
    "AWP games",
    "legal slot machines",
    "AAMS slot machines",

    // Long-tail keywords
    "Italian slot machine manufacturer",
    "slot machines for arcades",
    "slot machines for casinos",
    "jackpot slot machines",
    "bonus game slot machines",
    "fruit-themed slot machines",
    "Egyptian-themed slot machines",
    "fantasy-themed slot machines",
    "western-themed slot machines",
    "horror-themed slot machines",

    // Location-specific keywords
    "Milan slot machines",
    "Italian slot machine manufacturer",
    "Lombardy slot machines",
    "authorized slot machines Italy",
    "ADM certified slot machines",
    "legal slot machines Italy",
  ],
  es: [
    // Primary keywords
    "máquinas tragamonedas",
    "VLT",
    "AWP",
    "multijuego",
    "juegos de casino",
    "fabricante de máquinas tragamonedas",
    "máquinas tragamonedas físicas",
    "tragamonedas online",
    "máquinas de juego",
    "cabinas tragamonedas",

    // Product-specific keywords
    "VLT Italia",
    "AWP multijuego",
    "máquinas tragamonedas bar",
    "máquinas tragamonedas sala de juego",
    "producción de máquinas tragamonedas",
    "máquinas tragamonedas Milán",
    "cabinas VLT",
    "juegos AWP",
    "máquinas tragamonedas legales",
    "máquinas tragamonedas AAMS",

    // Long-tail keywords
    "fabricante italiano de máquinas tragamonedas",
    "máquinas tragamonedas para salas de juego",
    "máquinas tragamonedas para casinos",
    "máquinas tragamonedas con jackpot",
    "máquinas tragamonedas con juego de bonificación",
    "máquinas tragamonedas tema frutas",
    "máquinas tragamonedas tema egipcio",
    "máquinas tragamonedas tema fantasía",
    "máquinas tragamonedas tema western",
    "máquinas tragamonedas tema horror",

    // Location-specific keywords
    "máquinas tragamonedas Milán",
    "fabricante de máquinas tragamonedas Italia",
    "máquinas tragamonedas Lombardía",
    "máquinas tragamonedas autorizadas Italia",
    "máquinas tragamonedas certificadas ADM",
    "máquinas tragamonedas legales Italia",
  ],
}

// Product types with descriptions for structured data
export const productTypes = {
  it: [
    {
      name: "Slot Machine AWP",
      description:
        "Slot machine fisiche per bar, sale giochi e locali autorizzati, conformi alle normative ADM italiane.",
      keywords: ["AWP", "slot machine bar", "slot machine fisiche", "macchinette da gioco", "slot legali"],
    },
    {
      name: "Videolottery (VLT)",
      description: "Cabinet VLT di alta qualità per sale dedicate, con grafica avanzata e jackpot collegati in rete.",
      keywords: ["VLT", "videolottery", "cabinet VLT", "slot machine sala VLT", "jackpot VLT"],
    },
    {
      name: "Multigames",
      description:
        "Sistemi multigame che offrono diverse slot in un'unica macchina, per massimizzare l'intrattenimento e l'offerta di gioco.",
      keywords: ["multigame", "multi gioco", "slot multiple", "sistema multigame", "cabinet multigame"],
    },
    {
      name: "Slot Online",
      description:
        "Versioni digitali delle nostre slot più popolari, disponibili sulle principali piattaforme di gioco online autorizzate.",
      keywords: ["slot online", "giochi online", "casinò online", "slot digitali", "slot AAMS online"],
    },
    {
      name: "Cabinet Personalizzati",
      description:
        "Soluzioni hardware personalizzate per operatori di gioco, con design esclusivi e configurazioni su misura.",
      keywords: ["cabinet personalizzati", "hardware slot", "design cabinet", "cabinet su misura", "cabinet esclusivi"],
    },
  ],
  en: [
    {
      name: "AWP Slot Machines",
      description:
        "Physical slot machines for bars, arcades and authorized venues, compliant with Italian ADM regulations.",
      keywords: ["AWP", "bar slot machines", "physical slot machines", "gaming machines", "legal slots"],
    },
    {
      name: "Video Lottery Terminals (VLT)",
      description:
        "High-quality VLT cabinets for dedicated venues, featuring advanced graphics and networked jackpots.",
      keywords: ["VLT", "video lottery", "VLT cabinets", "VLT venue slot machines", "VLT jackpots"],
    },
    {
      name: "Multigames",
      description:
        "Multigame systems offering various slots in a single machine, maximizing entertainment and gaming options.",
      keywords: ["multigame", "multi-game", "multiple slots", "multigame system", "multigame cabinet"],
    },
    {
      name: "Online Slots",
      description: "Digital versions of our most popular slots, available on major authorized online gaming platforms.",
      keywords: ["online slots", "online games", "online casino", "digital slots", "AAMS online slots"],
    },
    {
      name: "Custom Cabinets",
      description:
        "Customized hardware solutions for gaming operators, with exclusive designs and tailored configurations.",
      keywords: ["custom cabinets", "slot hardware", "cabinet design", "tailored cabinets", "exclusive cabinets"],
    },
  ],
  es: [
    {
      name: "Máquinas Tragamonedas AWP",
      description: "Máquinas tragamonedas físicas para bares, salas de juego y locales autorizados, conformes con las regulaciones ADM italianas.",
      keywords: ["AWP", "máquinas tragamonedas bar", "máquinas tragamonedas físicas", "máquinas de juego", "tragamonedas legales"],
    },
    {
      name: "Terminales de Lotería de Video (VLT)",
      description: "Cabinas VLT de alta calidad para locales dedicados, con gráficos avanzados y jackpots en red.",
      keywords: ["VLT", "lotería de video", "cabinas VLT", "máquinas tragamonedas sala VLT", "jackpots VLT"],
    },
    {
      name: "Multijuegos",
      description: "Sistemas multijuego que ofrecen varias tragamonedas en una sola máquina, maximizando el entretenimiento y las opciones de juego.",
      keywords: ["multijuego", "juego múltiple", "tragamonedas múltiples", "sistema multijuego", "cabina multijuego"],
    },
    {
      name: "Tragamonedas Online",
      description: "Versiones digitales de nuestras tragamonedas más populares, disponibles en las principales plataformas de juego online autorizadas.",
      keywords: [
        "tragamonedas online",
        "juegos online",
        "casino online",
        "tragamonedas digitales",
        "tragamonedas AAMS online"
      ],
    },
    {
      name: "Cabinas Personalizadas",
      description: "Soluciones de hardware personalizadas para operadores de juego, con diseños exclusivos y configuraciones a medida.",
      keywords: ["cabinas personalizadas", "hardware tragamonedas", "diseño cabina", "cabinas a medida", "cabinas exclusivas"],
    },
  ],
}

// Company data for structured data
export const companyData = {
  name: "Vitalgames",
  foundingYear: "1996",
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
  email: "info@vitalgames.com",
  description: {
    it: "Dal 1996, Vitalgames è leader nella produzione di slot machine, VLT e sistemi multigame in Italia. Con sede a Milano, offriamo soluzioni di gioco innovative e conformi alle normative per bar, sale giochi e piattaforme online.",
    en: "Since 1996, Vitalgames has been a leader in the production of slot machines, VLTs and multigame systems in Italy. Based in Milan, we offer innovative gaming solutions compliant with regulations for bars, arcades and online platforms.",
    es: "Desde 1996, Vitalgames ha sido líder en la producción de máquinas tragamonedas, VLTs y sistemas multijuego en Italia. Con sede en Milán, ofrecemos soluciones de juego innovadoras y conformes con las regulaciones para bares, salas de juego y plataformas online.",
  },
}

// Generate SEO metadata for each page
export function generateSEOMetadata(page: string, locale: Locale) {
  const baseUrl = "https://vitalgames.com"
  const localizedPages = {
    home: {
      it: {
        title: "Vitalgames | Produttore di Slot Machine, VLT e Multigame dal 1996",
        description:
          "Leader italiano nella produzione di slot machine, VLT e sistemi multigame. Dal 1996 creiamo giochi innovativi per bar, sale giochi e piattaforme online.",
        keywords: [
          "slot machine",
          "VLT",
          "AWP",
          "multigame",
          "produttore slot machine",
          "slot machine Italia",
          "giochi da casinò",
          "macchinette da gioco",
        ],
      },
      en: {
        title: "Vitalgames | Slot Machine, VLT and Multigame Manufacturer since 1996",
        description:
          "Italian leader in the production of slot machines, VLTs and multigame systems. Since 1996, we've been creating innovative games for bars, arcades and online platforms.",
        keywords: [
          "slot machines",
          "VLT",
          "AWP",
          "multigame",
          "slot machine manufacturer",
          "Italian slot machines",
          "casino games",
          "gaming machines",
        ],
      },
      es: {
        title: "Vitalgames | Fabricante de Máquinas Tragamonedas, VLT y Multijuego desde 1996",
        description: "Líder italiano en la producción de máquinas tragamonedas, VLTs y sistemas multijuego. Desde 1996, creamos juegos innovadores para bares, salas de juego y plataformas online.",
        keywords: [
          "máquinas tragamonedas",
          "VLT",
          "AWP",
          "multijuego",
          "fabricante de máquinas tragamonedas",
          "máquinas tragamonedas Italia",
          "juegos de casino",
          "máquinas de juego"
        ],
      },
    },
    vlt: {
      it: {
        title: "Cabinet VLT | Videolottery di Alta Qualità | Vitalgames",
        description:
          "Scopri la nostra gamma di cabinet VLT di alta qualità. Sistemi videolottery innovativi con grafica avanzata e jackpot collegati in rete per sale dedicate.",
        keywords: [
          "VLT",
          "videolottery",
          "cabinet VLT",
          "slot machine sala VLT",
          "jackpot VLT",
          "produttore VLT Italia",
          "VLT certificate ADM",
          "VLT legali Italia",
        ],
      },
      en: {
        title: "VLT Cabinets | High-Quality Video Lottery Terminals | Vitalgames",
        description:
          "Discover our range of high-quality VLT cabinets. Innovative video lottery systems with advanced graphics and networked jackpots for dedicated venues.",
        keywords: [
          "VLT",
          "video lottery terminals",
          "VLT cabinets",
          "VLT venue slot machines",
          "VLT jackpots",
          "Italian VLT manufacturer",
          "ADM certified VLT",
          "legal VLT Italy",
        ],
      },
      es: {
        title: "Cabinas VLT | Terminales de Lotería de Video de Alta Calidad | Vitalgames",
        description: "Descubre nuestra gama de cabinas VLT de alta calidad. Sistemas de lotería de video innovadores con gráficos avanzados y jackpots en red para locales dedicados.",
        keywords: [
          "VLT",
          "terminales de lotería de video",
          "cabinas VLT",
          "máquinas tragamonedas sala VLT",
          "jackpots VLT",
          "fabricante VLT Italia",
          "VLT certificadas ADM",
          "VLT legales Italia"
        ],
      },
    },
    awpMultigames: {
      it: {
        title: "AWP Multigames | Sistemi Multi Gioco per Bar e Sale | Vitalgames",
        description:
          "I nostri sistemi AWP multigame offrono diverse slot in un'unica macchina. Massimizza l'intrattenimento e l'offerta di gioco nei bar e nelle sale giochi.",
        keywords: [
          "AWP multigame",
          "multi gioco",
          "slot multiple",
          "sistema multigame",
          "cabinet multigame",
          "slot machine bar",
          "slot machine sala giochi",
          "multigame Italia",
        ],
      },
      en: {
        title: "AWP Multigames | Multi-Game Systems for Bars and Arcades | Vitalgames",
        description:
          "Our AWP multigame systems offer various slots in a single machine. Maximize entertainment and gaming options in bars and arcades.",
        keywords: [
          "AWP multigame",
          "multi-game",
          "multiple slots",
          "multigame system",
          "multigame cabinet",
          "bar slot machines",
          "arcade slot machines",
          "multigame Italy",
        ],
      },
      es: {
        title: "AWP Multijuegos | Sistemas Multijuego para Bares y Salas | Vitalgames",
        description: "Nuestros sistemas AWP multijuego ofrecen varias tragamonedas en una sola máquina. Maximiza el entretenimiento y las opciones de juego en bares y salas de juego.",
        keywords: [
          "AWP multijuego",
          "multijuego",
          "tragamonedas múltiples",
          "sistema multijuego",
          "cabina multijuego",
          "máquinas tragamonedas bar",
          "máquinas tragamonedas sala de juego",
          "multijuego Italia"
        ],
      },
    },
    allGames: {
      it: {
        title: "Tutti i Giochi | Slot Machine, VLT e Multigame | Vitalgames",
        description:
          "Esplora la nostra completa collezione di giochi: slot machine AWP, VLT, multigame e slot online. Giochi innovativi con temi diversi e meccaniche coinvolgenti.",
        keywords: [
          "slot machine",
          "giochi slot",
          "VLT",
          "AWP",
          "multigame",
          "slot online",
          "giochi da casinò",
          "macchinette da gioco",
        ],
      },
      en: {
        title: "All Games | Slot Machines, VLTs and Multigames | Vitalgames",
        description:
          "Explore our complete collection of games: AWP slot machines, VLTs, multigames and online slots. Innovative games with diverse themes and engaging mechanics.",
        keywords: [
          "slot machines",
          "slot games",
          "VLT",
          "AWP",
          "multigame",
          "online slots",
          "casino games",
          "gaming machines",
        ],
      },
      es: {
        title: "Todos los Juegos | Máquinas Tragamonedas, VLT y Multijuegos | Vitalgames",
        description: "Explora nuestra colección completa de juegos: máquinas tragamonedas AWP, VLTs, multijuegos y tragamonedas online. Juegos innovadores con diversos temas y mecánicas atractivas.",
        keywords: [
          "máquinas tragamonedas",
          "juegos tragamonedas",
          "VLT",
          "AWP",
          "multijuego",
          "tragamonedas online",
          "juegos de casino",
          "máquinas de juego"
        ],
      },
    },
    gameDetail: {
      it: {
        title: "GAME_NAME | Slot Machine Innovativa | Vitalgames",
        description:
          "Scopri GAME_NAME, una slot machine innovativa con grafica accattivante e funzionalità bonus emozionanti. Disponibile in versione AWP, VLT e online.",
        keywords: [
          "GAME_NAME slot",
          "GAME_NAME Vitalgames",
          "slot machine GAME_NAME",
          "gioco GAME_NAME",
          "GAME_NAME AWP",
          "GAME_NAME VLT",
          "GAME_NAME online",
        ],
      },
      en: {
        title: "GAME_NAME | Innovative Slot Machine | Vitalgames",
        description:
          "Discover GAME_NAME, an innovative slot machine with captivating graphics and exciting bonus features. Available in AWP, VLT and online versions.",
        keywords: [
          "GAME_NAME slot",
          "GAME_NAME Vitalgames",
          "GAME_NAME slot machine",
          "GAME_NAME game",
          "GAME_NAME AWP",
          "GAME_NAME VLT",
          "GAME_NAME online",
        ],
      },
      es: {
        title: "GAME_NAME | Máquina Tragamonedas Innovadora | Vitalgames",
        description: "Descubre GAME_NAME, una máquina tragamonedas innovadora con gráficos cautivadores y emocionantes características de bonificación. Disponible en versiones AWP, VLT y online.",
        keywords: [
          "tragamonedas GAME_NAME",
          "GAME_NAME Vitalgames",
          "máquina tragamonedas GAME_NAME",
          "juego GAME_NAME",
          "GAME_NAME AWP",
          "GAME_NAME VLT",
          "GAME_NAME online"
        ],
      },
    },
    multigameDetail: {
      it: {
        title: "MULTIGAME_NAME | Sistema Multigame AWP | Vitalgames",
        description:
          "MULTIGAME_NAME offre diverse slot in un'unica macchina. Un sistema multigame innovativo per bar e sale giochi con grafica HD e interfaccia intuitiva.",
        keywords: [
          "MULTIGAME_NAME multigame",
          "MULTIGAME_NAME Vitalgames",
          "sistema multigame MULTIGAME_NAME",
          "AWP MULTIGAME_NAME",
          "multi gioco MULTIGAME_NAME",
          "slot multiple MULTIGAME_NAME",
        ],
      },
      en: {
        title: "MULTIGAME_NAME | AWP Multigame System | Vitalgames",
        description:
          "MULTIGAME_NAME offers various slots in a single machine. An innovative multigame system for bars and arcades with HD graphics and intuitive interface.",
        keywords: [
          "MULTIGAME_NAME multigame",
          "MULTIGAME_NAME Vitalgames",
          "MULTIGAME_NAME multigame system",
          "MULTIGAME_NAME AWP",
          "MULTIGAME_NAME multi-game",
          "MULTIGAME_NAME multiple slots",
        ],
      },
      es: {
        title: "MULTIGAME_NAME | Sistema Multijuego AWP | Vitalgames",
        description: "MULTIGAME_NAME ofrece varias tragamonedas en una sola máquina. Un sistema multijuego innovador para bares y salas de juego con gráficos HD e interfaz intuitiva.",
        keywords: [
          "multijuego MULTIGAME_NAME",
          "MULTIGAME_NAME Vitalgames",
          "sistema multijuego MULTIGAME_NAME",
          "MULTIGAME_NAME AWP",
          "multijuego MULTIGAME_NAME",
          "tragamonedas múltiples MULTIGAME_NAME"
        ],
      },
    },
  }

  return localizedPages[page as keyof typeof localizedPages][locale]
}

// Generate JSON-LD structured data for the company
export function generateCompanySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://vitalgames.com",
    name: companyData.name,
    url: "https://vitalgames.com",
    logo: "https://vitalgames.com/images/logo.png",
    foundingDate: companyData.foundingYear,
    description: companyData.description.en,
    address: {
      "@type": "PostalAddress",
      streetAddress: companyData.address.streetAddress,
      addressLocality: companyData.address.addressLocality,
      addressRegion: companyData.address.addressRegion,
      postalCode: companyData.address.postalCode,
      addressCountry: companyData.address.addressCountry,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: companyData.telephone,
      email: companyData.email,
      contactType: "customer service",
    },
    sameAs: [
      "https://www.facebook.com/vitalgames",
      "https://www.instagram.com/vitalgames_official",
      "https://www.linkedin.com/company/vitalgames",
    ],
  }
}

// Generate product schema for structured data
export function generateProductSchema(product: any, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "Vitalgames",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Vitalgames",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Milano",
        addressRegion: "MI",
        addressCountry: "IT",
      },
    },
    category: "Gaming Machines",
    image: product.image || "https://vitalgames.com/images/products/default.jpg",
  }
}

// Generate game schema for structured data
export function generateGameSchema(game: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Game",
    name: game.name,
    description: game.description || `${game.name} - Slot machine by Vitalgames`,
    gameItem: {
      "@type": "Thing",
      name: "Slot Machine",
    },
    gamePlatform: ["AWP", "VLT", "Online"],
    genre: "Slot Machine",
    image: game.coverImage || game.mainImage,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: "0",
      priceCurrency: "EUR",
      seller: {
        "@type": "Organization",
        name: "Vitalgames",
      },
    },
    provider: {
      "@type": "Organization",
      name: "Vitalgames",
      url: "https://vitalgames.com",
    },
  }
}
