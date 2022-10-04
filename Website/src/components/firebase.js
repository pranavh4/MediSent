import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBZbVWkCG7ehlT4DCF-G7WqMVMnuTyLI-Y",
  authDomain: "trial-362bf.firebaseapp.com",
  databaseURL: "https://trial-362bf.firebaseio.com",
  projectId: "trial-362bf",
  storageBucket: "trial-362bf.appspot.com",
  messagingSenderId: "785004172597",
  appId: "1:785004172597:web:286921eb5f823c4c2e287c",
  measurementId: "G-67ZZ7FSK8H"
};

const fire = firebase.initializeApp(firebaseConfig);
const db = fire.firestore();
export default fire;
export { db };
