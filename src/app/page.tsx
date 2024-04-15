"use client"

import { useRouter } from "next/navigation";
import LoggedInHomePage from '../components/LoggedInHomePage';
import NonLoggedInHomePage from '../components/NonLoggedInHomePage';
import { useEffect, useMemo } from "react";
import * as React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, setUSER } from '../store/actions/index';
import {Suspense} from 'react'


import { GoogleAuthProvider,GithubAuthProvider, getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database'



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
          dispatch(setUSER({
            displayName: user.displayName,
            email: user.email,
          }))  
        }
        else{
          dispatch(logout())
        }
        console.log("checked user")
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
        console.log("checked for local")
      };
  
      checkAuthentication();
    }, []);

    useEffect(() => {
      const checkUser = async () => {
        try {
          const response = await fetch('/api/user');
          if (response.ok) {
            const data = await response.json();
            dispatch(setUSER({
              displayName: data.user.fullname,
              email: data.user.email,
            })) 
            console.log(data.user)
          }
        } catch (error) {
          console.error('Error checking authentication:', error);
          router.push('/login');
        }
        console.log("checked for User")
        
      };
  
      checkUser();
    }, []);

    
    const renderedComponent = useMemo(() => {
      
        if (isLoggedIn) 
          return (
            <Suspense >
              <LoggedInHomePage />;
            </Suspense>
          )
        else 
          return (
            <Suspense >
              <NonLoggedInHomePage />;
            </Suspense>
          )
      
    }, [isLoggedIn]);
    
    


    return renderedComponent;
  };


export default Home;
