import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDi3SBUHwitOOXCebV09uljlXVm35JjWMw",
  authDomain: "planettap-d3b61.firebaseapp.com",
  projectId: "planettap-d3b61",
  storageBucket: "planettap-d3b61.appspot.com",
  messagingSenderId: "650683077619",
  appId: "1:650683077619:web:4169959f0058a4258a3886",
  measurementId: "G-5JSZ2DPCHQ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleFirebaseAuth = new firebase.auth.GoogleAuthProvider();
