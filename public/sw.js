const CACHE_NAME = 'videoresizer-offline-v3';

const CORE_ROUTES = ['/', '/es/', '/pt/', '/de/', '/fr/', '/ja/', '/zh/', '/ru/'];

const STATIC_ASSETS = [
  '/favicon.svg',
  '/icon-192.png',
  '/icon-512.png',
  '/manifest.webmanifest',
  '/ffmpeg/ffmpeg-core.js',
  '/ffmpeg/ffmpeg-core.wasm',
  '/ffmpeg/worker.js',
  '/ffmpeg/const.js',
  '/ffmpeg/errors.js',
];

async function precacheAppShell() {
  const cache = await caches.open(CACHE_NAME);

  // Cache static PWA assets and FFmpeg WebAssembly core files
  await Promise.all(
    STATIC_ASSETS.map((url) => cache.add(url).catch(() => {}))
  );

  const discoveredAssets = new Set();

  // Fetch build-generated list of all Astro JS/CSS chunks (including nested imports like react & worker)
  try {
    const manifestRes = await fetch('/precache-manifest.json');
    if (manifestRes.ok) {
      const list = await manifestRes.json();
      if (Array.isArray(list)) {
        list.forEach((asset) => discoveredAssets.add(asset));
      }
    }
  } catch {
    // Ignore if precache manifest unavailable in dev mode
  }

  // Cache localized HTML routes and discover Astro JS/CSS bundles dynamically
  await Promise.all(
    CORE_ROUTES.map(async (route) => {
      try {
        const res = await fetch(route);
        if (!res.ok) return;
        await cache.put(route, res.clone());
        const html = await res.text();
        const matches = html.match(/\/_astro\/[A-Za-z0-9._-]+\.(js|css)/g) || [];
        matches.forEach((asset) => discoveredAssets.add(asset));
      } catch {
        // Ignore offline/network errors during install
      }
    })
  );

  await Promise.all(
    Array.from(discoveredAssets).map((assetUrl) => cache.add(assetUrl).catch(() => {}))
  );
}

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(precacheAppShell());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  // Offline-first strategy: serve from cache immediately if present, revalidate in background
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached =
        (await cache.match(event.request, { ignoreSearch: false, ignoreVary: true })) ||
        (await cache.match(url.pathname, { ignoreVary: true }));

      const isImmutable = url.pathname.startsWith('/ffmpeg/') || url.pathname.startsWith('/_astro/');
      if (cached && isImmutable) {
        return cached;
      }

      const networkPromise = fetch(event.request)
        .then((response) => {
          if (response && response.ok && response.status === 200) {
            cache.put(event.request, response.clone()).catch(() => {});
          }
          return response;
        })
        .catch(() => null);

      if (cached) {
        event.waitUntil(networkPromise);
        return cached;
      }

      const networkRes = await networkPromise;
      if (networkRes) {
        return networkRes;
      }

      // Fallback for offline navigation to uncached subpaths
      if (event.request.mode === 'navigate') {
        const fallback = await cache.match('/', { ignoreVary: true });
        if (fallback) return fallback;
      }

      return new Response('Offline', { status: 503, statusText: 'Offline' });
    })
  );
});
