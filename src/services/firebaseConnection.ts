import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyBpV5nGZ4bcIuj2X9gwColFmPnm1ZmoyOs",
  authDomain: "literando-52cd1.firebaseapp.com",
  projectId: "literando-52cd1",
  storageBucket: "literando-52cd1.appspot.com",
  messagingSenderId: "238206507669",
  appId: "1:238206507669:web:5b950a08bc1eee118f999c",
  measurementId: "G-VRHZNMBSX6"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
