"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import FloatingImage from "../bg-image-component"
import SmoothReveal from "../smooth-reveal"
import { useLanguage } from "@/components/language-provider"
import { Button } from "../ui/button"

// Import delle immagini
import casinoroyaleHover from "../../public/multigames-cards/CASINO ROYALE_Converted.jpg"
import diamanteHover from "../../public/multigames-cards/DIAMANTE_Converted.jpg"
import luckySlot from "../../public/multigames-cards/lucky_slot.png"
import floatingImage1 from "../../public/squalorosa.png"
import fortuneUltralink from "../../public/fortune_ultralink.png"

export const multigames = [
    {
        id: 1,
        slug: "casino-royale",
        title: "Casino Royale",
        image: casinoroyaleHover,
    },
    {
        id: 2,
        slug: "diamante",
        title: "Diamante Multigame",
        image: diamanteHover,
    },
    {
        id: 3,
        slug: "fortune-ultralink",
        title: "Fortune Ultralink",
        image: fortuneUltralink,
    },
    {
        id: 4,
        slug: "lucky-slot",
        title: "Lucky Slot",
        image: luckySlot,
    },
]

export default function Multigames() {
    const { dictionary: dict } = useLanguage()
    const containerRef = useRef<HTMLElement>(null)
    const leftContentRef = useRef<HTMLDivElement>(null)
    const rightContentRef = useRef<HTMLDivElement>(null)
    
    const [scrollState, setScrollState] = useState({
        containerTop: 0,
        containerBottom: 0,
        containerHeight: 0,
        leftColumnLeft: 0,
        leftColumnWidth: 0,
        leftHeight: 0,
        rightHeight: 0
    })

    useEffect(() => {
        const updateDimensions = () => {
            if (!containerRef.current || !leftContentRef.current || !rightContentRef.current) return
            
            const containerHeight = containerRef.current.offsetHeight
            const leftHeight = leftContentRef.current.offsetHeight
            const rightHeight = rightContentRef.current.offsetHeight
            
            // Ottieni le dimensioni della colonna sinistra, non del container
            const leftColumn = leftContentRef.current.parentElement
            const leftColumnRect = leftColumn?.getBoundingClientRect()
            
            setScrollState(prev => ({ 
                ...prev, 
                containerHeight,
                leftColumnLeft: leftColumnRect?.left || 0,
                leftColumnWidth: leftColumn?.offsetWidth || 0,
                leftHeight,
                rightHeight
            }))
        }

        updateDimensions()
        window.addEventListener('resize', updateDimensions)

        const handleScroll = () => {
            if (!containerRef.current) return

            const containerRect = containerRef.current.getBoundingClientRect()
            
            // Aggiorna anche le dimensioni della colonna sinistra ad ogni scroll
            const leftColumn = leftContentRef.current?.parentElement
            const leftColumnRect = leftColumn?.getBoundingClientRect()
            
            setScrollState(prev => ({
                ...prev,
                containerTop: containerRect.top,
                containerBottom: containerRect.bottom,
                leftColumnLeft: leftColumnRect?.left || prev.leftColumnLeft,
                leftColumnWidth: leftColumn?.offsetWidth || prev.leftColumnWidth
            }))
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', updateDimensions)
        }
    }, [])

    // Calcola la posizione del contenuto di sinistra
    const getLeftContentStyle = () => {
        // Su mobile/tablet disabilita completamente l'effetto pin
        if (window.innerWidth < 768) { // md breakpoint
            return {
                position: 'relative' as const,
                top: 'auto',
                transform: 'none'
            }
        }

        const { containerTop, containerBottom, leftColumnLeft, leftColumnWidth, leftHeight } = scrollState
        const windowHeight = window.innerHeight
        
        // Punto in cui il contenuto sarebbe centrato nello schermo
        const centerPoint = (windowHeight - leftHeight) / 2
        
        // CONDIZIONI SIMMETRICHE per scroll up e down:
        
        // FASE 1: Inizio pin - quando il top del container raggiunge il punto di centratura
        const shouldStartPin = containerTop <= centerPoint
        
        // FASE 3: Fine pin - quando il bottom del container - altezza contenuto raggiunge il punto di centratura  
        const shouldEndPin = containerBottom <= centerPoint + leftHeight
        
        if (!shouldStartPin) {
            // Prima del pin - scroll normale
            return {
                position: 'relative' as const,
                top: 'auto',
                transform: 'none'
            }
        }
        
        if (shouldEndPin) {
            // Dopo il pin - scroll normale alla fine
            // Posizionare in modo che sia allineato al bottom del container
            return {
                position: 'relative' as const,
                top: 'auto',
                transform: 'none',
                marginTop: 'auto' // Questo lo spinge verso il basso nel flex container
            }
        }
        
        // FASE 2: Pin attivo - fixed al centro con posizione e larghezza corrette
        return {
            position: 'fixed' as const,
            top: '50%',
            left: `${leftColumnLeft}px`,
            transform: 'translateY(-50%)',
            width: `${leftColumnWidth}px`,
            zIndex: 50
        }
    }

    return (
        <section ref={containerRef} className="relative bg-transparent mb-16 mt-16">
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row">
                    {/* Contenuto sinistro con pin effect smooth */}
                    <div className="w-full md:w-1/2 lg:w-1/2 md:pr-8 lg:pr-16 relative flex flex-col">
                        <motion.div 
                            ref={leftContentRef}
                            style={getLeftContentStyle()}
                            transition={{ 
                                type: "tween",
                                duration: 0.1,
                                ease: "linear"
                            }}
                        >
                            <div className="absolute top-[-220px] left-[300px] z-[1] max-w-[150px] opacity-80">
                                <FloatingImage
                                    src={floatingImage1}
                                    alt="Floating Image 1"
                                    className="w-64 h-32 md:w-72 md:h-72"
                                />
                            </div>
                            
                            <div className="relative z-[1] pb-12 md:pb-0">
                                <div className="text-vitalYellow text-xs font-medium py-[3.5px]">
                                    {dict.home.multigames.subtitle}
                                </div>
                                <h2 className="text-7xl md:text-7xl lg:text-[80px] font-bold text-white dharma">
                                    {dict.home.multigames.title} <br />
                                    {dict.home.multigames.titleLine2}
                                </h2>
                                <p className="mb-8 w-3/4">
                                    {dict.home.multigames.description}
                                </p>

                                <div>
                                    <button
                                        className="bg-black  text-sm text-white rounded-full w-fit border border-1 border-white hover:bg-black hover:opacity-90 py-2 px-4"
                                    >
                                        <Link href="/awp-multigames">{dict.home.multigames.cta}</Link>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Cards container - parte destra che scorre */}
                    <div 
                        ref={rightContentRef}
                        className="w-full md:w-1/2 lg:w-1/2 flex flex-col gap-4"
                    >
                        {multigames.map((game, index) => (
                            <motion.div
                                key={game.id}
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ 
                                    duration: 0.6, 
                                    delay: index * 0.1,
                                    ease: "easeOut" 
                                }}
                                viewport={{ once: true, margin: "-50px" }}
                            >
                                <Link
                                    href={`/awp-multigames/${game.slug}`}
                                    className="w-full block group rounded-sm relative transition-all duration-300"
                                >
                                    <motion.div 
                                        className="w-full relative rounded-sm aspect-[12/9]"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Image
                                            src={game.image || "/placeholder.svg"}
                                            alt={game.title}
                                            className="object-cover w-full h-full rounded-sm"
                                            fill
                                        />
                                    </motion.div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}