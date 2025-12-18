// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZIqBwKz6xE3y_eqREJLW1gYJrVX656ZA",
  authDomain: "bus-mittra.firebaseapp.com",
  projectId: "bus-mittra",
  storageBucket: "bus-mittra.firebasestorage.app",
  messagingSenderId: "208805760208",
  appId: "1:208805760208:web:68c2f1457f2138f1a962d5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Services
const auth = firebase.auth();
const db = firebase.firestore();
