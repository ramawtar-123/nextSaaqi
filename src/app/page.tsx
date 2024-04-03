"use client"

import { useRouter } from "next/navigation";
import LoggedInHomePage from '../components/LoggedInHomePage';
import NonLoggedInHomePage from '../components/NonLoggedInHomePage';
import { useEffect, useState, useMemo } from "react";
import * as React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, toggleDarkMode } from '../store/actions/index';


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



const Home = () => {

  const isLoggedIn = useSelector(state => state.rootReducer.isLoggedIn);
  const dispatch = useDispatch();


  useEffect( () => {
    (
      async () => {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        const locomotiveScroll = new LocomotiveScroll();
      }
    )()
  }, [])

    const router = useRouter();

    useEffect(() => {
      onAuthStateChanged(firebaseAuth, (user) => {
        if(user){
          dispatch(login())
        }
        else{
          dispatch(logout())
        }
      })
    }, [])


    useEffect(() => {
      const checkAuthentication = async () => {
        try {
          const response = await fetch('/api/');
          if (response.ok) {
            dispatch(login())
          }
        } catch (error) {
          console.error('Error checking authentication:', error);
          router.push('/login');
        }
      };
  
      checkAuthentication();
    }, []);

    
    const renderedComponent = useMemo(() => {
      if (isLoggedIn) 
        return <LoggedInHomePage />;
      else 
        return <NonLoggedInHomePage />;
    }, [isLoggedIn]);
  
    return renderedComponent;
  };


export default Home;
