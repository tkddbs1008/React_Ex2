// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCX4xW3OqlTdGwYzvZcKZlh8zfBUWb50hI",
  authDomain: "react-exercise2-c9630.firebaseapp.com",
  projectId: "react-exercise2-c9630",
  storageBucket: "react-exercise2-c9630.appspot.com",
  messagingSenderId: "292783238773",
  appId: "1:292783238773:web:652f4675aa14833bff123c",
  measurementId: "G-JEG24QR8LF"
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
export const db = getFirestore();
