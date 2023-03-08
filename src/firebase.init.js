// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzJF09kset-ZBrKnSNGESYdlfUMm1wQJA",
    authDomain: "email-password-auth-with-react.firebaseapp.com",
    projectId: "email-password-auth-with-react",
    storageBucket: "email-password-auth-with-react.appspot.com",
    messagingSenderId: "197410707172",
    appId: "1:197410707172:web:a3aac75948794362d33ef1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;