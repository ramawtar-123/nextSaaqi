"use client"

import React, { useState} from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { useGSAP } from '@gsap/react'
import { useSelector } from 'react-redux';


interface PostProps {
  isDarkMode: boolean;
}

const Post: React.FC<PostProps> = ({ isDarkMode }) => {
  const FULLUSER = useSelector(state => state.rootReducer.fullUserInfo)
  const [postContent, setPostContent] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: postContent }),
      });

      if (response.ok) {
        console.log('Post submitted successfully');
      } else {
        console.error('Error submitting post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useGSAP(()=>{
    gsap.from(".post-animation", {
        y: 50,
        opacity: 0,
        delay:1
    })
})

  return (
    <>
      <div className={`${isDarkMode ? "bg-zinc-900" : "light-mode-component-bg"} hover:drop-shadow-[0_20px_20px_rgba(58,20,80,0.65)]  post-animation w-[90%] h-40 rounded-xl mx-10 flex flex-col`}>
        <form onSubmit={handleSubmit}>
          <div className="text flex">
            <Link href="/account">
             
                <div className='w-12 h-12 flex justify-center items-center rounded-full m-5 ml-8 mr-3 min-w-12'>
                  <img className='object-cover w-full h-full rounded-full ' src={FULLUSER.profilePicture} />
                </div>
            
            </Link>

            <textarea
              name="postText"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              id="posttext"
              cols={80}
              rows={3}
              placeholder="What's on your mind?"
              className="peer h-[60%] min-h-[50%] w-[75%] resize-none outline outline-0 transition-all disabled:resize-none mt-6 bg-transparent rounded-xl px-6 py-2 no-scrollbar"
            ></textarea>

            <div className="threedots ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white m-10 ml-20">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
              </svg>
            </div>
          </div>
          <div className="options flex justify-between">
            <div className="flex">
              <button className={`w-8 h-8 global-theme-color flex justify-center items-center rounded-full ml-10 mb-11 min-w-8`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`text-white w-4 h-4`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                </svg>
              </button>


            </div>

            <button type='submit' className='w-16 mr-12 text-white h-8 global-theme-color flex justify-center items-center rounded-md ml-4 mb-11 min-w-8'>
              Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Post;
