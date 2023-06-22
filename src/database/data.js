import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC_j9amNPHyXHMNxzt7kXsElpFPrMtj5gA",
    authDomain: "todo-app-4786e.firebaseapp.com",
    projectId: "todo-app-4786e",
    storageBucket: "todo-app-4786e.appspot.com",
    messagingSenderId: "465374354330",
    appId: "1:465374354330:web:cc52781e026c2a3bc2b823",
    measurementId: "G-XGQH9FLHBP"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
// const auth = firebase.auth();

export default db;