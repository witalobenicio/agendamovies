const cacheName = 'agenda-cache';
const cacheStatic = 'agenda-static';

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(cacheStatic)
    .then((cache) => {
      cache.addAll([
        'logo.png',
        'index.html',
        'manifest.json',
        'static/js/1.c433fdc8.chunk.js',
        'static/js/main.ae4902cd.chunk.js',
        '/static/js/1.f286e376.chunk.js',
        '/static/js/main.33009fa7.chunk.js',
        '/static/css/main.6a7cb18a.chunk.css',
        'static/js/runtime~main.722d9bea.js',
        'static/css/main.453391c8.chunk.css',
        'static/media/noImage.a09e2762.png',
        'static/media/App.34b40d47.less',
        'static/media/BottomTabs.5c559ade.less',
        'static/media/Header.b646623a.less',
        'static/media/MovieDetail.9e9aafed.less',
        'static/media/MovieItem.ed783a22.less',
        'static/media/MovieList.f42c2077.less',
        'static/media/movies.f492e75c.less',
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

