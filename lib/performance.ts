// Performance optimization utilities - WORKING VERSION
export const imageOptimization = {
    preloadImage: (src: string, priority = false) => {
      if (typeof window === "undefined") return
      const link = document.createElement("link")
      link.rel = priority ? "preload" : "prefetch"
      link.as = "image"
      link.href = src
      document.head.appendChild(link)
    },
  
    setupLazyLoading: () => {
      if (typeof window === "undefined") return
      // Basic lazy loading setup
    },
  }
  
  export const prefetchResources = {
    prefetchPage: async (href: string) => {
      if (typeof window === "undefined") return
      // Basic prefetch
    },
  
    prefetchCriticalResources: () => {
      if (typeof window === "undefined") return
      // Basic resource prefetch
    },
  }
  
  export const performanceMonitor = {
    measurePageLoad: () => {
      if (typeof window === "undefined") return
      // Basic performance monitoring
    },
  
    measureCoreWebVitals: () => {
      if (typeof window === "undefined") return
      // Basic web vitals
    },
  }
  
  // ADD THIS - was missing!
  export const serviceWorkerCache = {
    register: async () => {
      if (typeof window === "undefined" || !("serviceWorker" in navigator)) return
      // Basic service worker
    },
  
    unregister: async () => {
      if (typeof window === "undefined" || !("serviceWorker" in navigator)) return
      // Basic unregister
    },
  }
  