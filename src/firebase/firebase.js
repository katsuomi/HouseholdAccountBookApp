import firebase from 'firebase';
import 'firebase/auth';

export const db = firebase.firestore();
export const functions = firebase.functions();

const config = {
    apiKey: functions.config().app.key,
    authDomain: "household-account-book-app.firebaseapp.com",
    databaseURL: "https://household-account-book-app.firebaseio.com",
    projectId: "household-account-book-app",
    storageBucket: "household-account-book-app.appspot.com",
    messagingSenderId: "349017346788",
    appId: functions.config().app.id
  };
  // Initialize Firebase
  firebase.initializeApp(config);


export default firebase;