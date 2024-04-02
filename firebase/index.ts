// First step to initialize firebase in the client side
import {initializeApp } from '@firebase/app';
//import {firebaseConfig} from "@/firebase/config";

// Initialize Firebase 
const firebaseConfig = {
    apiKey: "AIzaSyANrQrjOLgXOAAMiA1sUb9zHgMUgpROFD0",
    authDomain: "df-calendar-761d9.firebaseapp.com",
    projectId: "df-calendar-761d9",
    storageBucket: "df-calendar-761d9.appspot.com",
    messagingSenderId: "28763905462",
    appId: "1:28763905462:web:fa3509b842e00132a8f517",
    measurementId: "G-5SME3MP8WR"
};

const clientApp = initializeApp(firebaseConfig);

export default clientApp;