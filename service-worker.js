const cacheName = 'app-cache-v1';
const cacheFiles = [
  "/",
  "manifest.json",
  "assets/js/register.js",
  "assets/image/MandalaLaundry.png",
  // Tambahkan file lain yang ingin Anda cache di sini
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== cacheName) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const clonedResponse = response.clone();

        caches.open(cacheName).then((cache) => {
          cache.put(event.request, clonedResponse);
        });

        return response;
      });
    }).catch(() => {
      // Jika gagal melakukan fetch dan tidak ada cache, tampilkan halaman fallback
      return caches.match('/offline.html');
    })
  );
});



