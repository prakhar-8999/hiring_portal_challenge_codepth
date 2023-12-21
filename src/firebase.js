import {getApps, initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAjHcgvpBbqIcxCMAVFhABg1tGJ-KltBTI",
  authDomain: "codepth-47b82.firebaseapp.com",
  projectId: "codepth-47b82",
  storageBucket: "codepth-47b82.appspot.com",
  messagingSenderId: "873209363290",
  appId: "1:873209363290:web:79d14cb9eeb78012771163",
  measurementId: "G-Y1QPZXZ32L",
};

let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const storage = getStorage(firebase_app);
const db = getFirestore(firebase_app);
const auth = getAuth(firebase_app);

export {db, firebase_app as default, auth as getAuth, storage};
