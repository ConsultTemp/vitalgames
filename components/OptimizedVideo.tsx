"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface OptimizedVideoProps {
  // Video sources
  src: string
  mobileSrc?: string
  posterImage?: string

  // Behavior
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  playsInline?: boolean
  preload?: "none" | "metadata" | "auto"

  // Styling & Layout
  className?: string
  containerClassName?: string
  width?: string | number
  height?: string | number
  objectFit?: "cover" | "contain" | "fill" | "scale-down" | "none"
  objectPosition?: string

  // Responsive
  aspectRatio?: string
  minHeight?: string
  maxHeight?: string

  // Loading & Performance
  lazy?: boolean
  priority?: boolean
  quality?: "low" | "medium" | "high"

  // Overlays & Effects
  overlay?: boolean
  overlayColor?: string
  overlayOpacity?: number
  gradient?: boolean
  gradientDirection?: "to-t" | "to-b" | "to-l" | "to-r"

  // Custom poster/fallback
  customPoster?: React.ReactNode
  showAnimatedPoster?: boolean

  // Events
  onLoadStart?: () => void
  onCanPlay?: () => void
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
  onError?: (error: Event) => void

  // Fallback
  fallbackComponent?: React.ReactNode
  showControls?: boolean
  showMobileHint?: boolean

  // Mobile specific
  mobileBreakpoint?: number
}

export default function OptimizedVideo({
  src,
  mobileSrc,
  posterImage,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  preload = "metadata",
  className,
  containerClassName,
  width,
  height,
  objectFit = "cover",
  objectPosition = "center center",
  aspectRatio,
  minHeight,
  maxHeight,
  lazy = false,
  priority = false,
  quality = "high",
  overlay = false,
  overlayColor = "black",
  overlayOpacity = 30,
  gradient = false,
  gradientDirection = "to-t",
  customPoster,
  showAnimatedPoster = false,
  onLoadStart,
  onCanPlay,
  onPlay,
  onPause,
  onEnded,
  onError,
  fallbackComponent,
  showControls = false,
  showMobileHint = true,
  mobileBreakpoint = 768,
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isInView, setIsInView] = useState(!lazy)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia(`(max-width: ${mobileBreakpoint}px)`).matches)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [mobileBreakpoint])

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || isInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [lazy, isInView])

  // Aggressive autoplay handling - integrata la logica del tuo componente hero
  useEffect(() => {
    const video = videoRef.current
    if (!video || !isInView) return

    // Listener per quando il video inizia davvero
    const handlePlay = () => {
      setIsPlaying(true)
      onPlay?.()
    }

    const handleCanPlay = () => {
      setIsLoaded(true)
      setShowVideo(true)
      onCanPlay?.()

      if (autoPlay) {
        // Tentativo aggressivo di play come nel tuo componente
        video
          .play()
          .then(() => {
            setIsPlaying(true)
          })
          .catch((error) => {
            console.log("Autoplay blocked:", error.name)
            // Non mostriamo errori, il video è pronto per il click
          })
      }
    }

    const handlePause = () => {
      setIsPlaying(false)
      onPause?.()
    }

    const handleEnded = () => {
      setIsPlaying(false)
      onEnded?.()
    }

    const handleError = (error: Event) => {
      setHasError(true)
      onError?.(error)
    }

    const handleLoadStart = () => {
      onLoadStart?.()
    }

    video.addEventListener("play", handlePlay)
    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("ended", handleEnded)
    video.addEventListener("error", handleError)
    video.addEventListener("loadstart", handleLoadStart)

    // Listener globale per QUALSIASI interazione che sblocca l'audio
    // Questa è la tecnica chiave del tuo componente hero
    let userInteracted = false
    const handleAnyInteraction = () => {
      if (!userInteracted && video && video.paused && autoPlay) {
        userInteracted = true
        video.play().catch(() => {})
        // Rimuovi listener dopo primo utilizzo
        document.removeEventListener("touchstart", handleAnyInteraction)
        document.removeEventListener("click", handleAnyInteraction)
        document.removeEventListener("scroll", handleAnyInteraction)
      }
    }

    document.addEventListener("touchstart", handleAnyInteraction, { passive: true })
    document.addEventListener("click", handleAnyInteraction)
    document.addEventListener("scroll", handleAnyInteraction, { passive: true })

    return () => {
      video?.removeEventListener("play", handlePlay)
      video?.removeEventListener("canplay", handleCanPlay)
      video?.removeEventListener("pause", handlePause)
      video?.removeEventListener("ended", handleEnded)
      video?.removeEventListener("error", handleError)
      video?.removeEventListener("loadstart", handleLoadStart)
      document.removeEventListener("touchstart", handleAnyInteraction)
      document.removeEventListener("click", handleAnyInteraction)
      document.removeEventListener("scroll", handleAnyInteraction)
    }
  }, [isInView, autoPlay, onPlay, onCanPlay, onPause, onEnded, onError, onLoadStart])

  // Video source selection
  const videoSrc = isMobile && mobileSrc ? mobileSrc : src

  // Container styles
  const containerStyles = {
    width,
    height,
    aspectRatio,
    minHeight,
    maxHeight,
  }

  // Video styles
  const videoStyles = {
    objectFit,
    objectPosition,
  }

  // Quality settings
  const getQualityProps = () => {
    switch (quality) {
      case "low":
        return { preload: "none" as const }
      case "medium":
        return { preload: "metadata" as const }
      case "high":
        return { preload: "auto" as const }
      default:
        return { preload }
    }
  }

  if (hasError && fallbackComponent) {
    return <div className={containerClassName}>{fallbackComponent}</div>
  }

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", containerClassName)} style={containerStyles}>
      <div className="relative w-full h-full">

        {/* Video element */}
        {isInView && (
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            playsInline={playsInline}
            controls={showControls}
            className={cn(
              "w-full",
              isMobile ? "h-auto" : "h-full object-cover",
              className,
            )}
            style={videoStyles}
            {...getQualityProps()}
          />
        )}

        {/* Overlay */}
        {overlay && (
          <div className={cn("absolute inset-0 pointer-events-none", `bg-${overlayColor}/${overlayOpacity}`)} />
        )}

        {/* Gradient */}
        {gradient && (
          <div
            className={cn(
              "absolute inset-0 pointer-events-none",
              `bg-gradient-${gradientDirection}`,
              "from-black/50 to-transparent",
            )}
          />
        )}
      </div>

      {/* Mobile hint - come nel tuo componente hero */}
      {showMobileHint && isMobile && !isPlaying && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 md:hidden">
          <div className="text-transparent text-xs text-center animate-bounce">Tap anywhere to start</div>
        </div>
      )}
    </div>
  )
}
