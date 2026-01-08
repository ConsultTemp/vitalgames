"use client"

import { useEffect, useRef } from "react"
import Hls from "hls.js"

interface SimpleVideoWithControlsProps {
  videoId: string
  className?: string
}

export default function SimpleVideoWithControls({ videoId, className }: SimpleVideoWithControlsProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<Hls | null>(null)

  // Initialize HLS video
  useEffect(() => {
    if (!videoRef.current || !videoId) return

    const video = videoRef.current
    const hlsUrl = `https://customer-vkies7d79pqqk1lg.cloudflarestream.com/${videoId}/manifest/video.m3u8`

    console.log('Loading video:', hlsUrl)

    if (Hls.isSupported()) {
      // Use hls.js for browsers that don't support HLS natively
      const hls = new Hls()
      hlsRef.current = hls
      hls.loadSource(hlsUrl)
      hls.attachMedia(video)
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('HLS manifest loaded successfully')
      })

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS error:', data)
      })
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari supports HLS natively
      video.src = hlsUrl
      console.log('Using native HLS support')
    } else {
      console.error('HLS not supported')
    }

    // Cleanup function
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy()
        hlsRef.current = null
      }
    }
  }, [videoId])

  return (
    <div className={`relative ${className || ''}`}>
      <video
        ref={videoRef}
        controls
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-auto"
        style={{ borderRadius: '0px' }}
      />
    </div>
  )
}