"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

type BreadcrumbItem = {
  label: string
  href?: string
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const { dictionary, lang } = useLanguage()
  const { breadcrumbs } = dictionary.common

  return (
    <nav className="flex items-center text-sm text-gray-500 py-4">
      <Link href={`/${lang}`} className="flex items-center hover:text-gray-900">
        <Home size={16} className="mr-1" />
        <span>{breadcrumbs.home}</span>
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight size={16} className="mx-2" />
          {item.href ? (
            <Link href={item.href} className="hover:text-gray-900">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
