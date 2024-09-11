import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC-HQ1AyW2bMJPHFwbcFXkKAMtA5QX6C6s",
    authDomain: "wordle-clone-60c91.firebaseapp.com",
    projectId: "wordle-clone-60c91",
    storageBucket: "wordle-clone-60c91.appspot.com",
    messagingSenderId: "244752977191",
    appId: "1:244752977191:web:a66c24f78fd416496b2d02",
    measurementId: "G-PSH42HLPNL"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

const res = await db.collection('words').doc('five').set('assets/wordle-La.txt');

export { db, auth };
  