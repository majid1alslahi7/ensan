const LEGACY_CACHE_PREFIXES = ['eusran-', 'ensan-', 'workbox-'];
const SW_CLEANUP_KEY = 'ensan-sw-cleanup-complete';

export default function ThemeScript() {
  const script = `
    (function () {
      try {
        var mode = localStorage.getItem('theme-mode');
        var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var theme = mode || (systemDark ? 'dark' : 'light');
        document.documentElement.classList.add(theme);
      } catch {}

      (async function cleanupLegacyServiceWorkers() {
        try {
          var registrations = 'serviceWorker' in navigator
            ? await navigator.serviceWorker.getRegistrations()
            : [];
          var hadLegacyServiceWorker = registrations.length > 0;

          await Promise.all(registrations.map(function (registration) {
            return registration.unregister();
          }));

          if ('caches' in window) {
            var cacheNames = await caches.keys();
            var staleCaches = cacheNames.filter(function (cacheName) {
              return ${JSON.stringify(LEGACY_CACHE_PREFIXES)}.some(function (prefix) {
                return cacheName.startsWith(prefix);
              });
            });

            await Promise.all(staleCaches.map(function (cacheName) {
              return caches.delete(cacheName);
            }));
          }

          if (
            hadLegacyServiceWorker &&
            navigator.serviceWorker.controller &&
            sessionStorage.getItem('${SW_CLEANUP_KEY}') !== '1'
          ) {
            sessionStorage.setItem('${SW_CLEANUP_KEY}', '1');
            window.location.reload();
          }
        } catch (error) {
          console.error('Service worker cleanup failed:', error);
        }
      })();
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
