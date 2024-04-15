"use client"

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

interface UserData {
  fullname: string;
  username?: string;
  email?: string;
  password?: string;
  confirmpassword?: string;
  profilePicture: string;
  bio: string;
  likes: {
      post: string;
      createdAt: Date;
  }[];
  posts: {
      post: string;
      createdAt: Date;
  }[];
  stories: {
      story: string;
      createdAt: Date;
  }[];
  followers: {
      user: string;
      createdAt: Date;
  }[];
  followings: {
      user: string;
      createdAt: Date;
  }[];
  createdAt: Date;
}


interface UserAccountProps {
  isDarkMode: boolean;
}

const UserAccount: React.FC<UserAccountProps> = ({ isDarkMode }) => {

  const [userData, setUserData] = useState<UserData[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  const USER = useSelector(state => state.rootReducer.user);
  const router = useRouter()
  const dispatch = useDispatch();

  useEffect(() => {

    // const currentUser = USER.email

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/api/userslist`)
        if (response.status !== 200) {
          throw new Error('Failed to fetch feed');
        }
        const data = await response.data;
        const updatedData = data.map(user => ({ ...user, isFollowing: false }));
        setUserData(updatedData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);


  useGSAP(() => {
    gsap.from(".friends-animation", {
      y: 100,
      opacity: 0,
      stagger: 0.3,
      delay: 1
    });
  });

  // const [userToFollow, setUserToFollow] = useState({});
  const userinfo = useSelector(state => state.rootReducer.user);
  const FULLUSER = useSelector(state => state.rootReducer.fullUserInfo)

  let currentuserinfo = {};
  let newuserinfo = "";

  let containsNumber123;

  const handleFollowClick = async (val, i) => {
    try {
      setLoading(true);
      
      const newUserinfo = await axios.get(`api/findUserByEmail?email=${userinfo.email}`)
      const newVal = await axios.get(`api/findUserByEmail?email=${val.email}`)

      const followUserId = userData[i]._id;

      const res = await axios.post('/api/followUser', {
        userId: newUserinfo.data.user._id,
        followUserId: newVal.data.user._id,
      });

      currentuserinfo = newUserinfo.data.user;
      newuserinfo = newVal.data.user._id;

      if(res.status === 200){
        setUserData(prevData => {
          const updatedData = [...prevData];
          updatedData[i].isFollowing = !updatedData[i].isFollowing;
          return updatedData;
        });
        setLoading(false);
      }
    } catch (error) {
      console.error('Error following user:', error);
      setLoading(false);
    }
  };


  return (
    <>
      {userData.map((elem, index) => (
        <div key={index} className={`${isDarkMode ? "dark-mode-component-bg" : "light-mode-component-bg"} hover:drop-shadow-[0_20px_20px_rgba(58,20,80,0.65)]  friends-animation users w-[95%] h-24 rounded `}>
          <div className="flex">
            <div className="profile">
              <button className='w-12 h-12 flex justify-center items-center rounded-full m-5 ml-8 mr-3 min-w-12'>
                <img className="object-cover overflow-hidden w-full h-full rounded-full" src={elem.profilePicture} alt={`Profile of ${elem.username}`} />    
              </button>
            </div>
            <div className="flex-col">
              <h1 className='text-semibold mt-3'>{elem.fullname}</h1>
              <h4 className='text-xs'>{elem.bio}</h4>
              
              <button onClick={() => handleFollowClick(elem, index)} className='w-16 h-6 mt-2 rounded text-[10px] global-theme-color text-white'>
                {`${ elem.isFollowing  ? "Unfollow" : "Follow"}`}
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default UserAccount;
