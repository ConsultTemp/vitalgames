'use client'

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import SmoothReveal from "../smooth-reveal"
import type { Locale } from "@/i18n-config"

interface Multigame {
  slug: string
  title: string
  mainImage: any
  isComingSoon?: boolean
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
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={dict.allGames?.filters?.search || "Search games..."}
            className="w-full mx-auto bg-gray-800 text-white text-[16px] rounded-full px-6 py-3"
          />
          
          {/* Filter buttons */}
          <div className="flex flex-wrap gap-4 mt-4 justify-start">
            <button
              type="button"
              onClick={() => handleTypeChange(null)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                selectedType === null
                  ? 'bg-vitalYellow text-black border-0'
                  : 'bg-black text-white border border-white'
              }`}
            >
              {dict.allGames?.filters?.all || "All"}
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('online-games')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                selectedType === 'online-games'
                  ? 'bg-vitalYellow text-black border-0'
                  : 'bg-black text-white border border-white'
              }`}
            >
              Online Games
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('awp-multigames')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                selectedType === 'awp-multigames'
                  ? 'bg-vitalYellow text-black border-0'
                  : 'bg-black text-white border border-white'
              }`}
            >
              AWP Multigames
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('all-games')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                selectedType === 'all-games'
                  ? 'bg-vitalYellow text-black border-0'
                  : 'bg-black text-white border border-white'
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
          <h2 id="multigames-heading" className="text-4xl md:text-5xl font-bold text-white mb-8 text-left dharma flex items-center gap-3">
            AWP Multigames
            <span className="text-2xl md:text-3xl text-gray-400 font-normal">
              ({filteredMultigames.length}{searchQuery.trim() && ` / ${multigames.length}`})
            </span>
          </h2>

          {filteredMultigames.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {filteredMultigames.map((game) => (
                <SmoothReveal key={game.slug}>
                  <Link href={`/${lang}/games/${game.slug}`} className="w-full aspect-[1080/1196] block group rounded-lg overflow-hidden relative">
                    <Image
                      src={game.mainImage}
                      alt={game.title}
                      className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 w-full h-full"
                    />
                    {game.isComingSoon && (
                      <>
                        <div className="absolute inset-0 border-2 border-red-500 rounded-lg" />
                        <div className="absolute w-full top-0 left-0 right-0 flex flex-col items-center text-center font-bold">
                          <p className="bg-red-500 text-white w-fit px-2 py-1 text-xs rounded-b-md">COMING SOON</p>
                        </div>
                      </>
                    )}
                  </Link>
                </SmoothReveal>
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
          <h2 id="allgames-heading" className="text-4xl md:text-5xl font-bold text-white mb-8 text-left dharma flex items-center gap-3">
            All Games
            <span className="text-2xl md:text-3xl text-gray-400 font-normal">
              ({filteredAllGames.length}{searchQuery.trim() && ` / ${allGames.length}`})
            </span>
          </h2>

          {filteredAllGames.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {filteredAllGames.map((game) => (
                <SmoothReveal key={game.name}>
                  <Link href={`/${lang}/games/${game.slug}`} className="w-full aspect-[1080/1196] block group rounded-lg overflow-hidden relative">
                    <Image
                      src={game.mainImage}
                      alt={game.name}
                      className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 w-full h-full"
                    />
                    {game.isComingSoon && (
                      <>
                        <div className="absolute inset-0 border-2 border-red-500 rounded-lg" />
                        <div className="absolute w-full top-0 left-0 right-0 flex flex-col items-center text-center font-bold">
                          <p className="bg-red-500 text-white w-fit px-2 py-1 text-xs rounded-b-md">COMING SOON</p>
                        </div>
                      </>
                    )}
                  </Link>
                </SmoothReveal>
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
          <h2 id="onlinegames-heading" className="text-4xl md:text-5xl font-bold text-white mb-8 text-left dharma flex items-center gap-3">
            Online Games
            <span className="text-2xl md:text-3xl text-gray-400 font-normal">
              ({filteredOnlineGames.length}{searchQuery.trim() && ` / ${onlineGames.length}`})
            </span>
          </h2>

          {filteredOnlineGames.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {filteredOnlineGames.map((game) => (
                <SmoothReveal key={game.title}>
                  <a
                    href={game.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full aspect-[1080/1196] block group rounded-lg overflow-hidden relative"
                  >
                    <Image
                      src={game.image}
                      alt={game.title}
                      className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 w-full h-full"
                    />
                  </a>
                </SmoothReveal>
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

