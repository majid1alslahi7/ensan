const LEGACY_CACHE_PREFIXES = ['eusran-', 'ensan-', 'workbox-'];

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();

      await Promise.all(
        cacheNames
          .filter((cacheName) =>
            LEGACY_CACHE_PREFIXES.some((prefix) => cacheName.startsWith(prefix))
          )
          .map((cacheName) => caches.delete(cacheName))
      );

      await self.registration.unregister();

      const clients = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });

      await Promise.all(clients.map((client) => client.navigate(client.url)));
    })()
  );
});
