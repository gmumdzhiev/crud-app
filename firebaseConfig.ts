// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCoIOx2emdh_C-OnWs4nV6KjOwAs2gcIiI",
    authDomain: "gm-crud.firebaseapp.com",
    projectId: "gm-crud",
    storageBucket: "gm-crud.firebasestorage.app",
    messagingSenderId: "339983924272",
    appId: "1:339983924272:web:88f541ffd1834ef5ab41f5",
    measurementId: "G-ZSNKWQXH25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);