// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCtZzafh8hXr0yszm7fMM4E5Ch5kvbGt6M",
    authDomain: "d-solar-system-48647.firebaseapp.com",
    projectId: "d-solar-system-48647",
    storageBucket: "d-solar-system-48647.appspot.com",
    messagingSenderId: "134698403479",
    appId: "1:134698403479:web:db268c127bd2d574c40bd2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Configure Google provider with additional scopes if needed
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export { auth, googleProvider, db };