import Link from "next/link"
import { ArrowLeft, GamepadIcon } from "lucide-react"

export default function GameNotFound() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <GamepadIcon className="w-24 h-24 text-gray-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-4 dharma">
              Gioco non trovato
            </h1>
            <p className="text-gray-400 mb-8">
              Il gioco che stai cercando non esiste o è stato rimosso.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link
              href="/it/onlinegames"
              className="inline-flex items-center gap-2 bg-vitalYellow text-black hover:bg-yellow-400 font-medium py-3 px-6 rounded-full transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Torna ai giochi online
            </Link>
            
            <div className="text-sm text-gray-500">
              <Link
                href="/it"
                className="hover:text-vitalYellow transition-colors duration-300"
              >
                Vai alla homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
