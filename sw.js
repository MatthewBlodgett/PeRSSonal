const CACHE_NAME = 'personal-cache-v1';

const ASSETS = [
  '/index.html',
  '/manifest.json'
];

// Install: cache app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch: network first, fallback to cache, offline fallback
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Skip non-HTTP(S) requests
  const url = new URL(event.request.url);
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful responses
        if (response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });
        }
        return response;
      })
      .catch(() => {
        // Try cache, then show offline fallback
        return caches.match(event.request).then((cached) => {
          if (cached) return cached;
          // For navigation requests, serve index.html (SPA fallback)
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          return new Response(
            JSON.stringify({ offline: true, message: 'You are offline. Some content may not be available.' }),
            { headers: { 'Content-Type': 'application/json' } }
          );
        });
      })
  );
});