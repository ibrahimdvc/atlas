const CACHE_NAME = 'atlas-v3-cache-20';
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
  './sesler/pati hareketi yaparken sesi.mp3',
  './atlas_sprite_8_portre.png',
  './atlas_icon_192.png',
  './atlas_icon_512.png',
  './top.webp',
  './pelus.webp'
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
  const url = new URL(event.request.url);
  const isMedia = /\.(mp4|mp3|webp|png|jpe?g)$/i.test(url.pathname);

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
    }).catch(() => isMedia ? Response.error() : caches.match('./atlas-oyunu-v3.html')))
  );
});
