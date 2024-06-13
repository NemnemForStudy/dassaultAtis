/* global */

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (t) {
      return t || fetch(event.request);
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  switch (event.action) {
    case "accept":
    case "resume":
    case "refuse":
      redirectToTab(event, { action: event.action, room_id: event.notification.tag });
      break;
    default: // Open the source tab
      redirectToTab(event);
  }
  event.notification.close();
});

let redirectToTab = (event, data) => {
  const url = event.notification.data && event.notification.data.url || "/";
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true }) // Check all opened tabs
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === url && "focus" in client) {
            if (data) client.postMessage(data);
            return client.focus(); // Tab already opened
          }
        }
        if (clients.openWindow) return clients.openWindow(url); // New tab
      })
  );
}