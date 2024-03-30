import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";

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

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
    const signupUserWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password);
    };

    const putData = (key, data) => {
        set(ref(database, key), data);
    };

    return (
        <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword, putData }}>
            {props.children}
        </FirebaseContext.Provider>
    );
};
