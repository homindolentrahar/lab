import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDDIQcO4OLoqpxAfp2-xpgyp0hTW9wIyys",
  authDomain: "react-firegram-4b6a1.firebaseapp.com",
  projectId: "react-firegram-4b6a1",
  storageBucket: "react-firegram-4b6a1.appspot.com",
  messagingSenderId: "949505346576",
  appId: "1:949505346576:web:17928c4f08dccd47164e95",
  measurementId: "G-ZYQVCEJPMK",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
