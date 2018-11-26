/* eslint-disable no-undef */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

if (workbox) {
  console.log('Yay! Workbox is loaded 🎉');
} else {
  console.log('Boo! Workbox didn\'t load 😬');
}

const bgSyncPlugin = new workbox.backgroundSync.Plugin('todoQueue', {
  maxRetentionTime: 24 * 60,
});

workbox.routing.registerRoute(
  /\.(?:js|css|html|png)$/,
  workbox.strategies.networkFirst(),
);

workbox.routing.registerRoute(
  new RegExp('/static/*'),
  workbox.strategies.networkFirst(),
);

workbox.routing.registerRoute(
  'logo.png',
  workbox.strategies.networkFirst(),
);

workbox.routing.registerRoute(
  'http://localhost:3000',
  workbox.strategies.networkFirst(),
);

workbox.routing.registerRoute(
  'http://localhost:3000/movies/*',
  workbox.strategies.networkFirst(),
);

workbox.routing.registerRoute(
  new RegExp('https://api.themoviedb.org/3/*'),
  workbox.strategies.networkFirst(),
);
