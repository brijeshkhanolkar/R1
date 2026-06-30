const CACHE_NAME = 'goodstop-v4';
const CORE_ASSETS = [
  './',
  './index.html',
  './offline.html',
  './style.css',
  './app.js',
  './features.js',
  './manifest.json',
  './icon-192.svg',
  './og-preview.png',
];

// CDN assets — fetched with no-cors (opaque responses), so cached separately
const CDN_ASSETS = [
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap',
];

// These should never be served from cache (live APIs)
const NO_CACHE_PATTERNS = [
  'api.openai.com',
  'overpass-api.de',
  'nominatim.openstreetmap.org',
  'api.open-meteo.com',
  'api.qrserver.com',
];

// Install Event - cache core + CDN assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      console.log('[GoodStop SW] Caching core offline assets');
      // Cache core assets (same-origin, full control)
      await cache.addAll(CORE_ASSETS);
      // Cache CDN assets with no-cors (opaque — best effort)
      await Promise.allSettled(
        CDN_ASSETS.map(url =>
          fetch(url, { mode: 'no-cors' })
            .then(res => cache.put(url, res))
            .catch(() => console.log(`[GoodStop SW] Skipped CDN: ${url}`))
        )
      );
    })
  );
  self.skipWaiting();
});

// Activate Event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch Event - network first, then cache fallback for offline mode
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = event.request.url;

  // Never intercept live API calls
  if (NO_CACHE_PATTERNS.some(pattern => url.includes(pattern))) return;

  // Never intercept chrome-extension or non-http requests
  if (!url.startsWith('http')) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache successful same-origin responses only (not opaque CDN)
        if (
          response && response.status === 200 &&
          (response.type === 'basic' || response.type === 'cors')
        ) {
          const resClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, resClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Offline: serve from cache
        return caches.match(event.request).then(cached => {
          if (cached) {
            console.log(`[GoodStop SW] Offline → cache: ${url}`);
            return cached;
          }
          // For navigation requests, serve the branded offline page
          if (event.request.mode === 'navigate') {
            return caches.match('./offline.html') || caches.match('./index.html');
          }
          return new Response('', { status: 503, statusText: 'Offline' });
        });
      })
  );
});
