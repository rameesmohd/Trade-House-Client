import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfrBuZUHEI7TpNFLjafp5nPiHFGNJSgMI",
  authDomain: "th-project-otp.firebaseapp.com",
  projectId: "th-project-otp",
  storageBucket: "th-project-otp.appspot.com",
  messagingSenderId: "900865781264",
  appId: "1:900865781264:web:90d621df626b8ca060e495",
  measurementId: "G-3R0RK1JBYS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)