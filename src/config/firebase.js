import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, updateCurrentUser, signInWithEmailAndPassword } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyChLVirrVEI2mIS3pm8TpDmpKMfTkl5y3U",
    authDomain: "restaurant-menu-sertacgltkn.firebaseapp.com",
    projectId: "restaurant-menu-sertacgltkn",
    storageBucket: "restaurant-menu-sertacgltkn.appspot.com",
    messagingSenderId: "1037717796366",
    appId: "1:1037717796366:web:21488a9bdf9f6cb64c6e5f",
    measurementId: "G-N4HP40FKWK"
  };

  const app = initializeApp(firebaseConfig)
  getAnalytics(app);
  const auth = getAuth(app);

  export const signUp = async (name, email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
    await updateCurrentUser(auth, {displayName: name})

  }

  export const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)

  }