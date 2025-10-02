"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react"
import Hls from "hls.js"

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

export default function OptimizedCloudflareVideoWithControls({
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
  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<Hls | null>(null)
  const [isInView, setIsInView] = useState(!lazy)
  const [isMobile, setIsMobile] = useState<boolean | null>(null) // null = non ancora determinato
  const [isClient, setIsClient] = useState(false)
  
  // Video controls state
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

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

  // Video control handlers
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current && duration > 0) {
      const newTime = (parseFloat(event.target.value) / 100) * duration
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value) / 100
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setIsMuted(newVolume === 0)
    }
  }

  const handleMuteToggle = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume
        setIsMuted(false)
      } else {
        videoRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Show/hide controls on hover
  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (isHovering) {
      setShowControls(true)
    } else {
      timeout = setTimeout(() => setShowControls(false), 2000)
    }
    return () => clearTimeout(timeout)
  }, [isHovering])

  // Initialize HLS video
  useEffect(() => {
    if (!isInView || !videoRef.current || !videoId) return

    const video = videoRef.current
    const hlsUrl = `https://customer-vkies7d79pqqk1lg.cloudflarestream.com/${videoId}/manifest/video.m3u8`

    if (Hls.isSupported()) {
      // Use hls.js for browsers that don't support HLS natively
      const hls = new Hls()
      hlsRef.current = hls
      hls.loadSource(hlsUrl)
      hls.attachMedia(video)
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('HLS manifest loaded')
      })
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari supports HLS natively
      video.src = hlsUrl
    }

    // Video event listeners
    const handleLoadedMetadata = () => {
      setDuration(video.duration || 0)
      onVideoLoad?.()
    }

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime || 0)
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    // Cleanup function
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      
      if (hlsRef.current) {
        hlsRef.current.destroy()
        hlsRef.current = null
      }
    }
  }, [isInView, videoId, onVideoLoad])

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
      className={cn("relative flex flex-col items-center group", containerClassName)}
      style={containerStyles}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isInView && (
        <div style={videoStyles} className="relative">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            controls={false}
            className={cn("w-full h-full object-cover", className)}
            playsInline
          />
          
          {/* Custom Controls Overlay */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300",
            showControls || isHovering ? "opacity-100" : "opacity-0"
          )}>
            {/* Play/Pause Button - Center */}
            <button
              onClick={handlePlayPause}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-200"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white ml-1" />
              )}
            </button>

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              {/* Timeline Scrubber */}
              <div className="mb-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={duration > 0 ? (currentTime / duration) * 100 : 0}
                  onChange={handleSeek}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #ff6b6b 0%, #ff6b6b ${duration > 0 ? (currentTime / duration) * 100 : 0}%, rgba(255,255,255,0.2) ${duration > 0 ? (currentTime / duration) * 100 : 0}%, rgba(255,255,255,0.2) 100%)`
                  }}
                />
              </div>

              {/* Control Buttons Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Play/Pause */}
                  <button
                    onClick={handlePlayPause}
                    className="text-white hover:text-gray-300 transition-colors"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </button>

                  {/* Volume */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleMuteToggle}
                      className="text-white hover:text-gray-300 transition-colors"
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={isMuted ? 0 : volume * 100}
                      onChange={handleVolumeChange}
                      className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Time Display */}
                  <div className="text-white text-sm font-mono">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

                {/* Fullscreen */}
                <button
                  onClick={handleFullscreen}
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label="Fullscreen"
                >
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Custom CSS for sliders */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ff6b6b;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ff6b6b;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  )
}
