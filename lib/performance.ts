// Performance optimization utilities
import { memoryCache } from "./memory-cache";

// Add type declarations for window.gtag
declare global {
  interface Window {
    gtag: (command: string, action: string, params: any) => void;
  }
}

// Add type declarations for PerformanceEntry
interface FirstInputEntry extends PerformanceEntry {
  processingStart: number;
}

interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
}

// Image optimization
export const imageOptimization = {
  // Preload critical images
  preloadImage: (src: string, priority = false) => {
    if (typeof window === "undefined") return

    const link = document.createElement("link")
    link.rel = priority ? "preload" : "prefetch"
    link.as = "image"
    link.href = src
    document.head.appendChild(link)
  },

  // Lazy load images with intersection observer
  setupLazyLoading: () => {
    if (typeof window === "undefined") return

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.classList.remove("lazy")
            observer.unobserve(img)
          }
        }
      })
    })

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img)
    })
  },
}

// Resource prefetching
export const prefetchResources = {
  // Prefetch page data
  prefetchPage: async (href: string) => {
    if (typeof window === "undefined") return

    const cacheKey = `page_${href}`
    const cached = memoryCache.get(cacheKey)

    if (cached) return cached

    try {
      const response = await fetch(href, {
        method: "HEAD",
        cache: "force-cache",
      })

      if (response.ok) {
        memoryCache.set(cacheKey, true, 600000) // 10 minutes
      }
    } catch (error) {
      console.warn("Failed to prefetch page:", error)
    }
  },

  // Prefetch critical resources
  prefetchCriticalResources: () => {
    if (typeof window === "undefined") return

    const criticalResources = ["/fonts/inter-var.woff2", "/logo.svg", "/fleethero.jpg"]

    criticalResources.forEach((resource) => {
      const link = document.createElement("link")
      link.rel = "prefetch"
      link.href = resource
      document.head.appendChild(link)
    })
  },
}

// Service Worker for advanced caching
export const serviceWorkerCache = {
  register: async () => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return

    try {
      const registration = await navigator.serviceWorker.register("/sw.js")
      console.log("Service Worker registered:", registration)

      // Update service worker
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              // New content available
              console.log("New content available, please refresh")
            }
          })
        }
      })
    } catch (error) {
      console.warn("Service Worker registration failed:", error)
    }
  },

  unregister: async () => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return

    try {
      const registrations = await navigator.serviceWorker.getRegistrations()
      await Promise.all(registrations.map((registration) => registration.unregister()))
    } catch (error) {
      console.warn("Service Worker unregistration failed:", error)
    }
  },
}

// Performance monitoring
export const performanceMonitor = {
  // Measure page load time
  measurePageLoad: () => {
    if (typeof window === "undefined") return

    window.addEventListener("load", () => {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
      const loadTime = navigation.loadEventEnd - navigation.fetchStart

      console.log(`Page load time: ${loadTime}ms`)

      // Send to analytics if needed
      if (window.gtag) {
        window.gtag("event", "page_load_time", {
          value: Math.round(loadTime),
          custom_parameter: "vitalgames_performance",
        })
      }
    })
  },

  // Measure Core Web Vitals
  measureCoreWebVitals: () => {
    if (typeof window === "undefined") return

    // Largest Contentful Paint
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const lastEntry = entries[entries.length - 1]
      console.log("LCP:", lastEntry.startTime)
    }).observe({ entryTypes: ["largest-contentful-paint"] })

    // First Input Delay
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      entries.forEach((entry) => {
        const firstInputEntry = entry as FirstInputEntry
        console.log("FID:", firstInputEntry.processingStart - firstInputEntry.startTime)
      })
    }).observe({ entryTypes: ["first-input"] })

    // Cumulative Layout Shift
    let clsValue = 0
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      entries.forEach((entry) => {
        const layoutShiftEntry = entry as LayoutShiftEntry
        if (!layoutShiftEntry.hadRecentInput) {
          clsValue += layoutShiftEntry.value
        }
      })
      console.log("CLS:", clsValue)
    }).observe({ entryTypes: ["layout-shift"] })
  },
}

// Bundle optimization
export const bundleOptimization = {
  // Dynamic imports for heavy components
  loadComponent: async (componentPath: string) => {
    const cacheKey = `component_${componentPath}`
    const cached = memoryCache.get(cacheKey)

    if (cached) return cached

    try {
      const component = await import(`@/components/${componentPath}`)
      memoryCache.set(cacheKey, component, 300000) // 5 minutes
      return component
    } catch (error) {
      console.warn(`Failed to load component ${componentPath}:`, error)
      return null
    }
  },

  // Preload critical chunks
  preloadCriticalChunks: () => {
    if (typeof window === "undefined") return

    const criticalChunks = [
      "/_next/static/chunks/pages/_app.js",
      "/_next/static/chunks/main.js",
      "/_next/static/chunks/webpack.js",
    ]

    criticalChunks.forEach((chunk) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.as = "script"
      link.href = chunk
      document.head.appendChild(link)
    })
  },
}
