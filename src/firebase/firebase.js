import firebase from 'firebase';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDg2FdVLjviUHF3nu4gjApRuf1iqfV-rdo",
    authDomain: "household-account-book-app.firebaseapp.com",
    databaseURL: "https://household-account-book-app.firebaseio.com",
    projectId: "household-account-book-app",
    storageBucket: "household-account-book-app.appspot.com",
    messagingSenderId: "349017346788",
    appId: "1:349017346788:web:a415514b36da79cb"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

export const db = firebase.firestore();
export const functions = firebase.functions();

export default firebase;