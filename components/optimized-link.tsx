"use client"

import Link from "next/link"
import { usePerformance } from "./performance-provider"
import type { ReactNode, MouseEvent } from "react"

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

  const handleMouseEnter = () => {
    if (prefetch) {
      prefetchPage(href)
    }
  }

  const handleClick = (e: MouseEvent) => {
    if (preload) {
      // Preload the page immediately on click
      prefetchPage(href)
    }

    // Call original onClick if provided
    if (props.onClick) {
      props.onClick(e)
    }
  }

  return (
    <Link href={href} className={className} onMouseEnter={handleMouseEnter} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
