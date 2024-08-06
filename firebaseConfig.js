// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVS_zuqQ0DqeTPlThoALn18ItenV_68V0",
  authDomain: "tracking-9e039.firebaseapp.com",
  projectId: "tracking-9e039",
  storageBucket: "tracking-9e039.appspot.com",
  messagingSenderId: "309331366118",
  appId: "1:309331366118:web:a4f9fb34e84ce728a52b27",
  measurementId: "G-HBTDVYCR1Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

