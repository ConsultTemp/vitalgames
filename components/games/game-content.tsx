import { multigames } from "@/lib/multigames"
import { games } from "@/lib/allgamesmap"
import type { Locale } from "@/i18n-config"
import MultigameContent from "./multigame-content"
import AllgameContent from "./allgame-content"

interface GameContentProps {
  gameId: string
  lang: Locale
}

export default async function GameContent({ gameId, lang }: GameContentProps) {
  // Check if it's a multigame
  const multigame = multigames.find((m) => m.slug === gameId)
  
  // Check if it's an allgame
  const allgame = games.find((g) => g.slug === gameId)

  if (multigame) {
    return <MultigameContent multigame={multigame} lang={lang} />
  }

  if (allgame) {
    return <AllgameContent game={allgame} lang={lang} />
  }

  return null
}

