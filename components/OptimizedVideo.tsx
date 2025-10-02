"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Stream } from "@cloudflare/stream-react"
import { Play, Pause } from "lucide-react"

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
  onVideoLoad?: () => void // Callback per quando il video è caricato
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
  onVideoLoad, // Callback prop
}: OptimizedCloudflareVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const streamRef = useRef<any>(null)
  const [isInView, setIsInView] = useState(!lazy)
  const [isMobile, setIsMobile] = useState<boolean | null>(null) // null = non ancora determinato
  const [isClient, setIsClient] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true) // Default playing since autoplay is on

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

  // Handler per il caricamento del video
  const handleVideoLoad = () => {
    setTimeout(() => {
      onVideoLoad?.()
    }, 200) // Delay di 200ms per permettere al video di iniziare
  }

  // Handle play/pause toggle
  const handlePlayPause = () => {
    if (streamRef.current) {
      try {
        if (isPlaying) {
          streamRef.current.pause()
          setIsPlaying(false)
        } else {
          streamRef.current.play()
          setIsPlaying(true)
        }
      } catch (error) {
        console.log('Play/pause error:', error)
        // Fallback: just toggle state
        setIsPlaying(!isPlaying)
      }
    }
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

  // Costruisci lo stile del container usando solo le proprietà necessarie
  const containerStyles: React.CSSProperties = {
    width: width || "100%",
    height: height || "auto",
    ...(aspectRatio && { aspectRatio }),
    ...(minHeight && { minHeight }),
    ...(maxHeight && { maxHeight }),
  }

  // Stile per il video Stream
  const videoStyles: React.CSSProperties = {
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
        <div style={videoStyles} className="relative">
          <Stream
            src={activeId}
            autoplay
            muted
            loop
            controls={false}
            className={cn("w-full h-full object-cover", className)}
            onLoadStart={handleVideoLoad}
            streamRef={streamRef}
          />
          
          {/* Play/Pause Button - Bottom Right */}
          <button
            onClick={handlePlayPause}
            className="absolute bottom-4 right-4 w-12 h-12 md:w-14 md:h-14 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-all duration-200 shadow-lg"
            style={{ zIndex: 999999, position: 'absolute' }}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 md:w-6 md:h-6 text-white" />
            ) : (
              <Play className="w-5 h-5 md:w-6 md:h-6 text-white ml-0.5" />
            )}
          </button>
        </div>
      )}
    </div>
  )
}