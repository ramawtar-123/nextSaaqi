//app/addimages.jsx

"use client"

import React, { useState } from 'react';


function AddStories(): JSX.Element {

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async (event) => {

    event.preventDefault();
    
    try {

      const formData = new FormData();
      formData.append('name', file.name);
      formData.append('file', file);
      console.log(file)

      const response = await fetch('/api/story', {
        method: 'PUT',
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await response.json();
      console.log('Uploaded file URL:', data.uploadedFileUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  return (
    <>
       
          <div className="w-16 h-16 bg-zinc-300 text-black flex justify-center items-center rounded-full m-5 min-w-16">
           
          <form onSubmit={handleFileUpload} className='relative' encType="multipart/form-data">
            <input
              type="file"
              name='file'
              onChange={handleFileChange}
              className='text-black z-[-10]'
            />
            <button type='submit' className='text-black absolute left-[50%] top-[50%]'>+</button>
          </form>
             
          </div>

    </>
  );
}

export default AddStories;
