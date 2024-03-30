"use client"

import { useRouter } from "next/navigation";
import LoggedInHomePage from '../components/LoggedInHomePage';
import NonLoggedInHomePage from '../components/NonLoggedInHomePage';
import { useEffect, useState } from "react";
import * as React from "react";




const Home = () => {



  const router = useRouter();
  
    let [isDarkMode, setIsDarkMode] = useState(true);

    const switchChanged = () => {
        setIsDarkMode(!isDarkMode);
        console.log(isDarkMode);
    }
    console.log(isDarkMode);

    let backColor = isDarkMode ? "dark-mode-bg" : "light-mode-bg"


    let [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);


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
