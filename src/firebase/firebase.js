// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHN6aMkrdy6m036HPCiZM2nOMFrzDGKeQ",
  authDomain: "schoolsystems-8e0e1.firebaseapp.com",
  projectId: "schoolsystems-8e0e1",
  storageBucket: "schoolsystems-8e0e1.appspot.com",
  messagingSenderId: "320947402587",
  appId: "1:320947402587:web:40c55d86899f3b5f430c7e",
  measurementId: "G-XYY2BGHVBS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getDatabase(app)
