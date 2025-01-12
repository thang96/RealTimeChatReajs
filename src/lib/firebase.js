import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import.meta.env.VITE_API_KEY
const firebaseConfig = {
  apiKey: "AIzaSyCRveUcqW18_ZWj1T8sF8Q2bWUPKuStYTM",
  authDomain: "chat-app-925a1.firebaseapp.com",
  projectId: "chat-app-925a1",
  storageBucket: "chat-app-925a1.appspot.com",
  messagingSenderId: "214206553336",
  appId: "1:214206553336:web:aa3177c5712d007bb5af0d",
  measurementId: "G-CPHYMFRG1J",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage();

export { auth, db, storage };
