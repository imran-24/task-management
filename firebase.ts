// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCcOEkj7uJIM0NSLJWuhLiTjoYXgVCPAEM",
//   authDomain: "file-store-9bc94.firebaseapp.com",
//   projectId: "file-store-9bc94",
//   storageBucket: "file-store-9bc94.appspot.com",
//   messagingSenderId: "987491187517",
//   appId: "1:987491187517:web:9afeaaa5aeb9b66a5ce354",
//   measurementId: "G-S34NRGB19R"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAxRrW-3Y-3aF2nqmbKrFVGxLE47IPirgQ",
  authDomain: "development-18ff4.firebaseapp.com",
  projectId: "development-18ff4",
  storageBucket: "development-18ff4.firebasestorage.app",
  messagingSenderId: "462597464758",
  appId: "1:462597464758:web:10dac293c8f2b9ab0abc17",
  measurementId: "G-BX3LGHQHVN",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

const auth = getAuth(app);
export { app, auth, storage };
