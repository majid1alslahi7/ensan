'use client';
import { useEffect } from 'react';

export default function ThemeScript() {
  useEffect(() => {
    // تطبيق الثيم
    try {
      const mode = localStorage.getItem("theme-mode");
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const theme = mode || (systemDark ? "dark" : "light");
      document.documentElement.classList.add(theme);
    } catch (e) {}

    // تسجيل Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(
        (registration) => console.log('Service Worker registered'),
        (err) => console.log('Service Worker failed:', err)
      );
    }
  }, []);

  return null;
}
