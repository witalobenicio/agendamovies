//This is the service worker with the Cache-first network

var CACHE = 'agenda-precache';
var precacheFiles = [
  'logo.png',
  'index.html',
  'static/js/1.c433fdc8.chunk.js',
  'static/js/main.ae4902cd.chunk.js',
  'static/js/runtime~main.722d9bea.js',
  'static/css/main.453391c8.chunk.css',
  'static/media/noImage.a09e2762.png',
  'static/media/App.34b40d47.less',
  'static/media/BottomTabs.5c559ade.less',
  'static/media/Header.b646623a.less',
  'static/media/MovieDetail.9e9aafed.less',
  'static/media/MovieItem.ed783a22.less',
  'static/media/MovieList.f42c2077.less',
  'static/media/movies.f492e75c.less'
];

//Install stage sets up the cache-array to configure pre-cache content
self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');
  evt.waitUntil(precache().then(function() {
    console.log('Skip waiting on install');
    return self.skipWaiting();
  }));
});


//allow sw to control of current page
self.addEventListener('activate', function(event) {
  console.log('Claiming clients for current page');
  return self.clients.claim();
});

self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.'+ evt.request.url);
  evt.respondWith(fromCache(evt.request).catch(fromServer(evt.request)));
  evt.waitUntil(update(evt.request));
});


function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll(precacheFiles);
  });
}

function fromCache(request) {
  //we pull files from the cache first thing so we can show them fast
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function update(request) {
  //this is where we call the server to get the newest version of the
  //file to use the next time we show view
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}

function fromServer(request){
  //this is the fallback if it is not in the cache to go to the server and get it
  return fetch(request).then(function(response){ return response});
}
