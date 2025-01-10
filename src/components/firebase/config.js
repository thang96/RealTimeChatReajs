// // Import necessary functions from Firebase v9+
// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   FacebookAuthProvider,
//   GoogleAuthProvider,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth"; // Import auth và FacebookAuthProvider

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCohlTjLqjrssf6yK6V73T2ZOKjmdkcdPE",
//   authDomain: "chat-app-reactjs-aff76.firebaseapp.com",
//   projectId: "chat-app-reactjs-aff76",
//   storageBucket: "chat-app-reactjs-aff76.firebasestorage.app",
//   messagingSenderId: "198944866285",
//   appId: "1:198944866285:web:80edb81d778380180a31e4",
//   measurementId: "G-437KSWDPMV",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app); // Get Firebase auth instance

// const logout = () => {
//   signOut(auth)
//     .then(() => {
//       console.log("User signed out");
//     })
//     .catch((error) => {
//       console.error("Sign out error:", error);
//     });
// };

// // Export auth và FacebookAuthProvider để sử dụng ở nơi khác
// export {
//   auth,
//   FacebookAuthProvider,
//   GoogleAuthProvider,
//   logout,
//   onAuthStateChanged,
// };
