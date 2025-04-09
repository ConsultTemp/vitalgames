"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export default function Footer() {
  const { dictionary, lang } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white py-6 border-t border-gray-200">
      <div className="container mx-auto px-4 text-center text-sm text-gray-600">
        <p>
          © {currentYear} - Patty Car. {dictionary.footer.rights}
        </p>
        <div className="mt-2 flex justify-center space-x-4">
          {dictionary.footer.links.map((link: any) => (
            <Link key={link.key} href={`/${lang}${link.href}`} className="hover:text-black transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}

