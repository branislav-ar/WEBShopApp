// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKpRUmRjNzXhQ2Rf9XU0x_5csgUg4sR0M",
  authDomain: "db-proj03.firebaseapp.com",
  projectId: "db-proj03",
  storageBucket: "db-proj03.appspot.com",
  messagingSenderId: "209563562270",
  appId: "1:209563562270:web:721eba46d669590ded190f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;