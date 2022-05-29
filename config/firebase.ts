import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCQAMJHIriH72UC1a6bB0t2RzI8b8IMsno",
    authDomain: "fir-react-app-a2057.firebaseapp.com",
    projectId: "fir-react-app-a2057",
    storageBucket: "fir-react-app-a2057.appspot.com",
    messagingSenderId: "225691527411",
    appId: "1:225691527411:web:95316fd31593d3f289ef86"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { firebaseApp, auth, db };