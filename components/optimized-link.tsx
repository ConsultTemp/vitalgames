"use client"

import Link from "next/link"
import { usePerformance } from "./performance-provider"
import type { ReactNode, MouseEvent } from "react"
import { usePathname, useRouter } from "next/navigation"

interface OptimizedLinkProps {
  href: string
  children: ReactNode
  className?: string
  prefetch?: boolean
  preload?: boolean
  [key: string]: any
}

export function OptimizedLink({
  href,
  children,
  className,
  prefetch = true,
  preload = false,
  ...props
}: OptimizedLinkProps) {
  const { prefetchPage } = usePerformance()
  const pathname = usePathname()
  const router = useRouter()

  // Prendi la lingua dalla pathname
  const pathLang = pathname.split('/')[1]
  const validLangs = ['it', 'en', 'es']
  const currentLang = validLangs.includes(pathLang) ? pathLang : 'it'

  // Costruisci href con la lingua attuale
  let finalHref = href
  if (!href.startsWith(`/${currentLang}`)) {
    if (href.startsWith('/')) {
      finalHref = `/${currentLang}${href}`
    } else {
      finalHref = `/${currentLang}/${href}`
    }
  }

  const handleMouseEnter = () => {
    if (prefetch) {
      prefetchPage(finalHref)
    }
  }

  const handleClick = (e: MouseEvent) => {
    if (preload) {
      prefetchPage(finalHref)
    }
    e.preventDefault()
    router.push(finalHref)
    if (props.onClick) {
      props.onClick(e)
    }
  }

  return (
    <Link
      href={finalHref}
      className={className}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  )
}
