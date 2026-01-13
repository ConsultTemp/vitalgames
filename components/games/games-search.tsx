'use client'

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Search, PlayIcon } from "lucide-react"
import SmoothReveal from "../smooth-reveal"
import { Button } from "@/components/ui/button"
import type { Locale } from "@/i18n-config"

interface Multigame {
  slug: string
  title: string
  mainImage: any
  isComingSoon?: boolean
  games?: Array<{ name: string; slug?: string }>
}

interface AllGame {
  name: string
  slug: string
  mainImage: any
  isComingSoon?: boolean
}

interface OnlineGame {
  title: string
  image: any
  demoLink: string
}

interface GamesSearchDict {
  allGames?: {
    filters?: {
      search?: string
      all?: string
      onlineGames?: string
      awpMultigames?: string
      allGames?: string
    }
    sections?: {
      awpMultigames?: string
      allGames?: string
      onlineGames?: string
    }
    noGames?: string
    contains?: string
    partOf?: string
  }
}

interface GamesSearchProps {
  multigames: Multigame[]
  allGames: AllGame[]
  onlineGames: OnlineGame[]
  lang: Locale
  dict: GamesSearchDict
}

export default function GamesSearch({ multigames, allGames, onlineGames, lang, dict }: GamesSearchProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string | null>(null)

  // Helper function to find the multigame that contains a game
  const findMultigameForGame = (gameSlug: string) => {
    return multigames.find((multigame) => 
      multigame.games && multigame.games.some((g) => g.slug === gameSlug)
    )
  }

  // Initialize selectedType from URL params
  useEffect(() => {
    const typeParam = searchParams.get('type')
    if (typeParam) {
      setSelectedType(typeParam)
    } else {
      setSelectedType(null)
    }
  }, [searchParams])

  // Update URL when type changes
  const handleTypeChange = (type: string | null) => {
    setSelectedType(type)
    const params = new URLSearchParams(searchParams.toString())
    if (type) {
      params.set('type', type)
    } else {
      params.delete('type')
    }
    const queryString = params.toString()
    router.push(`${pathname}${queryString ? `?${queryString}` : ''}`, { scroll: false })
  }

  // Filter games based on search query (case-insensitive)
  const filteredMultigames = useMemo(() => {
    if (!searchQuery.trim()) return multigames
    const query = searchQuery.toLowerCase().trim()
    return multigames.filter((game) => game.title.toLowerCase().includes(query))
  }, [multigames, searchQuery])

  const filteredAllGames = useMemo(() => {
    if (!searchQuery.trim()) return allGames
    const query = searchQuery.toLowerCase().trim()
    return allGames.filter((game) => game.name.toLowerCase().includes(query))
  }, [allGames, searchQuery])

  const filteredOnlineGames = useMemo(() => {
    if (!searchQuery.trim()) return onlineGames
    const query = searchQuery.toLowerCase().trim()
    return onlineGames.filter((game) => game.title.toLowerCase().includes(query))
  }, [onlineGames, searchQuery])

  // Determine which sections to show
  const showMultigames = !selectedType || selectedType === 'awp-multigames'
  const showAllGames = !selectedType || selectedType === 'all-games'
  const showOnlineGames = !selectedType || selectedType === 'online-games'

  return (
    <>
      {/* SEARCH BAR */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-vitalYellow w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={dict.allGames?.filters?.search || "Search games..."}
              className="w-full mx-auto 
              bg-white/10 border border-white/10 rounded-full 
              placeholder:text-white/40 text-white text-[16px]
              pl-12 pr-6 py-3
              focus:outline-none focus:ring-2 focus:ring-vitalYellow
              "
            />
          </div>
          
          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2 mt-4 justify-start">
            <button
              type="button"
              onClick={() => handleTypeChange(null)}
              className={`
                px-4 py-2 rounded-full 
                text-sm font-hitmarker-text-medium uppercase
                transition-all duration-300 border box-border ${
                selectedType === null
                  ? 'bg-vitalYellow text-black border-vitalYellow'
                  : 'bg-white/10 text-white border-white/10'
              }`}
            >
              {dict.allGames?.filters?.all || "All"}
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('online-games')}
              className={`px-4 py-2 rounded-full text-sm font-hitmarker-text-medium transition-all duration-300 uppercase border box-border ${
                selectedType === 'online-games'
                  ? 'bg-vitalYellow text-black border-vitalYellow'
                  : 'bg-white/10 text-white border-white/10'
              }`}
            >
              Online Games
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('awp-multigames')}
              className={`px-4 py-2 rounded-full text-sm font-hitmarker-text-medium transition-all duration-300 uppercase border box-border ${
                selectedType === 'awp-multigames'
                  ? 'bg-vitalYellow text-black border-vitalYellow'
                  : 'bg-white/10 text-white border-white/10'
              }`}
            >
              AWP Multigames
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('all-games')}
              className={`px-4 py-2 rounded-full text-sm font-hitmarker-text-medium transition-all duration-300 uppercase border box-border ${
                selectedType === 'all-games'
                  ? 'bg-vitalYellow text-black border-vitalYellow'
                  : 'bg-white/10 text-white border-white/10'
              }`}
            >
              All Games
            </button>
          </div>
        </div>
      </section>

      {/* MULTIGAMES SECTION */}
      {showMultigames && (
      <section aria-labelledby="multigames-heading" className="py-8 md:py-12 px-4">
        <div className="container mx-auto">
          <h2 id="multigames-heading" 
          className="
          flex gap-1
          text-4xl md:text-5xl text-white font-hitmarker-black uppercase
          mb-8 text-left">
            AWP Multigames
            <span className="text-sm text-vitalYellow font-hitmarker-text-bold">
              ({filteredMultigames.length}{searchQuery.trim() && ` / ${multigames.length}`})
            </span>
          </h2>

          {filteredMultigames.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {filteredMultigames.map((game) => (
                <div key={game.slug} className="w-full aspect-[1080/1196] block group rounded-lg overflow-hidden relative">
                  <Link href={`/${lang}/games/${game.slug}`} className="w-full h-full block relative overflow-hidden rounded-lg">
                    <Image
                      src={game.mainImage}
                      alt={game.title}
                      className="object-cover rounded-lg transition-transform duration-300 md:group-hover:scale-105 w-full h-full"
                    />
                    {game.isComingSoon && (
                      <>
                        <div className="absolute inset-0 border-2 border-red-500 rounded-lg z-10" />
                        <div className="absolute w-full top-0 left-0 right-0 flex flex-col items-center text-center font-bold z-10">
                          <p className="bg-red-500 text-white w-fit px-2 py-1 text-xs rounded-b-md">COMING SOON</p>
                        </div>
                      </>
                    )}
                  </Link>
                  {/* Tendina che sale dal basso - solo su desktop con hover */}
                  <div className="hidden md:block absolute bottom-0 left-0 right-0 bg-black/90 rounded-t-xl transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20 p-3">
                    <h3 className="text-vitalYellow font-hitmarker-black text-xl mb-2 uppercase">
                      {game.title}
                    </h3>
                    {game.games && game.games.length > 0 && (
                      <>
                        <p className="text-xs font-hitmarker-text-regular text-white/60 mb-1.5">{dict.allGames?.contains || "Contiene:"}</p>
                        <ul className="space-y-1 mb-3 font-hitmarker-text-regular text-white/60">
                        {game.games.map((g, idx) => (
                          <li key={idx} className="flex items-center gap-1 text-white font-hitmarker-text-medium uppercase">
                            <span className="w-1 h-1 rounded-full bg-vitalYellow flex-shrink-0"></span>
                            <span>{g.name}</span>
                          </li>
                        ))}
                        </ul>
                      </>
                    )}
                    <Link href={`/${lang}/games/${game.slug}`}>
                      <Button variant="vitalYellow" className="w-full">
                        SCOPRI DI PIÙ
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">{dict.allGames?.noGames || "No games found"}</p>
          )}
        </div>
      </section>
      )}

      {/* ALLGAMES SECTION */}
      {showAllGames && (
      <section aria-labelledby="allgames-heading" className="py-8 md:py-12 px-4">
        <div className="container mx-auto">
          <h2 id="allgames-heading" 
          className="
          flex gap-1
          text-4xl md:text-5xl text-white font-hitmarker-black uppercase
          mb-8 text-left">
            All Games
            <span className="text-sm text-vitalYellow font-hitmarker-text-bold">
              ({filteredAllGames.length}{searchQuery.trim() && ` / ${allGames.length}`})
            </span>
          </h2>

          {filteredAllGames.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {filteredAllGames.map((game) => (
                <div key={game.name} className="w-full aspect-[1080/1196] block group rounded-lg overflow-hidden relative">
                  <Link href={`/${lang}/games/${game.slug}`} className="w-full h-full block relative overflow-hidden rounded-lg">
                    <Image
                      src={game.mainImage}
                      alt={game.name}
                      className="object-cover rounded-lg transition-transform duration-300 md:group-hover:scale-105 w-full h-full"
                    />
                    {game.isComingSoon && (
                      <>
                        <div className="absolute inset-0 border-2 border-red-500 rounded-lg z-10" />
                        <div className="absolute w-full top-0 left-0 right-0 flex flex-col items-center text-center font-bold z-10">
                          <p className="bg-red-500 text-white w-fit px-2 py-1 text-xs rounded-b-md">COMING SOON</p>
                        </div>
                      </>
                    )}
                  </Link>
                  {/* Tendina che sale dal basso - solo su desktop con hover */}
                  <div className="hidden text-center md:block absolute bottom-0 left-0 right-0 bg-black/90 rounded-t-xl transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20 p-3">
                    <h3 className="text-vitalYellow font-hitmarker-black text-2xl mb-2 uppercase">
                      {game.name}
                    </h3>
                    {(() => {
                      const multigame = findMultigameForGame(game.slug)
                      return multigame ? (
                        <p className="text-xs font-hitmarker-text-regular text-white/60 text-center mb-3 uppercase">
                          {dict.allGames?.partOf || "Fa parte di: "}
                          <span className="text-white font-hitmarker-text-bold ml-1">
                            {multigame.title}
                          </span>
                        </p>
                      ) : null
                    })()}
                    <Link href={`/${lang}/games/${game.slug}`}>
                      <Button variant="vitalYellow" className="w-full">
                        SCOPRI DI PIÙ
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">{dict.allGames?.noGames || "No games found"}</p>
          )}
        </div>
      </section>
      )}

      {/* ONLINE GAMES SECTION */}
      {showOnlineGames && (
      <section aria-labelledby="onlinegames-heading" className="py-8 md:py-12 px-4">
        <div className="container mx-auto">
          <h2 id="onlinegames-heading" 
            className="
            flex gap-1
            text-4xl md:text-5xl text-white font-hitmarker-black uppercase
            mb-8 text-left">            
              Online Games
            <span className="text-sm text-vitalYellow font-hitmarker-text-bold">
              ({filteredOnlineGames.length}{searchQuery.trim() && ` / ${onlineGames.length}`})
            </span>
          </h2>

          {filteredOnlineGames.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {filteredOnlineGames.map((game) => (
                <div key={game.title} className="w-full aspect-[1080/1196] block group rounded-lg overflow-hidden relative">
                  <a
                    href={game.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-full block relative overflow-hidden rounded-lg"
                  >
                    <Image
                      src={game.image}
                      alt={game.title}
                      className="object-cover rounded-lg transition-transform duration-300 md:group-hover:scale-105 w-full h-full"
                    />
                  </a>
                  {/* Tendina che sale dal basso - solo su desktop con hover */}
                  <div className="hidden text-center md:block absolute bottom-0 left-0 right-0 bg-black/90 rounded-t-xl transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20 p-3">
                    <h3 className="text-vitalYellow font-hitmarker-black text-2xl mb-2 uppercase">
                      {game.title}
                    </h3>
                    <p className="text-xs font-hitmarker-text-regular text-white/60 text-center mb-3 uppercase">
                      A GAME BY VITAL GAMES DIGITAL
                    </p>
                    <a
                      href={game.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full block"
                    >
                      <Button variant="vitalYellow" className="w-full">
                        <PlayIcon className="h-5 w-5" fill="black" />
                        PLAY DEMO
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">{dict.allGames?.noGames || "No games found"}</p>
          )}
        </div>
      </section>
      )}
    </>
  )
}

