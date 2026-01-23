import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/i18n-config"
import { generateAdvancedSEOMetadata } from "@/lib/seo-config"
import { redirect } from "next/navigation"
import { onlineGames } from "@/lib/onlinegames"

type Params = Promise<{ lang: Locale }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const params = await props.params

  const titles = {
    it: "Giochi Online | Slot Machine Demo e Giochi Gratuiti | Vitalgames",
    en: "Online Games | Slot Machine Demos and Free Games | Vitalgames",
    es: "Juegos Online | Demos de Tragamonedas y Juegos Gratis | Vitalgames",
  }

  const descriptions = {
    it: "Gioca gratis alle slot machine Vitalgames online. Prova le nostre demo gratuite di slot AWP, VLT e multigame. Oltre 20 giochi disponibili con grafica HD e bonus game.",
    en: "Play Vitalgames slot machines online for free. Try our free demos of AWP slots, VLTs and multigames. Over 20 games available with HD graphics and bonus games.",
    es: "Juega gratis a las máquinas tragamonedas Vitalgames online. Prueba nuestras demos gratuitas de slots AWP, VLT y multijuegos. Más de 20 juegos disponibles con gráficos HD y juegos bonus.",
  }

  const keywords = {
    it: [
      "slot machine online gratis",
      "giochi slot demo",
      "slot machine Vitalgames online",
      "giochi online gratuiti",
      "demo slot machine",
      "slot machine senza deposito",
      "giochi AWP online",
      "giochi VLT online",
      "slot machine prova gratis",
      "casino online demo",
      "slot machine browser",
      "giochi slot HTML5",
      "slot machine mobile",
      "demo gratuita slot",
      "slot machine Italia online",
      "giochi casinò gratis",
      "slot machine senza registrazione",
      "prova slot machine",
    ],
    en: [
      "free online slot machines",
      "slot games demo",
      "Vitalgames online slots",
      "free online games",
      "slot machine demos",
      "no deposit slots",
      "AWP games online",
      "VLT games online",
      "free slot machine trial",
      "online casino demo",
      "browser slot machines",
      "HTML5 slot games",
      "mobile slot machines",
      "free slot demo",
      "Italian slots online",
      "free casino games",
      "no registration slots",
      "try slot machines",
    ],
    es: [
      "máquinas tragamonedas gratis online",
      "demos juegos slot",
      "slots online Vitalgames",
      "juegos online gratuitos",
      "demos máquinas tragamonedas",
      "slots sin depósito",
      "juegos AWP online",
      "juegos VLT online",
      "prueba gratis tragamonedas",
      "demo casino online",
      "tragamonedas navegador",
      "juegos slot HTML5",
      "tragamonedas móvil",
      "demo gratuita slots",
      "slots Italia online",
      "juegos casino gratis",
      "slots sin registro",
      "probar máquinas tragamonedas",
    ],
  }

  return generateAdvancedSEOMetadata("onlineGames", params.lang, {
    title: titles[params.lang],
    description: descriptions[params.lang],
    keywords: keywords[params.lang],
    image: "/onlinegames-hero.jpg",
    additionalImages: [
      "/images/online-slot-collection-1.jpg",
      "/images/online-vlt-collection.jpg",
      "/images/online-multigame-collection.jpg",
    ],
  })
}

export default async function OnlineGamesPage(props: { params: Params }) {
  const params = await props.params
  
  // Redirect 301 permanente alla nuova rotta unificata con query param
  redirect(`/${params.lang}/games?type=online-games`)
}
