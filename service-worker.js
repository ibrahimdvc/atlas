const CACHE_NAME = 'atlas-v3-cache-7';
const ASSETS = [
  './',
  './index.html',
  './atlas-oyunu-v3.html',
  './manifest.webmanifest',
  './atlas_sfx_pack.mp3',
  './sesler/magnific_kopek-su-icme-sesi_mCpPIq8hJQ.mp3',
  './sesler/magnific_kopek-mama-yeme-sesi_nT65AzhYQD.mp3',
  './sesler/magnific_poddle-kopek-cis-yapma-se_62wC2poiJO.mp3',
  './sesler/magnific_poddle-kopek-kosma-sesi-p_rlQ0kn5xtc.mp3',
  './atlas_sprite_8_portre.png',
  './atlas_icon_192.png',
  './atlas_icon_512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put('./atlas-oyunu-v3.html', copy));
        return response;
      }).catch(() => caches.match('./atlas-oyunu-v3.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match('./atlas-oyunu-v3.html')))
  );
});
