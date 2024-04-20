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
import axios from 'axios';


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
  const [currentUser, setCurrentUser] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if(user){
        const res = await axios.get(`api/findUserByEmail?email=${user.email}`)
        setCurrentUser(res.data.user);
        console.log(currentUser)

        dispatch(setTEMPUSER(user))
        setGoogleLogged(true)
      }
      else{
        setCurrentUser("");
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

  const [userFollowers, setUserFollowers] = useState(0)

  useEffect(() => {
    const countFollowers = async () => {
      try{
        const res = await axios.get(`/api/countfollowers?userId=${currentUser._id}`);
        setUserFollowers(res.data.followerCount)
      }
      catch{
        console.log("error")
      }
    }
  
    countFollowers()

  }, [])


  const [userFollowings, setUserFollowings] = useState(0)

  useEffect(() => {
    const countFollowings = async () => {
      try{
        const res = await axios.get(`/api/countfollowings?userId=${currentUser._id}`);
        setUserFollowings(res.data.followingCount)
      }
      catch{
        console.log("error")
      }
    }
    countFollowings()
  }, [])

  const [userPosts, setUserPosts] = useState(0)

  useEffect(() => {
    const countPosts = async () => {
      try{
        const res = await axios.get(`/api/countuserposts?userId=${currentUser._id}`);
        setUserPosts(res.data.postsCount)
      }
      catch{
        console.log("error")
      }
    }
    countPosts()
  }, [])
  
  


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
      <div className="main flex gap-32 dark-mode-bg w-full h-[100vh] p-32 pl-[30rem]">
        <div className="profile gsap w-[10rem] h-[10rem] overflow-hidden rounded-full relative cursor-pointer">
          <img src={userData.profilePicture || "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"} className='object-cover object-center' />
          <input type="file" name="profile" id="" onChange={handleFileChange} className='absolute w-full h-full z-[-5] '/>
        </div>
        <div className="information gsap w-[20rem] h-[8rem] justify-start">
          <div className='flex gap-8'>
            <h1 className="text-2xl">{googleLogged ? currentUser.fullname : userData.fullname}</h1>
            <button>Edit Profile</button>
          </div>

          <div className='flex gap-7'>
            <h1>{userPosts}</h1> <span className='ml-[-7%] gsap'>posts</span>
            <h1>{userFollowers }</h1> <span className='ml-[-7%] gsap'>followers</span>
            <h1>{userFollowings }</h1> <span className='ml-[-7%] gsap'>followings</span>
          </div>

          <h1 className='mt-4 font-semibold gsap'>{userData.name }</h1>
          <h1 className='font-thin gsap'>{userData.bio }</h1>
        </div>
      </div>
    </>
  );
}

export default Account;
