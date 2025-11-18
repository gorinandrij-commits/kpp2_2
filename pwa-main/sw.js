const CACHE_NAME = 'pwa-example-v1';
// Список файлів, які потрібно закешувати
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/icons/icon-192x192.png'
];

// 1. Подія 'install' - кешування статичних файлів
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Відкрито кеш');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Подія 'fetch' - перехоплення запитів
self.addEventListener('fetch', event => {
  event.respondWith(
    // Шукаємо відповідь у кеші
    caches.match(event.request)
      .then(response => {
        // Якщо ресурс є в кеші, повертаємо його
        if (response) {
          return response;
        }
        // Інакше, робимо запит до мережі
        return fetch(event.request);
      })
  );
});
