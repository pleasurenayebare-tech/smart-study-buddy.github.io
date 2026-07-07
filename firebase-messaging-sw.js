importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'AIzaSyBR8HLqUJ1sQRHGH7TWmwwgFBZB1WyWnlU',
  authDomain: 'smart-study-buddy-5ba73.firebaseapp.com',
  projectId: 'smart-study-buddy-5ba73',
  storageBucket: 'smart-study-buddy-5ba73.firebasestorage.app',
  messagingSenderId: '214153993094',
  appId: '1:214153993094:web:d73b3c2f9c002e7e362a07',
  measurementId: 'G-ZHN9J1M1EB'
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification?.title || 'Smart Study Buddy';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new message',
    icon: '/img/favicon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
