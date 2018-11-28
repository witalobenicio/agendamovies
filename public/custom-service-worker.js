/* eslint-disable no-undef */
// importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');
//
// if (workbox) {
//   console.log('Yay! Workbox is loaded 🎉');
// } else {
//   console.log('Boo! Workbox didn\'t load 😬');
// }
//
// const bgSyncPlugin = new workbox.backgroundSync.Plugin('todoQueue', {
//   maxRetentionTime: 24 * 60,
// });
//
// workbox.routing.registerRoute(
//   /\.(?:js|css|html|png)$/,
//   workbox.strategies.networkFirst(),
// );
//
// workbox.routing.registerRoute(
//   '/static/*',
//   workbox.strategies.networkFirst(),
// );
//
// workbox.routing.registerRoute(
//   'custom-service-worker.js',
//   workbox.strategies.networkFirst(),
// );
//
// workbox.routing.registerRoute(
//   'logo.png',
//   workbox.strategies.networkFirst(),
// );
//
// workbox.routing.registerRoute(
//   'http://localhost:3000',
//   workbox.strategies.networkFirst(),
// );
//
// workbox.routing.registerRoute(
//   'http://localhost:3000/movies/*',
//   workbox.strategies.networkFirst(),
// );
//
// workbox.routing.registerRoute(
//   'https://api.themoviedb.org/3/',
//   workbox.strategies.networkFirst(),
// );

const cacheName = process.env.REACT_APP_CACHE_DYNAMIC;
const cacheStatic = process.env.REACT_APP_CACHE_STATIC;

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(cacheStatic)
    .then((cache) => {
      cache.addAll([
        'logo.png', // offline page
        'bundle.css',
        'bundle.js',
        'favicon.ico',
      ]);
    }));
});

self.addEventListener('activate', (event) => {
  console.log('Activating Service Worker ....', event);
  event.waitUntil(caches.keys()
    .then((keyList) => Promise.all(keyList.map((key) => {
      if (key !== cacheStatic && key !== cacheName) {
        return caches.delete(key);
      }
    }))));
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    // Try the network
    fetch(event.request)
      .then((res) => caches.open(cacheName)
        .then((cache) => {
          cache.put(event.request.url, res.clone());
          return res;
        }))
      .catch((err) =>
        caches.match(event.request)
          .then((res) => {
            if (res === undefined) {
              return null;
            }
            return res;
          })));
});
