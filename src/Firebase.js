import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

var firebaseConfig = {
    apiKey: "AIzaSyAP2TAqJ-DoLN9i1Ox41Ca7BMYajRrxyAg",
    authDomain: "retry-b4e10.firebaseapp.com",
    projectId: "retry-b4e10",
    storageBucket: "retry-b4e10.appspot.com",
    messagingSenderId: "533017721875",
    appId: "1:533017721875:web:b43d2a33f845c162de53e6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const firebaseInstance = firebase;
  export const authService = firebase.auth();
  export const db = firebase.firestore();
  export const storageService = firebase.storage();
