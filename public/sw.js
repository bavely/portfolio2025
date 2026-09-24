/*
 * Service-worker retirement script.
 *
 * This site no longer installs a service worker, but previous local or deployed
 * versions may have left one registered. A stale worker can keep serving an old
 * Next.js document after its versioned CSS and JavaScript chunks have gone away.
 * Browsers with that registration will fetch this file as an update; it clears
 * the worker-owned caches, unregisters the worker, and refreshes controlled tabs
 * once so they load the current Next.js build directly from the server.
 *
 * This file does not register a service worker for new visitors.
 */

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));

      await self.registration.unregister();

      const clients = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: false,
      });

      await Promise.all(
        clients.map((client) =>
          "navigate" in client ? client.navigate(client.url) : undefined,
        ),
      );
    })(),
  );
});
