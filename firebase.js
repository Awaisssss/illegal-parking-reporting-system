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
  //iprs
  apiKey: "AIzaSyCz7hwc0tiNX1OG5Fh3kl9gSillnp3Naxk",
  authDomain: "snap-illegal-parking.firebaseapp.com",
  projectId: "snap-illegal-parking",
  storageBucket: "snap-illegal-parking.appspot.com",
  messagingSenderId: "540144642607",
  appId: "1:540144642607:web:91b11c270ae849fb8b74da",
  measurementId: "G-CZ99JX6K2E"

  //demo
  // apiKey: "AIzaSyBtU76zDnZORXkWNdFchqmbPamRNsCvS-c",
  // authDomain: "fir-fbe60.firebaseapp.com",
  // projectId: "fir-fbe60",
  // storageBucket: "fir-fbe60.appspot.com",
  // messagingSenderId: "847573149004",
  // appId: "1:847573149004:web:5934568f6d74b5b3891be9",
  // measurementId: "G-Z8W3726EYY"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const auth = firebase.auth()

export { auth, db };