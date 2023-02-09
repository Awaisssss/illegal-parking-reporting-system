// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
// import * as firebase from "firebase/compact/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/storage';

// import { getAnalytics } from "firebase/analytics";
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyCz7hwc0tiNX1OG5Fh3kl9gSillnp3Naxk",
  authDomain: "snap-illegal-parking.firebaseapp.com",
  projectId: "snap-illegal-parking",
  storageBucket: "snap-illegal-parking.appspot.com",
  messagingSenderId: "540144642607",
  appId: "1:540144642607:web:91b11c270ae849fb8b74da",
  measurementId: "G-CZ99JX6K2E"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const auth = firebase.auth()

export { auth, db };