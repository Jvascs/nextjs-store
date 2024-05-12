// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "tailor-2f0c7.firebaseapp.com",
  projectId: "tailor-2f0c7",
  storageBucket: "tailor-2f0c7.appspot.com",
  messagingSenderId: "703800137713",
  appId: "109190592187415898459",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
