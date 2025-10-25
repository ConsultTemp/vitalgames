"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, Maximize, VolumeX, Volume1, Volume2 } from "lucide-react"
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
  const [aspectRatio, setAspectRatio] = useState<number | null>(null)
  
  // Volume controls state
  const [volume, setVolume] = useState(1.0)
  const [isMuted, setIsMuted] = useState(false)
  const [previousVolume, setPreviousVolume] = useState(1.0)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)

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
      
      // Calculate aspect ratio from video dimensions
      if (video.videoWidth && video.videoHeight) {
        const ratio = video.videoWidth / video.videoHeight
        setAspectRatio(ratio)
        console.log('Video aspect ratio:', ratio, `(${video.videoWidth}x${video.videoHeight})`)
      }
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
    
    // Initialize video volume
    video.volume = volume
    video.muted = isMuted

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
  }, [videoId, volume, isMuted])

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

  // Volume control handlers
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
    
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      videoRef.current.muted = newVolume === 0
    }
  }

  const handleMuteToggle = () => {
    if (videoRef.current) {
      if (isMuted) {
        // Unmute: restore previous volume
        const volumeToRestore = previousVolume > 0 ? previousVolume : 0.5
        setVolume(volumeToRestore)
        setIsMuted(false)
        videoRef.current.volume = volumeToRestore
        videoRef.current.muted = false
      } else {
        // Mute: save current volume and set to 0
        setPreviousVolume(volume)
        setVolume(0)
        setIsMuted(true)
        videoRef.current.volume = 0
        videoRef.current.muted = true
      }
    }
  }

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return VolumeX
    if (volume < 0.5) return Volume1
    return Volume2
  }

  return (
    <div 
      className="relative h-max flex flex-column items-center justify-center"
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
        className={``}
        playsInline
        style={{ height: '100%' , borderRadius: '0px'}}
      />
      
      {/* Custom Controls Overlay */}
      <div className="absolute h-full w-full inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
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

              {/* Volume Control */}
              <div className="relative">
                <button
                  onClick={handleMuteToggle}
                  onMouseEnter={() => setShowVolumeSlider(true)}
                  onMouseLeave={() => setShowVolumeSlider(false)}
                  className="text-white hover:text-gray-200 transition-colors p-1 md:p-2 hover:bg-white/10 rounded-full"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {(() => {
                    const VolumeIcon = getVolumeIcon()
                    return <VolumeIcon className="w-4 h-4 md:w-6 md:h-6" />
                  })()}
                </button>

                {/* Volume Slider Popup */}
                {showVolumeSlider && (
                  <div 
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black/90 backdrop-blur-sm rounded-lg p-2 volume-slider-container"
                    onMouseEnter={() => setShowVolumeSlider(true)}
                    onMouseLeave={() => setShowVolumeSlider(false)}
                  >
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="volume-slider h-20 w-1 bg-white/30 rounded-full appearance-none cursor-pointer"
                      style={{ writingMode: 'vertical-lr' as const, WebkitAppearance: 'slider-vertical' }}
                      aria-label="Volume"
                    />
                  </div>
                )}
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
        
        /* Volume Slider Styles */
        .volume-slider {
          writing-mode: vertical-lr;
          -webkit-appearance: slider-vertical; /* WebKit */
          background: linear-gradient(to top, white 0%, white ${volume * 100}%, rgba(255,255,255,0.3) ${volume * 100}%, rgba(255,255,255,0.3) 100%);
        }
        
        .volume-slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0,0,0,0.4);
          transition: all 0.2s ease;
        }
        
        .volume-slider:hover::-webkit-slider-thumb {
          width: 16px;
          height: 16px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.6);
        }
        
        .volume-slider::-webkit-slider-track {
          background: transparent;
          width: 4px;
          border-radius: 2px;
        }
        
        .volume-slider-container {
          animation: fadeInUp 0.2s ease-out;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px) translateX(-50%);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(-50%);
          }
        }
        
      `}</style>
    </div>
  )
}
