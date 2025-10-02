"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, Maximize } from "lucide-react"
import Hls from "hls.js"

interface SimpleVideoWithControlsProps {
  videoId: string
  className?: string
}

export default function SimpleVideoWithControls({ videoId, className }: SimpleVideoWithControlsProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<Hls | null>(null)
  
  // Video controls state
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

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

    // Video event listeners
    const handleLoadedMetadata = () => {
      console.log('Video metadata loaded, duration:', video.duration)
      setDuration(video.duration || 0)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime || 0)
    }

    const handlePlay = () => {
      console.log('Video playing - isPlaying will be true')
      setIsPlaying(true)
    }
    
    const handlePause = () => {
      console.log('Video paused - isPlaying will be false')
      setIsPlaying(false)
    }

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
  }, [videoId])

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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


  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div 
      className="relative w-full h-full"
      onMouseEnter={() => {
        console.log('Mouse enter - setting hover true')
        setIsHovering(true)
      }}
      onMouseLeave={() => {
        console.log('Mouse leave - setting hover false')  
        setIsHovering(false)
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        controls={false}
        className={`w-full h-full object-contain ${className}`}
        playsInline
      />
      
      {/* Custom Controls Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
        {/* Play/Pause Button - Center - Show always when paused, only on hover when playing */}
        {(!isPlaying || (isPlaying && isHovering)) && (
          <button
            onClick={handlePlayPause}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 hover:scale-110 transition-all duration-300 shadow-2xl"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 md:w-10 md:h-10 text-white" />
            ) : (
              <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" />
            )}
          </button>
        )}

        {/* Bottom Controls Bar - Show only when hovering or video is paused */}
        {(!isPlaying || (isPlaying && isHovering)) && (
          <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 bg-gradient-to-t from-black/90 to-transparent">
          {/* Timeline Scrubber */}
          <div className="mb-2 md:mb-4">
            <input
              type="range"
              min="0"
              max="100"
              value={duration > 0 ? (currentTime / duration) * 100 : 0}
              onChange={handleSeek}
              className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer hover:h-2 transition-all duration-200 timeline-slider"
            />
          </div>

          {/* Control Buttons Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 md:space-x-6">
              {/* Play/Pause */}
              <button
                onClick={handlePlayPause}
                className="text-white hover:text-gray-200 transition-colors p-1 md:p-2 hover:bg-white/10 rounded-full"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 md:w-6 md:h-6" />
                ) : (
                  <Play className="w-4 h-4 md:w-6 md:h-6" />
                )}
              </button>


              {/* Time Display */}
              <div className="text-white text-xs md:text-sm font-medium tracking-wide">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            {/* Fullscreen Button - Hidden on mobile */}
            {!isMobile && (
              <button
                onClick={handleFullscreen}
                className="text-white hover:text-gray-200 transition-colors p-1 md:p-2 hover:bg-white/10 rounded-full"
                aria-label="Fullscreen"
              >
                <Maximize className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            )}
          </div>
        </div>
        )}
      </div>
      
      {/* Custom CSS for sliders */}
      <style jsx>{`
        .timeline-slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
          transition: all 0.2s ease;
        }
        
        .timeline-slider:hover::-webkit-slider-thumb {
          width: 20px;
          height: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.6);
        }
        
        .timeline-slider {
          background: linear-gradient(to right, white 0%, white ${duration > 0 ? (currentTime / duration) * 100 : 0}%, rgba(255,255,255,0.3) ${duration > 0 ? (currentTime / duration) * 100 : 0}%, rgba(255,255,255,0.3) 100%);
        }
        
        .timeline-slider::-webkit-slider-track {
          background: transparent;
          height: 4px;
          border-radius: 2px;
        }
        
      `}</style>
    </div>
  )
}
