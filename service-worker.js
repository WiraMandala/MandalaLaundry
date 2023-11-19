const CACHE_NAME = 'SW-001';
const toCache = [
  "/",
  "manifest.json",
  "assets/js/register.js",
  "assets/image/MandalaLaundry.png",
];

self.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // Lakukan tindakan yang diperlukan, seperti menampilkan tombol install, dll.
  showInstallPromotion();
});

// Fungsi untuk menampilkan pesan instalasi
function showInstallPromotion() {
  // Tambahkan logika atau UI untuk menampilkan pesan instalasi di sini
  console.log('Tampilkan pesan instalasi...');
  // Contoh: Menampilkan tombol untuk menginstall aplikasi
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(toCache);
      })
      .then(self.skipWaiting())
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.open(CACHE_NAME)
          .then((cache) => {
            return cache.match(event.request);
          });
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Hapus cache lama', key);
            return caches.delete(key);
          }
        }));
      })
      .then(() => self.clients.claim())
  );
});




