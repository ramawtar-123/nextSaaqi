import React, { useRef } from 'react';

interface FileUploadButtonProps {
  onFileUpload: (file: File) => void;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ onFileUpload }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button onClick={() => inputRef.current?.click()}>+</button>
    </div>
  );
};

export default FileUploadButton;
