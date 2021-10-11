console.log("Service Worker Loaded...");

self.addEventListener("push", event => {
  const data = event.data.json();

  console.log("Push Received...");
  
  /**
   * Options
 {
  "//": "Visual Options",
  "body": "<String>",
  "icon": "<URL String>",
  "image": "<URL String>",
  "badge": "<URL String>",
  "vibrate": "<Array of Integers>",
  "sound": "<URL String>",
  "dir": "<String of 'auto' | 'ltr' | 'rtl'>",

  "//": "Behavioral Options",
  "tag": "<String>",
  "data": "<Anything>",
  "requireInteraction": "<boolean>",
  "renotify": "<Boolean>",
  "silent": "<Boolean>",

  "//": "Both visual & behavioral options",
  "actions": "<Array of Strings>",

  "//": "Information Option. No visual affect.",
  "timestamp": "<Long>"
 }
   */

  
  const options = {
    body: "Notified by Me",
    icon: "https://lh3.googleusercontent.com/a-/AAuE7mDN_PMoTlp7uU78N9aYEYLSfqym08z9Rz924qW1Ig=k-s328",
    badge: "https://lh3.googleusercontent.com/a-/AAuE7mDN_PMoTlp7uU78N9aYEYLSfqym08z9Rz924qW1Ig=k-s328",
    image: "https://lh3.googleusercontent.com/a-/AAuE7mDN_PMoTlp7uU78N9aYEYLSfqym08z9Rz924qW1Ig=k-s328",
    tag: "push-notification-tag",
    vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500],
    data: {
      url: data.url
    },
    actions: [
      {
        action: 'coffee-action',
        title: 'Coffee',
        icon: "https://lh3.googleusercontent.com/a-/AAuE7mDN_PMoTlp7uU78N9aYEYLSfqym08z9Rz924qW1Ig=k-s328",
      },
      {
        action: 'doughnut-action',
        title: 'Doughnut',
        icon: "https://lh3.googleusercontent.com/a-/AAuE7mDN_PMoTlp7uU78N9aYEYLSfqym08z9Rz924qW1Ig=k-s328",
      },
    ],
    timestamp: Date.parse('01 Jan 2000 00:00:00')
  };

  // only support in chrome,opera and edge
  const maxVisibleActions = Notification.maxActions;
  if (maxVisibleActions < 2) {
    options.body = `This notification will only display ` +
      `${maxVisibleActions} actions.`;
  } else {
    options.body = `This notification can display up to ` +
      `${maxVisibleActions} actions.`;
  }

  event.waitUntil(
    self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', function (event) {
  let data = event.notification.data;

  event.notification.close(); // Android needs explicit close.

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      // Check if there is already a window/tab open with the target URL
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        // If so, just focus it.
        if (client.url === data.url && 'focus' in client) {
          return client.focus();
        }
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(data.url);
      }
    })
  );
});