"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/components/language-provider"
import { OptimizedLink as Link } from "@/components/optimized-link"

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const { dictionary, lang } = useLanguage()
  const { cookieBanner } = dictionary

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem("cookiesAccepted")
    if (!cookiesAccepted) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true")
    setShowBanner(false)
  }

  const rejectCookies = () => {
    localStorage.setItem("cookiesAccepted", "false")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="mb-4 md:mb-0 md:mr-4">
            <h3 className="text-lg font-bold mb-2">{cookieBanner.title}</h3>
            <p className="text-sm text-gray-300 max-w-3xl">{cookieBanner.description}</p>

            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm text-gray-400 hover:text-white underline mt-2"
            >
              {showDetails ? cookieBanner.hideDetails : cookieBanner.showDetails}
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={acceptCookies}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              {cookieBanner.acceptButton}
            </button>
            <button
              onClick={rejectCookies}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              {cookieBanner.rejectButton}
            </button>
            <Link href={`/${lang}/privacy`} className="text-gray-300 hover:text-white px-4 py-2 text-sm font-medium">
              {cookieBanner.learnMoreLink}
            </Link>
          </div>
        </div>

        {showDetails && (
          <div className="mt-4 border-t border-gray-700 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{/* Cookie details would go here */}</div>
          </div>
        )}
      </div>
    </div>
  )
}
