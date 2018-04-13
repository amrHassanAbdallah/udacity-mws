let staticCacheName = 'restaurant-static-v1';
const filesToCache = [
    '.',
    'index.html',
    'restaurant.html',
    'css/styles.css',
    'css/style.min.css',
    'js/dbhelper.js',
    'js/main.js',
    'js/restaurant_info.js',
    'index.html?launcher=true',
    'http://localhost:1337/restaurants',
    'img/1-640_medium.webp',
    'img/2-640_medium.webp',
    'img/3-640_medium.webp',
    'img/4-640_medium.webp',
    'img/5-640_medium.webp',
    'img/6-640_medium.webp',
    'img/7-640_medium.webp',
    'img/8-640_medium.webp',
    'img/9-640_medium.webp',
    'img/10-640_medium.webp',

];
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');
if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
    workbox.routing.registerRoute(
        // Cache image files
        /.*\.(?:png|jpg|jpeg|svg|gif|webp)/,
        // Use the cache if it's available
        workbox.strategies.cacheFirst({
            // Use a custom cache name
            cacheName: staticCacheName,
            plugins: [
                new workbox.expiration.Plugin({
                    // Cache only 40 images
                    maxEntries: 40,
                    // Cache for a maximum of a week
                    maxAgeSeconds: 7 * 24 * 60 * 60,
                })
            ],
        })
    );
    workbox.routing.registerRoute(
        new RegExp('^https://fonts.(?:googleapis|gstatic).com/(.*)'),
        workbox.strategies.cacheFirst(),
    );
    workbox.routing.registerRoute(
        new RegExp('^https://maps.googleapis.com/maps/api/js/(.*)'),
        workbox.strategies.cacheFirst(),
    );
    workbox.routing.registerRoute(
        /\.(?:js|css)$/,
        workbox.strategies.staleWhileRevalidate(),
    );
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

//Deleting old worker
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith('restaurant-') && cacheName != staticCacheName;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

//fetching requests
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) return response;
            return fetch(event.request)
        }).catch(function (err) {
            console.log(err);
        })
    );
});

self.addEventListener('message', function (event) {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});


self.addEventListener('sync', function (event) {
    event.waitUntil(
        store.outbox('readonly').then(function (outbox) {
            return outbox.getAll();
        }).then(function (messages) {
            console.log(messages);
            return Promise.all(messages.map(function (message) {
                let url = message.url;
                return fetch(url, {
                    method: message.method,
                    body: JSON.stringify(message.data),
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type': 'application/json'
                    }
                }).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    if (data.result === 'success') {
                        return store.outbox('readwrite').then(function (outbox) {
                            return outbox.delete(message.id);
                        });
                    }
                });
            }));
            // send the messages
        }).catch(function (err) {
            console.error(err);
        })
    );
});