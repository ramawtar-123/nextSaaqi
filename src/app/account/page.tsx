"use client"

import React, { useEffect, useState } from 'react';


import { GoogleAuthProvider,GithubAuthProvider, getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useFirebase } from '@/context/Firebase';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database'
import Navbar from '@/components/sub_components/Navbar';

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

interface userData {
    fullname:  String,
    username: String,
    email: String,
    profilePicture: String,
    bio: String,
    likes: [
       {}
    ],
    posts:[
      {}
   ],
    stories: [
      {}
   ],
    followers: [
      {}
   ],
    followings: [
      {}
   ],
}

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

function Account() {

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  let [googleLogged, setGoogleLogged] = useState<boolean>(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if(user){
        setUser(user);
        setGoogleLogged(true)
      }
      else{
        setUser("");
      }
    })
  }, [])



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/');
        if (response.ok) {
          const data = await response.json();
          
          setUserData(data.user); 
        } else {
          console.error('Failed to fetch user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  console.log(user);


  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };



  return (
    <>
      <Navbar />
      <div className="main flex gap-32 dark-mode-bg w-full h-[100vh] p-32 pl-[30rem]">
        <div className="profile w-[10rem] h-[10rem] overflow-hidden rounded-full relative cursor-pointer">
          <img src={userData.profilePicture || "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"} className='object-cover object-center' />
          <input type="file" name="profile" id="" onChange={handleFileChange} className='absolute w-full h-full z-[-5] '/>
        </div>
        <div className="information w-[20rem] h-[8rem] justify-start">
          <div className='flex gap-8'>
            <h1 className="text-2xl">{googleLogged ? user.displayName : userData.fullname}</h1>
            <button>Edit Profile</button>
          </div>

          <div className='flex gap-7'>
            <h1>{}</h1> <span className='ml-[-7%]'>posts</span>
            <h1>{0 }</h1> <span className='ml-[-7%]'>followers</span>
            <h1>{0 }</h1> <span className='ml-[-7%]'>followings</span>
          </div>

          <h1 className='mt-4 font-semibold'>{userData.name }</h1>
          <h1 className='font-thin'>{userData.bio }</h1>
        </div>
      </div>
    </>
  );
}

export default Account;
