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
    // Initialize performance monitoring
    performanceMonitor.measurePageLoad()
    performanceMonitor.measureCoreWebVitals()

    // Register service worker
    serviceWorkerCache.register()

    // Prefetch critical resources
    prefetchResources.prefetchCriticalResources()

    // Setup lazy loading
    imageOptimization.setupLazyLoading()

    // Cleanup on unmount
    return () => {
      // Cleanup if needed
    }
  }, [])

  const contextValue: PerformanceContextType = {
    prefetchPage: prefetchResources.prefetchPage,
    preloadImage: imageOptimization.preloadImage,
  }

  return <PerformanceContext.Provider value={contextValue}>{children}</PerformanceContext.Provider>
}
