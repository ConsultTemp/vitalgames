"use client"

import { useEffect, useState } from "react"

export default function IntroVideo() {
  const [showVideo, setShowVideo] = useState(true)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true)
      setTimeout(() => {
        setShowVideo(false)
      }, 1000) // Wait for fade out animation to complete
    }, 4000) // Start fading 1 second before video ends

    return () => clearTimeout(timer)
  }, [])

  if (!showVideo) return null

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-black w-screen h-screen overflow-hidden pointer-events-none transition-opacity duration-1000 ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <video
        autoPlay
        muted
        className="w-screen h-screen object-cover pointer-events-none"
        onEnded={() => {
          setIsFading(true)
          setTimeout(() => {
            setShowVideo(false)
          }, 1000)
        }}
      >
        <source src="https://files.catbox.moe/mwyvxd.mp4" type="video/mp4" />
      </video>
    </div>
  )
} 