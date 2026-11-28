
const CACHE_NAME = "love-luck-v2";
const FILES_TO_CACHE = [
  "./",
  "./manifest.json",
"./app-icon.svg",
  "./index.html",
  "./qr_designs.html",
  "./qr_colors.html",
  "./qr_effects.html",
  "./love_message.html",
  "./offline_qr.html",
  "./offline_message.html",
  "./qrcode.min.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch: true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
