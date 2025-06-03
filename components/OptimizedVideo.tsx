"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface OptimizedCloudflareVideoProps {
  videoId: string
  mobileId?: string
  className?: string
  containerClassName?: string
  width?: string | number
  height?: string | number
  objectPosition?: string
  aspectRatio?: string
  minHeight?: string
  ratio: "intro" | "hero" | "games"
  maxHeight?: string
  lazy?: boolean
  overlay?: boolean
  overlayColor?: string
  overlayOpacity?: number
  gradient?: boolean
  gradientDirection?: "to-t" | "to-b" | "to-l" | "to-r"
  fallbackComponent?: React.ReactNode
}

export default function OptimizedCloudflareVideo({
  videoId,
  mobileId,
  className,
  containerClassName,
  width = "100%",
  height = "auto",
  objectPosition = "center center",
  aspectRatio,
  minHeight,
  ratio,
  maxHeight,
  lazy = false,
  overlay = false,
  overlayColor = "black",
  overlayOpacity = 30,
  gradient = false,
  gradientDirection = "to-t",
  fallbackComponent,
}: OptimizedCloudflareVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(!lazy)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (!lazy || isInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [lazy, isInView])

  const activeId = isMobile && mobileId ? mobileId : videoId
  const iframeSrc = `https://customer-vkies7d79pqqk1lg.cloudflarestream.com/${activeId}/iframe?autoplay=true&muted=true&controls=false&loop=true&preload=auto`

  // Costruisci lo stile del container usando solo le proprietà necessarie
  const containerStyles: React.CSSProperties = {
    width: width || "100%",
    height: height || "auto",
    ...(aspectRatio && { aspectRatio }),
    ...(minHeight && { minHeight }),
    ...(maxHeight && { maxHeight }),
  }

  // Stile per l'iframe - identico al container per riempire completamente
  const iframeStyles: React.CSSProperties = {
    width: "100vw",
    height: isMobile ? "125vw" : ratio === "hero" ? "46.296vw" :  ratio === "intro"  ? "56.25vw" : "26.32vw",
    objectFit: "cover",
    objectPosition,
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative", containerClassName)}
      style={containerStyles}
    >
      {isInView && (
        <iframe
          src={iframeSrc}
          loading="lazy"
          style={iframeStyles}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          className={cn("block border-0 m-0 p-0", className)}
        />
      )}

      {overlay && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: overlayColor,
            opacity: overlayOpacity / 100,
          }}
        />
      )}

      {gradient && (
        <div
          className={cn(
            "absolute inset-0 pointer-events-none",
            `bg-gradient-${gradientDirection}`,
            "from-black/50 to-transparent"
          )}
        />
      )}
    </div>
  )
}