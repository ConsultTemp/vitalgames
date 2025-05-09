"use client"

import { useEffect, useState } from "react"

export default function IntroVideo() {
  // Stato per verificare se l'utente ha già visto il video
  const [hasSeenVideo, setHasSeenVideo] = useState(true) // Inizia con true per evitare flash durante idratazione
  const [isFading, setIsFading] = useState(false)
  
  useEffect(() => {
    // Controlla se il video è già stato visto in questa sessione
    const videoSeen = sessionStorage.getItem('videoSeen')
    
    // Se non è stato visto, imposta lo stato per mostrarlo
    if (!videoSeen) {
      setHasSeenVideo(false)
      sessionStorage.setItem('videoSeen', 'true')
    }
  }, [])
  
  // Non renderizzare nulla se l'utente ha già visto il video
  if (hasSeenVideo) {
    return null
  }
  
  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-black w-screen h-screen overflow-hidden pointer-events-none transition-opacity duration-1000 ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <video
        autoPlay
        muted
        playsInline
        className="w-screen h-screen object-cover"
        onEnded={() => {
          // Avvia il fade out quando il video termina
          setIsFading(true)
          // Rimuovi il componente completamente dopo che il fade è terminato
          setTimeout(() => {
            setHasSeenVideo(true)
          }, 1000) // 1 secondo per il fade out
        }}
      >
        <source src="https://files.catbox.moe/mwyvxd.mp4" type="video/mp4" />
      </video>
    </div>
  )
}