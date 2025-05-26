import "server-only"
import type { Locale } from "@/i18n-config"

export interface Dictionary {
  metadata: {
    title: string
    description: string
  }
  navigation: Array<{
    key: string
    href: string
    label: string
  }>
  header: {
    contactUs: string
  }
  hero: {
    title: string
    description: string
    subDescription: string
    ctaButton: string
    bottomText: string
  }
  home: {
    ageRestriction: {
      title: string
      description: string
    }
    cabinet: {
      title: string
      titleLine2: string
      titleLine3: string
      subtitle: string
      description: string
      features: string[]
      cta: string
    }
    technology: {
      title: string
      subtitle: string
      description: string
      certification: {
        title: string
        standard: string
      }
      cta: string
    }
    winningTechnology: {
      title: string
      description: string
      description2: string
      cards: {
        iso: {
          description: string
        }
        experience: {
          description: string
        }
        games: {
          description: string
        }
        partners: {
          description: string
        }
      }
    }
    magicDiamond: {
      title: string
      titleLine2: string
      playNow: string
      startDemo: string
      learnMore: string
      gameTitle: string
    }
    multigames: {
      title: string
      titleLine2: string
      subtitle: string
      description: string
      features: string[]
      cta: string
      descriptions: {
        [key: string]: string
      }
    }
    gameCards: {
      badge: string
      title: string
      viewAll: string
    }
    manhattan: {
      title: string
      comingSoon: string
      description: string
      ageRestriction: string
    }
    partners: {
      title: string
    }
  }
  vlt: {
    title: string
    description: string
    hero: {
      title: string
      subtitle: string
      description: string
    }
    features: {
      title: string
      items: Array<{
        title: string
        description: string
      }>
    }
    systems: {
      title: string
      description: string
      items: Array<{
        title: string
        description: string
      }>
    }
    benefits: {
      title: string
      items: Array<{
        title: string
        description: string
      }>
    }
    cabinets: Array<{
      name: string
      description: string
    }>
  }
  awpMultigames: {
    hero: {
      title: string
      subtitle: string
      description: string
    }
    features: {
      title: string
      items: Array<{
        title: string
        description: string
      }>
    }
    systems: {
      title: string
      description: string
      items: Array<{
        title: string
        description: string
      }>
    }
    benefits: {
      title: string
      items: Array<{
        title: string
        description: string
      }>
    }
    page: {
      title: string
      subtitle: string
      section: {
        badge: string
        title: string
        description: string
      }
    }
  }
  allGames: {
    hero: {
      title: string
      subtitle: string
      description: string
      discoverAll: string
    }
    categories: {
      all: string
      classic: string
      video: string
      fruit: string
      card: string
      special: string
    }
    filters: {
      title: string
      byCategory: string
      byFeatures: string
      search: string
      features: {
        freeSpin: string
        bonus: string
        jackpot: string
        multiplier: string
      }
    }
    noGames: string
    loadMore: string
    recommended: {
      badge: string
      title: string
    }
  }
  gameDetail: {
    info: {
      releaseDate: string
      category: string
      rtp: string
      volatility: string
      minBet: string
      maxBet: string
      maxWin: string
    }
    features: {
      title: string
      freeSpins: string
      bonusGames: string
      wildSymbols: string
      scatterSymbols: string
      multipliers: string
      jackpots: string
    }
    description: {
      title: string
    }
    howToPlay: {
      title: string
      steps: {
        title: string
        selectBet: string
        spin: string
        winEvaluation: string
        features: string
      }
    }
    symbols: {
      title: string
      high: string
      low: string
      special: string
    }
    relatedGames: {
      title: string
    }
  }
  multigameDetail: {
    info: {
      releaseDate: string
      gameCount: string
      cabinetType: string
      systemRequirements: string
    }
    features: {
      title: string
      gameSelection: string
      userInterface: string
      reportingTools: string
      remoteManagement: string
    }
    includedGames: {
      title: string
    }
    specifications: {
      title: string
      hardware: string
      software: string
      connectivity: string
      dimensions: string
    }
    videoGallery: {
      badge: string
      title: string
    }
    discover: {
      title: string
    }
  }
  contact: {
    title: string
    subtitle: string
    info: {
      address: {
        title: string
        value: string
      }
      phone: {
        title: string
        value: string
      }
      email: {
        title: string
        value: string
      }
      hours: {
        title: string
        value: string
      }
    }
    form: {
      title: string
      name: {
        label: string
        placeholder: string
      }
      email: {
        label: string
        placeholder: string
      }
      subject: {
        label: string
        placeholder: string
      }
      message: {
        label: string
        placeholder: string
      }
      submit: string
      success: string
      error: string
    }
    departments: {
      title: string
      sales: {
        title: string
        description: string
        email: string
      }
      support: {
        title: string
        description: string
        email: string
      }
      business: {
        title: string
        description: string
        email: string
      }
    }
  }
  footer: {
    sections: {
      games: {
        title: string
        links: Array<{
          label: string
          href: string
        }>
      }
      company: {
        title: string
        links: Array<{
          label: string
          href: string
        }>
      }
      usage: {
        title: string
        links: Array<{
          label: string
          href: string
        }>
      }
    }
    copyright: string
  }
  common: {
    buttons: {
      readMore: string
      viewAll: string
      learnMore: string
      contactUs: string
      backToHome: string
      backToGames: string
      playNow: string
      downloadBrochure: string
    }
    loading: string
    error: string
    notFound: {
      title: string
      message: string
      action: string
    }
    breadcrumbs: {
      home: string
    }
  }
  cookieBanner: {
    title: string
    description: string
    acceptButton: string
    rejectButton: string
    learnMoreLink: string
    showDetails: string
    hideDetails: string
  }
  aboutUs: {
    title: string
    description: string,
    philosophy: {
      description: string
    },
    presence: {
      description: string
    },
    cards: {
      iso: {
        description: string
      }
      experience: {
        description: string
      }
      games: {
        description: string
      }
      partners: {
        description: string
      }
    }
  }
}

// Dictionary loading functions
const loadDictionary = async (locale: Locale): Promise<Dictionary> => {
  try {
    const module = await import(`@/dictionaries/${locale}.json`)
    return module.default
  } catch (error) {
    console.error(`Failed to load dictionary for locale ${locale}:`, error)
    if (locale !== "en") {
      const module = await import("@/dictionaries/en.json")
      return module.default as any
    }
    throw error
  }
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  try {
    const dictionary = await loadDictionary(locale)
    if (!dictionary) {
      throw new Error(`Dictionary not found for locale: ${locale}`)
    }
    return dictionary
  } catch (error) {
    console.error(`Error loading dictionary for locale ${locale}:`, error)
    if (locale !== "en") {
      return loadDictionary("en")
    }
    throw error
  }
}
