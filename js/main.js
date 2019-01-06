if (!('serviceWorker' in navigator)) {
	console.log("Service worker tidak didukung browser ini.");
} else {
	registerServiceWorker();
	requestPermission();
}

// Register service worker
function registerServiceWorker() {
	return navigator.serviceWorker.register('/sw-workbox.js')
	.then(function (registration) {
		console.log('Registrasi service worker berhasil.');
		return registration;
	})
	.catch(function (err) {
		console.error('Registrasi service worker gagal.', err);
	});
}

function requestPermission() {
	if ('Notification' in window) {
		Notification.requestPermission().then(function (result) {
			if (result === "denied") {
				console.log("Fitur notifikasi tidak diijinkan.");
				return;
			} else if (result === "default") {
				console.error("Pengguna menutup kotak dialog permintaan ijin.");
				return;
			}

			if (!('PushManager' in window)) {

			}

			navigator.serviceWorker.getRegistration().then(function(reg) {
				reg.pushManager.subscribe({
					userVisibleOnly: true
				}).then(function(sub) {
					console.log('Berhasil melakukan subscribe dengan endpoint: ', sub.endpoint);
					console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('p256dh')))));
					console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('auth')))));
				}).catch(function(e) {
					console.error('Tidak dapat melakukan subscribe ', e);
				});
			});
		});
	}
}