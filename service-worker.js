const CACHE_NAME = "SW-001";
const toCache = [
  '/',
  'manifest.json',
  'assets/image/favicon.png',
  'assets/css/style.css',
  'assets/image/MandalaLaundry.png',
  'assets/image/MandalaLaundry1.png',
  'assets/image/notifikasi.png',
  'assets/image/admin.png',
  'assets/js/splashscreen.js',
  'assets/js/notifikasi.js',
  'assets/js/admin.js',
  'assets/js/register.js',
  'laundry.js',
];

self.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // Lakukan tindakan yang diperlukan, seperti menampilkan tombol install, dll.
  showInstallPromotion();
});

// Fungsi untuk menampilkan pesan instalasi
function showInstallPromotion() {
  // Tambahkan logika atau UI untuk menampilkan pesan instalasi di sini
  console.log("Tampilkan pesan instalasi...");
  // Contoh: Menampilkan tombol untuk menginstall aplikasi
}

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(toCache);
      })
      .then(self.skipWaiting())
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          } else {
            return caches.match("/offline.html");
          }
        });
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (key !== CACHE_NAME) {
              console.log("[ServiceWorker] Hapus cache lama", key);
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});
