import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3fN0woLshUBdbokUWtkPwMgVWnLqFieA",
  authDomain: "expense-tracker-2b52e.firebaseapp.com",
  projectId: "expense-tracker-2b52e",
  storageBucket: "expense-tracker-2b52e.appspot.com",
  messagingSenderId: "480805491400",
  appId: "1:480805491400:web:2accb18ac041c561c24bfd",
  measurementId: "G-024Q2YYQZR",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
