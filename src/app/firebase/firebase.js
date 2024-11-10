// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from  "firebase/auth"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkaGxjopWzUFNB_U_6a7WfJYnZKD6wmgA",
  authDomain: "empirev2.firebaseapp.com",
  projectId: "empirev2",
  storageBucket: "empirev2.firebasestorage.app",
  messagingSenderId: "879680321367",
  appId: "1:879680321367:web:84e2e9004568bf71a5b012",
  measurementId: "G-CHT2KERP7G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
// const analytics = getAnalytics(app);