"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import OptimizedVideo from "../../components/OptimizedVideo"

interface IntroVideoProps {
  videoUrl?: string
  mobileVideoUrl?: string
  onComplete?: () => void
  fadeOutDuration?: number
}

export default function IntroVideo({
  videoUrl = "0dac21e83263ea993143b4815bd5dc43", // ⚠️ Cambia con l'ID Cloudflare
  mobileVideoUrl = "91b585031374ff0479cd52adee927aa5",
  onComplete,
  fadeOutDuration = 1000,
}: IntroVideoProps) {
  const [hasSeenVideo, setHasSeenVideo] = useState<boolean | null>(null)
  const [isFading, setIsFading] = useState(false)
  const [isClient, setIsClient] = useState(false)

  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleVideoEnd = useCallback(() => {
    setIsFading(true)

    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current)
    }

    fadeTimeoutRef.current = setTimeout(() => {
      setHasSeenVideo(true)
      onComplete?.()
    }, fadeOutDuration)
  }, [fadeOutDuration, onComplete])

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    try {
      const videoSeen = sessionStorage.getItem("videoSeen")
      if (!videoSeen) {
        sessionStorage.setItem("videoSeen", "true")
        setHasSeenVideo(false)
      } else {
        setHasSeenVideo(true)
      }
    } catch {
      setHasSeenVideo(false)
    }
  }, [isClient])

  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current)
      }
    }
  }, [])

  if (!isClient || hasSeenVideo === null || hasSeenVideo === true) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black w-screen h-screen overflow-hidden transition-opacity duration-1000 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      <OptimizedVideo
      ratio="intro"
        containerClassName="w-screen h-screen"
        className="w-screen h-screen object-cover" 
        videoId={videoUrl}   
        mobileId={mobileVideoUrl}  
      />
    </div>
  )
}
