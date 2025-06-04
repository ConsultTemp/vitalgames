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
  onIframeLoad?: () => void // Nuovo callback
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
  onIframeLoad, // Nuovo prop
}: OptimizedCloudflareVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(!lazy)
  const [isMobile, setIsMobile] = useState<boolean | null>(null) // null = non ancora determinato
  const [isClient, setIsClient] = useState(false)

  // Rileva se siamo sul client
  useEffect(() => {
    setIsClient(true)
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const getHeight = (isMobile: boolean, ratio: "hero" | "games" | "intro") => {
    if (isMobile && ratio === "hero")   return "125vw";
    if (isMobile && ratio === "games")  return "125vw";
    if (isMobile && ratio === "intro")  return "100vh";
    if (!isMobile && ratio === "hero")  return "46.296vw";
    if (!isMobile && ratio === "intro") return "56.25vw";
    if (!isMobile && ratio === "games") return "26.32vw";
    return "0"; // fallback se la combinazione è sconosciuta
  };

  useEffect(() => {
    if (!lazy || isInView || !isClient) return

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
  }, [lazy, isInView, isClient])

  // Handler per il caricamento dell'iframe
  const handleLoad = () => {
    // Aggiungi un piccolo delay per compensare il tempo di avvio del video
    setTimeout(() => {
      onIframeLoad?.()
    }, 200) // Delay di 200ms per permettere al video di iniziare
  }

  // Non renderizzare nulla finché non abbiamo determinato se siamo su mobile
  if (!isClient || isMobile === null) {
    return (
      <div
        ref={containerRef}
        className={cn("relative flex flex-col items-center", containerClassName)}
        style={{
          width: width || "100%",
          height: height || "auto",
          ...(aspectRatio && { aspectRatio }),
          ...(minHeight && { minHeight }),
          ...(maxHeight && { maxHeight }),
        }}
      >
        {fallbackComponent || <div className="w-full h-64 bg-gray-200 animate-pulse" />}
      </div>
    )
  }

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
    width: isMobile && ratio === "intro" ? "121.5vh" : "100vw",
    height: getHeight(isMobile, ratio),
    objectFit: "cover",
    objectPosition,
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative flex flex-col items-center", containerClassName)}
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
          onLoad={handleLoad} // Aggiungi l'event handler
        />
      )}
    </div>
  )
}