import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCseYAOCWhNacSlrRQ4QrSGYO6TNfuLlQU",
    authDomain: "olx-clone-d8d5b.firebaseapp.com",
    projectId: "olx-clone-d8d5b",
    storageBucket: "olx-clone-d8d5b.appspot.com",
    messagingSenderId: "1057799237203",
    appId: "1:1057799237203:web:7efe0bd03beef7c72020a6",
    measurementId: "G-JW2VZ1ZSCF"
  };
  
export const app =  initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);