import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { generateAdvancedSEOMetadata } from "@/lib/seo-config"
import { redirect } from "next/navigation"
import { games } from "@/lib/allgamesmap"

type Params = Promise<{ lang: Locale }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const params = await props.params

  const titles = {
    it: "Tutti i Giochi | Slot Machine, VLT e Multigame | Vitalgames",
    en: "All Games | Slot Machines, VLTs and Multigames | Vitalgames",
    es: "Todos los Juegos | Máquinas Tragamonedas, VLT y Multijuegos | Vitalgames",
  }

  const descriptions = {
    it: "Esplora la collezione completa di slot machine Vitalgames: oltre 100 giochi AWP, VLT e multigame con temi innovativi. Scopri le nostre slot più popolari con jackpot, bonus game e grafica HD.",
    en: "Explore Vitalgames' complete slot machine collection: over 100 AWP, VLT and multigame titles with innovative themes. Discover our most popular slots with jackpots, bonus games and HD graphics.",
    es: "Explora la colección completa de máquinas tragamonedas Vitalgames: más de 100 títulos AWP, VLT y multijuego con temas innovadores. Descubre nuestras tragamonedas más populares con jackpots, juegos bonus y gráficos HD.",
  }

  const keywords = {
    it: [
      "slot machine Vitalgames",
      "tutti i giochi slot",
      "collezione slot machine",
      "giochi AWP",
      "giochi VLT",
      "multigame Vitalgames",
      "slot machine temi",
      "slot machine jackpot",
      "slot machine bonus",
      "giochi da casinò",
      "slot machine bar",
      "slot machine sala giochi",
      "slot machine online",
      "produttore slot machine",
      "slot machine Italia",
      "slot machine Milano",
      "slot machine certificate",
      "slot machine legali",
    ],
    en: [
      "Vitalgames slot machines",
      "all slot games",
      "slot machine collection",
      "AWP games",
      "VLT games",
      "Vitalgames multigames",
      "themed slot machines",
      "jackpot slot machines",
      "bonus slot machines",
      "casino games",
      "bar slot machines",
      "arcade slot machines",
      "online slot machines",
      "slot machine manufacturer",
      "Italian slot machines",
      "Milan slot machines",
      "certified slot machines",
      "legal slot machines",
    ],
    es: [
      "máquinas tragamonedas Vitalgames",
      "todos los juegos tragamonedas",
      "colección máquinas tragamonedas",
      "juegos AWP",
      "juegos VLT",
      "multijuegos Vitalgames",
      "máquinas tragamonedas temáticas",
      "máquinas tragamonedas jackpot",
      "máquinas tragamonedas bonus",
      "juegos casino",
      "máquinas tragamonedas bar",
      "máquinas sala juego",
      "máquinas tragamonedas online",
      "fabricante máquinas tragamonedas",
      "máquinas tragamonedas Italia",
      "máquinas tragamonedas Milán",
      "máquinas certificadas",
      "máquinas legales",
    ],
  }

  return generateAdvancedSEOMetadata("allGames", params.lang, {
    title: titles[params.lang],
    description: descriptions[params.lang],
    keywords: keywords[params.lang],
    image: "/allgames-hero.jpg",
    additionalImages: [
      "/bgcabinet.png",
      "/bgvlt.png",
      "/bgmultigamopen.png",
    ],
  })
}

export default async function AllGamesPage(props: { params: Params }) {
  const params = await props.params
  
  // Redirect 301 permanente alla nuova rotta unificata con query param
  redirect(`/${params.lang}/games?type=all-games`)
}
