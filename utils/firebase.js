import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAwFJqTHIokgnBZw-F9fdihAOV0AutSJMU",
    authDomain: "saaqi-194de.firebaseapp.com",
    projectId: "saaqi-194de",
    storageBucket: "saaqi-194de.appspot.com",
    messagingSenderId: "178575618437",
    appId: "1:178575618437:web:3a0b80ddb4da44ac04d4ec",
    measurementId: "G-L17RZF5ZKF",
    databaseURL: "https://saaqi-194de-default-rtdb.firebaseio.com/"
  };

  export const app = initializeApp(firebaseConfig);