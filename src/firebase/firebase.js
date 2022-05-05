// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyB5M9q5VjLZVD2yMXD26XgBp7TclcDUgFg",
    authDomain: "estella-da659.firebaseapp.com",
    projectId: "estella-da659",
    storageBucket: "estella-da659.appspot.com",
    messagingSenderId: "909851662230",
    appId: "1:909851662230:web:2c80057ec733f461d42fb7",
    measurementId: "G-7PZBD89E7R",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);
