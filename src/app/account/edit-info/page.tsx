"use client"

import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'
import User from '../../../../models/User'; 
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';



function UserDetails() {

  const USERINFO = useSelector(state => state.rootReducer.fullUserInfo)

  const router = useRouter()
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setFile(event.target.files[0])
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/uploadimage', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        console.log(data); // Handle response from the server
      } catch (error) {
        console.error('Error uploading file:', error);
        // Handle error
      }
    }

  };

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    bio: "",
    profilePicture:""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("User registered successfully");
        router.push("/login");
      } else {
        console.error("Error registering user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      setStatus('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/uploadimage', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();



      setStatus(data.message);
    } catch (error) {
      console.error('Error uploading file:', error);
      setStatus('An error occurred while uploading the file');
    }
  };




  return (
    <div className='content-center h-screen bg-black'>
    <div className='w-[75vw] h-[80vh] m-auto content-center bg-black text-center border rounded-xl'>
        <form action="" className='flex-col gap-10 '>
            <div className="prof bg-red-600 border-2 w-20 h-20 rounded-full m-auto mb-10">
              <input onChange={handleFileChange} ref={fileInputRef} className='text-black hidden' type="file" name="picture" id="picture" placeholder='' /><br /><br />
              <button onClick={handleButtonClick}>Upload</button>
            </div>
            
            <div className="names justify-center items-center flex gap-5 ">
              <input className='w-[18%] h-9 p-4 pl-6 text-white bg-zinc-900 rounded-[8px] focus:outline-none placeholder-gray-200 mb-[-5px] text-[14px]' type="text" name='name' placeholder='Full Name' disabled />
              <input className='w-[16%] h-9 p-4 pl-6 text-white bg-zinc-900 rounded-[8px] focus:outline-none placeholder-gray-200 mb-[-5px] text-[14px]' type="text" name='username' placeholder='Username' required />
            </div>
            <br/>
            <input className='w-[36%] h-9 p-4 pl-6 text-white bg-zinc-900 rounded-[8px] focus:outline-none placeholder-gray-200 mb-[-10px] text-[14px]' type="email" name="email" id="email" placeholder='Email' disabled /><br /><br />
            <input className='w-[36%] h-9 p-4 pl-6 text-white bg-zinc-900 rounded-[8px] focus:outline-none placeholder-gray-200 mb-[-10px] text-[14px] ' type="text" name="bio" id="bio" placeholder='Bio' /><br /><br />
            <input className='w-[10%] h-9 text-white bg-zinc-900 rounded-[8px] text-[14px]' type="submit" value="submit" placeholder='update' />
        </form>
    </div>
    </div>
  )
}

export default UserDetails