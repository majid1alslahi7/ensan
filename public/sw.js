// Service Worker for Ensan - المؤسسة إنسان للأعمال الإنسانية
// هذا الـ Service Worker يقوم فقط بتحديث نفسه ومسح الكاش القديم
// لا يتم تخزين أي ملفات في الكاش لتجنب المشاكل مع Next.js chunks

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // مسح جميع الكاشات القديمة
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      );

      // إلغاء تسجيل الـ Service Worker الحالي بعد مسح الكاش
      await self.registration.unregister();

      // إعادة تحميل جميع النوافذ المفتوحة لضمان استخدام الإصدار الجديد
      const clients = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });

      await Promise.all(clients.map((client) => client.navigate(client.url)));
    })()
  );
});

// لا نريد اعتراض أي طلبات - دع كل شيء يمر طبيعياً
self.addEventListener("fetch", () => {});
