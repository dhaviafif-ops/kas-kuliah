const CACHE_NAME = 'kas-kuliah-v2';
const FILE_UTAMA = ['kas-kuliah.html', 'manifest.json', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILE_UTAMA))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((namaCache) =>
      Promise.all(namaCache.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
});

self.addEventListener('fetch', (e) => {
  // hanya cache request GET dari domain sendiri, request CDN (Chart.js dll) tetap ambil dari internet
  if(e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      return cached || fetch(e.request).then((res) => {
        if(res.ok && e.request.url.startsWith(self.location.origin)){
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, resClone));
        }
        return res;
      }).catch(() => cached);
    })
  );
});
const CACHE_NAME = 'kas-kuliah-v1';
const FILE_UTAMA = ['kas-kuliah.html', 'manifest.json', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILE_UTAMA))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((namaCache) =>
      Promise.all(namaCache.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
});

self.addEventListener('fetch', (e) => {
  // hanya cache request GET dari domain sendiri, request CDN (Chart.js dll) tetap ambil dari internet
  if(e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      return cached || fetch(e.request).then((res) => {
        if(res.ok && e.request.url.startsWith(self.location.origin)){
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, resClone));
        }
        return res;
      }).catch(() => cached);
    })
  );
});
