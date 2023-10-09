import { initializeApp } from "firebase/app";
import {getFirestore,collection} from 'firebase/firestore'
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6shXzctvhfum7-J_n-fi83Qr_nrIJSMQ",
  authDomain: "halalflix-207f0.firebaseapp.com",
  projectId: "halalflix-207f0",
  storageBucket: "halalflix-207f0.appspot.com",
  messagingSenderId: "547299686216",
  appId: "1:547299686216:web:fd66eb7464c6fb2e1de57d",
  measurementId: "G-483DQ7JH2L"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection( db , "movies" );
export const reviewRef = collection( db , "refrence" );
export const usersRef = collection( db , "users" );
const auth = getAuth( );
export {auth}
export default app;

