export const register = () => {
  let deferredPrompt = null;

  if (!window.Promise) {
    window.Promise = Promise;
  }

  if ("serviceWorker" in navigator) {
    alert("has serviceWorker!");
    navigator.serviceWorker
      .register("/sw.js")
      .then(function() {
        console.log("Service worker registered!");
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  window.addEventListener("beforeinstallprompt", function(event) {
    console.log("beforeinstallprompt fired");
    event.preventDefault();
    deferredPrompt = event;

    return false;
  });

  function displayConfirmNotification() {
    if ("serviceWorker" in navigator) {
      let options = {
        body: "You successfully subscribed to our Notification service!",
        icon: "/logo192.png",
        image: "/sf-boat.jpg",
        dir: "ltr",
        lang: "en-US", // BCP 47,
        vibrate: [100, 50, 200],
        badge: "/logo192.png",
      };
      let optionsPersist = {
        body: "You successfully subscribed to our Notification service!",
        icon: "/logo192.png",
        image: "/sf-boat.jpg",
        dir: "ltr",
        lang: "en-US", // BCP 47,
        vibrate: [100, 50, 200],
        badge: "/app-icon-96x96.png",
        tag: "confirm-notification",
        renotify: true,
        actions: [
          { action: "confirm", title: "Okay", icon: "/app-icon-96x96.png" },
          { action: "cancel", title: "Cancel", icon: "/app-icon-96x96.png" },
        ],
      };

      navigator.serviceWorker.ready.then(function(swreg) {
        console.log(123456);
        swreg.showNotification(
          "Successfully subscribed (from SW)!",
          optionsPersist,
        );
        // new Notification("Successfully subscribed!", optionsPersist);
      });

      // new Notification("Successfully subscribed (from SW)!", options);
      // ServiceWorkerRegistration.showNotification(
      //   "Successfully subscribed (from SW)!",
      //   options,
      // );
    }
  }

  function askForNotificationPermission() {
    Notification.requestPermission(function(result) {
      console.log("User Choice", result);

      if (result !== "granted") {
        console.log("No notification permission granted!");
      } else {
        displayConfirmNotification();
      }
    });
  }

  if ("Notification" in window) {
    setTimeout(() => {
      if (window.confirm("真的要弹出框框嘛？")) {
        askForNotificationPermission();
      }
    }, 3000);
  }
};
