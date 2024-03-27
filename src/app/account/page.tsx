"use client"

import React, { useEffect, useState } from 'react';


function Account() {

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

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



  return (
    <>
      <div className="main flex gap-32 dark-mode-bg w-full h-[100vh] p-32 pl-[30rem]">
        <div className="profile w-[10rem] h-[10rem] overflow-hidden rounded-full">
          <img src={userData.profilePicture} alt="" />
        </div>
        <div className="information w-[20rem] h-[8rem] justify-start">
          <div className='flex gap-8'>
            <h1 className="text-2xl">{userData.username}</h1>
            <button>Edit Profile</button>
          </div>

          <div className='flex gap-7'>
            <h1>{}</h1> <span className='ml-[-7%]'>posts</span>
            <h1>{userData.followers }</h1> <span className='ml-[-7%]'>followers</span>
            <h1>{userData.followings }</h1> <span className='ml-[-7%]'>followings</span>
          </div>

          <h1 className='mt-4 font-semibold'>{userData.name }</h1>
          <h1 className='font-thin'>{userData.bio }</h1>
        </div>
      </div>
    </>
  );
}

export default Account;
