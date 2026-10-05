/**
 * Service worker (CLAUDE.md: offline audio sprites; audio is not
 * generated yet, so this caches the app shell and lesson routes and
 * leaves audio files alone). Navigation requests fall back to cache;
 * static assets are stale-while-revalidate.
 */

const CACHE = 'learn-malayalam-v1'
const PRECACHE = [
  '/',
  '/review',
  '/lesson/l1u1l1',
  '/lesson/l1u1l2',
  '/lesson/l1u1l3',
  '/lesson/l1u2l1',
  '/lesson/l1u3l1',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) return

  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request)
          const cache = await caches.open(CACHE)
          await cache.put(request, fresh.clone())
          return fresh
        } catch {
          const cached = await caches.match(request)
          if (cached) return cached
          const shell = await caches.match('/')
          return shell || Response.error()
        }
      })(),
    )
    return
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE)
      const cached = await cache.match(request)
      const network = fetch(request)
        .then((response) => {
          if (response.ok) cache.put(request, response.clone())
          return response
        })
        .catch(() => undefined)
      return cached || (await network) || Response.error()
    })(),
  )
})
