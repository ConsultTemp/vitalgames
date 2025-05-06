"use client"

import Image from "next/image"
import Link from "next/link"
import logo from "../public/logovital.svg"
import { useLanguage } from "@/components/language-provider"

const Footer = () => {
  const { dictionary } = useLanguage()
  const { footer } = dictionary

  return (
    <footer className="w-full backdrop-blur-sm bg-black/10 py-8 px-6 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
        {/* Logo a sinistra */}
        <div className="md:w-1/4 mb-6 md:mb-0">
          <Link href="/">
            <Image src={logo || "/placeholder.svg"} alt="Logo" width={80} height={40} className="h-auto" />
          </Link>
        </div>

        {/* 3 colonne di link al centro */}
        <div className="md:w-1/2 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Prima colonna */}
          <div>
            <h3 className="text-sm font-bold mb-4 text-white">{footer.games}</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="#" className="text-sm text-gray-300 hover:text-white">
                {footer.allGames}
              </Link>
              <Link href="#" className="text-sm text-gray-300 hover:text-white">
                {footer.multigames}
              </Link>
              <Link href="#" className="text-sm text-gray-300 hover:text-white">
                {footer.cabinet}
              </Link>
              <Link href="#" className="text-sm text-gray-300 hover:text-white">
                {footer.onlineGames}
              </Link>
            </nav>
          </div>

          {/* Seconda colonna */}
          <div>
            <h3 className="text-sm font-bold mb-4 text-white">{footer.company}</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="#" className="text-sm text-gray-300 hover:text-white">
                {footer.aboutUs}
              </Link>
              <Link href="#" className="text-sm text-gray-300 hover:text-white">
                {footer.contactUs}
              </Link>
              <Link href="#" className="text-sm text-gray-300 hover:text-white">
                {footer.instagram}
              </Link>
            </nav>
          </div>

          {/* Terza colonna */}
          <div>
            <h3 className="text-sm font-bold mb-4 text-white">{footer.usage}</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="#" className="text-sm text-gray-300 hover:text-white">
                {footer.privacyPolicies}
              </Link>
            </nav>
          </div>
        </div>

        {/* Spazio vuoto a destra */}
        <div className="md:w-1/4"></div>
      </div>

      {/* Copyright in basso */}
      <div className="mt-8 pt-4">
        <p className="text-xs text-gray-400 text-center">{footer.copyright}</p>
      </div>
    </footer>
  )
}

export default Footer
