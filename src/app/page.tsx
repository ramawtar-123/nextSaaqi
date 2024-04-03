"use client"

import { useRouter } from "next/navigation";
import LoggedInHomePage from '../components/LoggedInHomePage';
import NonLoggedInHomePage from '../components/NonLoggedInHomePage';
import { useEffect, useState } from "react";
import * as React from "react";
import { useReducer } from "react";
import { UseDispatch, useSelector } from "react-redux";
import { UserSlice } from '../store/reducers/UserReducer'


import { GoogleAuthProvider,GithubAuthProvider, getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useFirebase } from '@/context/Firebase';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database'

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

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


//dispatch(userdelete)


const Home = () => {



  useEffect( () => {
    (
      async () => {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        const locomotiveScroll = new LocomotiveScroll();
      }
    )()
  }, [])



  const router = useRouter();
  
    let [isDarkMode, setIsDarkMode] = useState(true);

    const switchChanged = () => {
        setIsDarkMode(!isDarkMode);
        console.log(isDarkMode);
    }
    console.log(isDarkMode);

    let backColor = isDarkMode ? "dark-mode-bg" : "light-mode-bg"


    let [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);





    const [user, setUser] = useState("");

    useEffect(() => {
      onAuthStateChanged(firebaseAuth, (user) => {
        if(user){
          setUser(user);
          setIsLoggedIn(true)
        }
        else{
          setUser("");
          setIsLoggedIn(false)
        }
      })
    }, [])


    useEffect(() => {
      const checkAuthentication = async () => {
        try {
          const response = await fetch('/api/');
          if (response.ok) {
            setIsLoggedIn(true);
          } else {
            // router.push('/login');
          }
        } catch (error) {
          console.error('Error checking authentication:', error);
          router.push('/login');
        }
      };
  
      checkAuthentication();
    }, []);


    
  if (isLoggedIn) {
    return (
         <LoggedInHomePage isDarkMode={isDarkMode} backColor={backColor}/>
      );
  } else {
    return (
        <NonLoggedInHomePage />
      
    );
  }
}


export default Home;
