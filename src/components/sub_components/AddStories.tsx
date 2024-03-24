"use client"

import React from 'react';
import Link from 'next/link';

function AddStories(): JSX.Element {
  return (
    <>
      <Link href="/addstory">
       
          <div className="w-16 h-16 bg-pink-100 text-black flex justify-center items-center rounded-full m-5 min-w-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
      
      </Link>
    </>
  );
}

export default AddStories;
