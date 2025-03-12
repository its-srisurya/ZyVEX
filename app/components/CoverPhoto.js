"use client"
"use client"
import React, { useState, useEffect } from 'react';

const CoverPhoto = () => {
  const defaultImage = "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=1024x1024&w=0&k=20&c=z8_rWaI8x4zApNEEG9DnWlGXyDIXe-OmsAyQ5fGPVV8=";
  const [imageSrc, setImageSrc] = useState(localStorage.getItem('coverImage') || defaultImage);

  useEffect(() => {
    localStorage.setItem('coverImage', imageSrc);
  }, [imageSrc]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="cover w-full relative">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        id="fileInput"
        className="hidden"
      />
      <button 
        className="upload absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => document.getElementById('fileInput').click()}
      >
        <span className="btn__icon">
          <svg strokeLinejoin="round" stroke-linecap="round" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
            <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"></path>
            <path d="M9 15l3 -3l3 3"></path>
            <path d="M12 12l0 9"></path>
          </svg>
        </span>
        <span className="btn__text">Change Cover</span>
      </button>
      <img className="covers object-cover w-full h-[325px]" src={imageSrc} alt="Cover" />
     
    </div>
  );
};

export default CoverPhoto;
