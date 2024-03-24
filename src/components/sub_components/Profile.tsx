"use client"

import React from 'react';
import Link from 'next/link';

const Profile: React.FC = () => {
  return (
    <>
      <Link href="/account">

          <div className="profile">
            <button className='w-12 h-12 flex justify-center items-center rounded-full m-5 ml-8 mr-3 min-w-12'>
              <img className='object-cover w-full h-full rounded-full ' src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />    
            </button>
          </div>

      </Link>
    </>
  );
};

export default Profile;
