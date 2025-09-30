/*
 * Service worker для PWA. Этот файл кэширует основные страницы и
 * предоставляет базовый offline‑режим. По мере развития вашего
 * приложения вы можете расширить список ресурсов для кэширования и
 * реализовать обновление кеша. Файл регистрируется в `pages/_app.js`.
 */

const CACHE_NAME = 'booking-platform-cache-v1';
const urlsToCache = [
  '/',
  '/booking',
  '/video',
  '/chat',
  '/admin',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Обработчик push‑уведомлений. Пока он выводит текст уведомления в консоль.
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.text() : 'У вас новое уведомление!';
  event.waitUntil(
    self.registration.showNotification('Booking Platform', {
      body: data,
      icon: '/icons/icon-192.png',
    })
  );
});