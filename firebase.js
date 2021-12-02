// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdGFZ6vwIX0qLZ4Yx_GLtJoDEKQz1kx7g",
  authDomain: "b24win-c0633.firebaseapp.com",
  projectId: "b24win-c0633",
  storageBucket: "b24win-c0633.appspot.com",
  messagingSenderId: "144113535461",
  appId: "1:144113535461:web:e321b826a1f9553c76c70c",
  measurementId: "G-TLEKF6VQRR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);