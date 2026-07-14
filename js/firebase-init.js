(function () {
  "use strict";

  // ########################################################
  // # Firebase initialization configuration
  // # Only authenticated emails and verified usernames should be allowed in app logic.
  // ########################################################
  const firebaseConfig = {
    apiKey: "AIzaSyDkPmJVJzfmF7hPrb7wAi5BSL38430Wn04",
    authDomain: "smart-study-buddy-16111.firebaseapp.com",
    projectId: "smart-study-buddy-16111",
    storageBucket: "smart-study-buddy-16111.firebasestorage.app",
    messagingSenderId: "318367609801",
    appId: "1:318367609801:web:c4498bf48c98c01bbcee18",
    measurementId: "G-8S6D10GN5J"
  };

  const statusElement = document.getElementById("firebase-status");

  function setStatus(message) {
    if (statusElement) {
      statusElement.textContent = message;
    }
  }

  function initializeFirebase() {
    if (typeof firebase === "undefined" || !firebase.initializeApp) {
      setStatus("Firebase SDK not loaded.");
      return;
    }

    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();
    const storage = firebase.storage();
    const messaging = firebase.messaging.isSupported() ? firebase.messaging() : null;

    setStatus("Firebase initialized successfully.");

    if (messaging) {
      navigator.serviceWorker
        .register("firebase-messaging-sw.js")
        .then(function (registration) {
          messaging.useServiceWorker(registration);
          return Notification.requestPermission();
        })
        .then(function (permission) {
          if (permission === "granted") {
            setStatus("Firebase and FCM initialized. Notifications are enabled.");
            return messaging.getToken();
          }

          setStatus("Firebase initialized. FCM permission was not granted.");
          return null;
        })
        .then(function (token) {
          if (token) {
            return db.collection("fcmTokens").doc(token).set({
              token: token,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
          }
        })
        .catch(function (error) {
          console.warn("Firebase messaging setup failed:", error);
          setStatus("Firebase initialized, but FCM setup failed.");
        });
    }

    window.smartStudyBuddy = {
      auth: auth,
      db: db,
      storage: storage,
      messaging: messaging,
    };
  }

  document.addEventListener("DOMContentLoaded", initializeFirebase);
})();
