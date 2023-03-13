import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHF_wkC5Rxwb3k46AUIo_zq8diocwCUJ4",
  authDomain: "chatgpt-personal.firebaseapp.com",
  projectId: "chatgpt-personal",
  storageBucket: "chatgpt-personal.appspot.com",
  messagingSenderId: "645558404587",
  appId: "1:645558404587:web:802f396a419f8402fec5ae",
  measurementId: "G-RDY2D2W3RV"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app);

export { db };