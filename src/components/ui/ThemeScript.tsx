'use client';
import { useEffect } from 'react';

const LEGACY_CACHE_PREFIXES = ['eusran-', 'ensan-', 'workbox-'];
const SW_CLEANUP_KEY = 'ensan-sw-cleanup-complete';

export default function ThemeScript() {
  useEffect(() => {
    // تطبيق الثيم
    try {
      const mode = localStorage.getItem("theme-mode");
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const theme = mode || (systemDark ? "dark" : "light");
      document.documentElement.classList.add(theme);
    } catch {}

    const cleanupLegacyServiceWorkers = async () => {
      try {
        const registrations = 'serviceWorker' in navigator
          ? await navigator.serviceWorker.getRegistrations()
          : [];

        const hadLegacyServiceWorker = registrations.length > 0;

        await Promise.all(
          registrations.map((registration) => registration.unregister())
        );

        if ('caches' in window) {
          const cacheNames = await caches.keys();
          const staleCaches = cacheNames.filter((cacheName) =>
            LEGACY_CACHE_PREFIXES.some((prefix) => cacheName.startsWith(prefix))
          );

          await Promise.all(staleCaches.map((cacheName) => caches.delete(cacheName)));
        }

        if (
          hadLegacyServiceWorker &&
          navigator.serviceWorker.controller &&
          sessionStorage.getItem(SW_CLEANUP_KEY) !== '1'
        ) {
          sessionStorage.setItem(SW_CLEANUP_KEY, '1');
          window.location.reload();
        }
      } catch (error) {
        console.error('Service worker cleanup failed:', error);
      }
    };

    void cleanupLegacyServiceWorkers();
  }, []);

  return null;
}
