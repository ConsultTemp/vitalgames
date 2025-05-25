// Service Worker for advanced caching
const CACHE_NAME = "vitalgames-v1"
const STATIC_CACHE = "vitalgames-static-v1"
const DYNAMIC_CACHE = "vitalgames-dynamic-v1"
const IMAGE_CACHE = "vitalgames-images-v1"

// Assets to cache immediately
const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/favicon.ico",
  "/logo.svg",
  "/offline.html",
  "/_next/static/css/",
  "/_next/static/js/",
]

// Cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: "cache-first",
  NETWORK_FIRST: "network-first",
  STALE_WHILE_REVALIDATE: "stale-while-revalidate",
  NETWORK_ONLY: "network-only",
  CACHE_ONLY: "cache-only",
}

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log("Caching static assets")
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => self.skipWaiting()),
  )
})

// Activate event - clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return (
                cacheName.startsWith("vitalgames-") &&
                cacheName !== STATIC_CACHE &&
                cacheName !== DYNAMIC_CACHE &&
                cacheName !== IMAGE_CACHE
              )
            })
            .map((cacheName) => caches.delete(cacheName)),
        )
      })
      .then(() => self.clients.claim()),
  )
})

// Fetch event - implement caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== "GET") return

  // Skip external requests
  if (url.origin !== location.origin) return

  // Handle different types of requests
  if (request.destination === "image") {
    event.respondWith(handleImageRequest(request))
  } else if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(handleStaticRequest(request))
  } else if (url.pathname.startsWith("/api/")) {
    event.respondWith(handleAPIRequest(request))
  } else {
    event.respondWith(handlePageRequest(request))
  }
})

// Handle image requests - Cache First
async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE)
  const cached = await cache.match(request)

  if (cached) {
    return cached
  }

  try {
    const response = await fetch(request)
    if (response.ok) {
      cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    console.warn("Failed to fetch image:", error)
    return new Response("Image not available", { status: 404 })
  }
}

// Handle static assets - Cache First
async function handleStaticRequest(request) {
  const cache = await caches.open(STATIC_CACHE)
  const cached = await cache.match(request)

  if (cached) {
    return cached
  }

  try {
    const response = await fetch(request)
    if (response.ok) {
      cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    console.warn("Failed to fetch static asset:", error)
    return cached || new Response("Asset not available", { status: 404 })
  }
}

// Handle API requests - Network First
async function handleAPIRequest(request) {
  const cache = await caches.open(DYNAMIC_CACHE)

  try {
    const response = await fetch(request)
    if (response.ok) {
      cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    console.warn("API request failed, trying cache:", error)
    const cached = await cache.match(request)
    return cached || new Response("API not available", { status: 503 })
  }
}

// Handle page requests - Stale While Revalidate
async function handlePageRequest(request) {
  const cache = await caches.open(DYNAMIC_CACHE)
  const cached = await cache.match(request)

  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone())
      }
      return response
    })
    .catch((error) => {
      console.warn("Page request failed:", error)
      return cached || caches.match("/offline.html")
    })

  return cached || fetchPromise
}

// Background sync for offline actions
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  // Handle offline form submissions, analytics, etc.
  console.log("Background sync triggered")
}

// Push notifications
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: "/icon-192x192.png",
      badge: "/badge-72x72.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey,
      },
      actions: [
        {
          action: "explore",
          title: "Esplora",
          icon: "/icon-explore.png",
        },
        {
          action: "close",
          title: "Chiudi",
          icon: "/icon-close.png",
        },
      ],
    }

    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})

// Notification click handling
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/"))
  }
})
