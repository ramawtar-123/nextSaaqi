"use client"

import React, { useEffect, useState } from 'react';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';

import { GoogleAuthProvider,GithubAuthProvider, getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useFirebase } from '@/context/Firebase';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database'
import Navbar from '@/components/sub_components/Navbar';
import { setTEMPUSER } from '@/store/actions';
import { useDispatch } from 'react-redux';
import Image from 'next/image';


  const ImageSources = [
    'https://plus.unsplash.com/premium_photo-1669115120004-23e5dd04f72d?q=80&w=1432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1429198739803-7db875882052?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1666544584874-c38f42e5e3d4?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1564490292125-2e3c78a0ef44?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1604714628334-febaf95facde?q=80&w=1477&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1675359772567-c09110eb33be?q=80&w=1579&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1532382172705-841174a528a7?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];



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

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if(user){
        setUser(user);
        dispatch(setTEMPUSER(user))
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

  useGSAP(() => {
    var tl = gsap.timeline();
    tl.from(".gsap", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: 'gsap',
        scroller: "el",
        scrub: 3
      }
    });
  });


  return (
    <>
      <Navbar />
      <div className="main dark-mode-bg w-full">
       <div className='front_main  w-8/12 pt-10 ml-72'>
      
        <div className='back_profile h-72 w-full bg-zinc-900 rounded-xl mb-[-4rem]'>
              
        </div>
        <div className='flex gap-12 '>
           <div className="profile gsap w-[10rem] h-[10rem] overflow-hidden rounded-full relative cursor-pointer  ">
              <img src={userData.profilePicture || "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"} className='object-cover object-center' />
              <input type="file" name="profile" id="" onChange={handleFileChange} className='absolute w-full h-full z-[-5] '/>
              
            </div>
            
        

            <div className="information gsap w-[20rem] h-[8rem] mt-20 ">
            <h1 className="text-3xl font-semibold fo">{googleLogged ? user.displayName : userData.fullname}</h1>
               

           <div className='flex gap-7 mt-4'>
            <h1>{0 }</h1> <span className='ml-[-7%] gsap '>posts</span>
            <h1>{0 }</h1> <span className='ml-[-7%] gsap'>followers</span>
            <h1>{0 }</h1> <span className='ml-[-7%] gsap'>followings</span>
           </div>

             <h1 className='mt-2 font-semibold gsap'>{userData.name }</h1>
             <h1 className='font-thin gsap'>{userData.bio }</h1>
           </div>
          </div>

          <hr></hr>
          <div className='grid-container mt-10 flex min-h-30 gap-5 min-w-[60vw] '>
              {ImageSources.map((src,index) => (         
                 <Image  width={200} height={10} key={index} src={src} alt={''} className='overflow-hidden object-cover'/>
              ))}
          </div>
        </div>
       </div>
    </>
  );
}

export default Account;
