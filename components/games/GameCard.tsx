import Image from "next/image"
import { OptimizedLink as Link } from "@/components/optimized-link"

interface Game {
  id: number
  slug: string
  title: string
  description: string
  image: string
}

interface GameCardProps {
  game: Game
  compact?: boolean
}

export function GameCard({ game, compact = false }: GameCardProps) {
  if (compact) {
    return (
      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-yellow-400 transition-colors">
        <div className="relative aspect-video">
          <Image src={game.image || "/placeholder.svg"} alt={game.title} fill className="object-cover" />
        </div>
        <div className="p-3">
          <h3 className="text-white font-medium text-sm">{game.title}</h3>
        </div>
      </div>
    )
  }

  return (
    <Link href={`/game/${game.slug}`}>
      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-yellow-400 transition-colors">
        <div className="relative aspect-video">
          <Image src={game.image || "/placeholder.svg"} alt={game.title} fill className="object-cover" />
        </div>
        <div className="p-4">
          <h3 className="text-white font-medium mb-1">{game.title}</h3>
          <p className="text-gray-400 text-sm line-clamp-2">{game.description}</p>
        </div>
      </div>
    </Link>
  )
}
