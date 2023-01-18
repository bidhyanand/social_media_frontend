
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDFtzsEw-BxcwU8NVaUMnKUdpLsD6brPx4",
  authDomain: "social-media-app-de825.firebaseapp.com",
  projectId: "social-media-app-de825",
  storageBucket: "social-media-app-de825.appspot.com",
  messagingSenderId: "279247767055",
  appId: "1:279247767055:web:fa57623253b10fd7c2057a",
  measurementId: "G-9HXFZPSF94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const auth = getAuth(app)
export const db = getFirestore(app)

export default app