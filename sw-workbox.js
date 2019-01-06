importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');
const BASE_URL = "http://api.football-data.org/v2/"

if (workbox) {
	console.log('workbox loaded')
}else{
	console.log('workbox no loaded')
}

workbox.precaching.precacheAndRoute([
    "/",
	"/manifest.json",
	"/css/materialize.css",
	"/css/materialize.min.css",
	"/img/icon.png",
	"/img/no-image.png",
	"/js/api.js",
	"/js/main.js",
	"/js/materialize.js",
	"/js/materialize.min.js",
	"/js/nav.js",
	"/pages/fav-match.html",
	"/pages/match.html",
	"/pages/about.html",
	"/detail-match.html",
	"/js/database.js",
	"/js/idb.js",
	"/js/notification.js",

    { url: '/index.html', revision: '2' },
]);

workbox.routing.registerRoute(
	new RegExp('.*\.js'),
	workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
	new RegExp('/css/materialize.min.css'),
	workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
	new RegExp('.*\.png'),
	workbox.strategies.cacheFirst()
);

// workbox.routing.registerRoute(
// 	BASE_URL + "matches",
// 	workbox.strategies.networkFirst({
// 	    cacheName: 'data-cache',
// 	    plugins: [
// 	      new workbox.expiration.Plugin({
// 	        maxEntries: 20,
// 	        maxAgeSeconds: 30 * 24 * 60 * 60,
// 	      })
// 	    ],
// 	})
// );


self.addEventListener('push', function(event){
	var body

	if (event.data) {
		body = event.data.text()
	}else{
		body = "halo ini dari cURL"
	}

	var options = {
		body: body,
		icon: 'img/icon.png',
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1
		}
	}

	event.waitUntil(
		self.registration.showNotification('Push Notification', options)
	)
})