// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC8zyukQ6MZNuO6FEC_7U2CC5ItKG5fp_Y",
    authDomain: "librarytest-c315c.firebaseapp.com",
    projectId: "librarytest-c315c",
    storageBucket: "librarytest-c315c.appspot.com",
    messagingSenderId: "582440830308",
    appId: "1:582440830308:web:19958c50c5a347622b6671",
    measurementId: "G-KC8JB9BVED",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default getFirestore();
