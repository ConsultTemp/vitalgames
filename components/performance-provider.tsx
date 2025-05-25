"use client"

import { createContext, useContext, useEffect, type ReactNode } from "react"
import { serviceWorkerCache, performanceMonitor, prefetchResources, imageOptimization } from "@/lib/performance"

interface PerformanceContextType {
  prefetchPage: (href: string) => Promise<void>
  preloadImage: (src: string, priority?: boolean) => void
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined)

export function usePerformance() {
  const context = useContext(PerformanceContext)
  if (!context) {
    throw new Error("usePerformance must be used within PerformanceProvider")
  }
  return context
}

interface PerformanceProviderProps {
  children: ReactNode
}

export function PerformanceProvider({ children }: PerformanceProviderProps) {
  useEffect(() => {
    // Basic performance setup - NO ERRORS
    try {
      performanceMonitor.measurePageLoad()
      performanceMonitor.measureCoreWebVitals()
      serviceWorkerCache.register()
      prefetchResources.prefetchCriticalResources()
      imageOptimization.setupLazyLoading()
    } catch (error) {
      console.warn("Performance setup failed:", error)
    }
  }, [])

  const contextValue: PerformanceContextType = {
    prefetchPage: prefetchResources.prefetchPage,
    preloadImage: imageOptimization.preloadImage,
  }

  return <PerformanceContext.Provider value={contextValue}>{children}</PerformanceContext.Provider>
}
