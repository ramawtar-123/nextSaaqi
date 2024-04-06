"use client"

import React from 'react';
import Link from 'next/link';
import FileUploadButton from '../helpers/FileUploadButton';

function AddStories(): JSX.Element {

  const handleFileUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/story', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File uploaded successfully!');
      } else {
        alert('Failed to upload file.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file.');
    }
  }


  return (
    <>
       
          <div className="w-16 h-16 bg-zinc-300 text-black flex justify-center items-center rounded-full m-5 min-w-16">
           
              <FileUploadButton onFileUpload={handleFileUpload} />
             
          </div>

    </>
  );
}

export default AddStories;
