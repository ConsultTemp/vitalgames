import { notFound, redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import type { Metadata } from "next"
import { games } from "@/lib/allgamesmap"
import { multigames } from "@/lib/multigames"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { generateAdvancedSEOMetadata } from "@/lib/seo-config"
import Multigame from "./game-of"
import SmoothReveal from "@/components/smooth-reveal"

type Params = Promise<{ lang: Locale; gameId: string }>

export async function generateStaticParams() {
  const paths: { lang: Locale; gameId: string }[] = []

  const languages: Locale[] = ["it", "en", "es"]

  languages.forEach((lang) => {
    games.forEach((game) => {
      paths.push({
        lang,
        gameId: game.slug,
      })
    })
  })

  return paths
}

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const params = await props.params
  const game = games.find((g) => g.slug === params.gameId)

  if (!game) {
    return {
      title: "Game Not Found | Vitalgames",
      description: "The requested game could not be found.",
    }
  }

  const titles = {
    it: `${game.name} | Slot Machine Innovativa | Vitalgames`,
    en: `${game.name} | Innovative Slot Machine | Vitalgames`,
    es: `${game.name} | Máquina Tragamonedas Innovadora | Vitalgames`,
  }

  const descriptions = {
    it: `Scopri ${game.name}, slot machine innovativa di Vitalgames con grafica HD, bonus game emozionanti e jackpot. Disponibile in versione AWP, VLT e online. ${game.description || ""}`,
    en: `Discover ${game.name}, innovative slot machine by Vitalgames with HD graphics, exciting bonus games and jackpots. Available in AWP, VLT and online versions. ${game.description || ""}`,
    es: `Descubre ${game.name}, máquina tragamonedas innovadora de Vitalgames con gráficos HD, emocionantes juegos bonus y jackpots. Disponible en versiones AWP, VLT y online. ${game.description || ""}`,
  }

  const keywords = {
    it: [
      `${game.name} slot machine`,
      `${game.name} Vitalgames`,
      `slot machine ${game.name}`,
      `gioco ${game.name}`,
      `${game.name} AWP`,
      `${game.name} VLT`,
      `${game.name} online`,
      `slot ${game.name} Italia`,
      `${game.name} jackpot`,
      `${game.name} bonus`,
      `${game.name} gratis`,
      `${game.name} demo`,
      "slot machine innovativa",
      "slot machine HD",
      "slot machine bonus",
      "slot machine jackpot",
      "Vitalgames slot",
      "produttore slot machine",
      "slot machine Italia",
      "slot machine legali",
    ],
    en: [
      `${game.name} slot machine`,
      `${game.name} Vitalgames`,
      `${game.name} slot game`,
      `${game.name} game`,
      `${game.name} AWP`,
      `${game.name} VLT`,
      `${game.name} online`,
      `${game.name} slot Italy`,
      `${game.name} jackpot`,
      `${game.name} bonus`,
      `${game.name} free`,
      `${game.name} demo`,
      "innovative slot machine",
      "HD slot machine",
      "bonus slot machine",
      "jackpot slot machine",
      "Vitalgames slots",
      "slot machine manufacturer",
      "Italian slot machines",
      "legal slot machines",
    ],
    es: [
      `${game.name} máquina tragamonedas`,
      `${game.name} Vitalgames`,
      `tragamonedas ${game.name}`,
      `juego ${game.name}`,
      `${game.name} AWP`,
      `${game.name} VLT`,
      `${game.name} online`,
      `${game.name} tragamonedas Italia`,
      `${game.name} jackpot`,
      `${game.name} bonus`,
      `${game.name} gratis`,
      `${game.name} demo`,
      "máquina tragamonedas innovadora",
      "máquina tragamonedas HD",
      "máquina tragamonedas bonus",
      "máquina tragamonedas jackpot",
      "Vitalgames tragamonedas",
      "fabricante máquinas tragamonedas",
      "máquinas tragamonedas Italia",
      "máquinas tragamonedas legales",
    ],
  }

  return generateAdvancedSEOMetadata("gameDetail", params.lang, {
    title: titles[params.lang],
    description: descriptions[params.lang],
    keywords: keywords[params.lang],
    image: game.coverImage?.src || game.mainImage?.src,
    additionalImages: game.images?.slice(0, 3).map((img) => img.src) || [],
    gameData: game,
  })
}

export default async function GamePage(props: { params: Params }) {
  const params = await props.params
  
  // Redirect 301 permanente alla nuova rotta unificata
  redirect(`/${params.lang}/games/${params.gameId}`)
}
