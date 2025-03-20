"use client"
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { toast } from 'react-toastify';
import Image from 'next/image';

const CoverPhoto = () => {
  // Use a local fallback image from the public folder
  const defaultImage = "/default-cover.jpg"; 
  const [imageSrc, setImageSrc] = useState(defaultImage);
  const [uploading, setUploading] = useState(false);
  const { user, isLoaded } = useUser();

  // Fetch the user's cover photo from database when component mounts
  useEffect(() => {
    if (isLoaded && user) {
      fetchCoverPhoto();
    }
  }, [isLoaded, user]);

  const fetchCoverPhoto = async () => {
    try {
      const response = await fetch('/api/user/coverphoto', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const data = await response.json();
      
      if (data.success && data.coverPhoto) {
        setImageSrc(data.coverPhoto);
      }
    } catch (error) {
      console.error('Error fetching cover photo:', error);
      // Keep using the default image if fetch fails
    }
  };

  const saveCoverPhoto = async (imageDataUrl) => {
    try {
      setUploading(true);
      const response = await fetch('/api/user/coverphoto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coverPhoto: imageDataUrl
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Cover photo updated successfully!', {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
      } else {
        throw new Error(data.error || 'Failed to update cover photo');
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      console.error('Error saving cover photo:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024 * 2) { // 2MB limit
        toast.error('Image size should be less than 2MB', {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target.result;
        setImageSrc(imageDataUrl);
        saveCoverPhoto(imageDataUrl);
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
        className="upload absolute bottom-4 right-4 z-10"
        onClick={() => document.getElementById('fileInput').click()}
        disabled={uploading}
      >
        {uploading ? (
          <span className="btn__text">Uploading...</span>
        ) : (
          <>
            <span className="btn__icon">
              <svg strokeLinejoin="round" strokeLinecap="round" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
                <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"></path>
                <path d="M9 15l3 -3l3 3"></path>
                <path d="M12 12l0 9"></path>
              </svg>
            </span>
            <span className="btn__text">
              <span className="hidden md:inline">Change Cover</span>
              <span className="inline md:hidden">Change</span>
            </span>
          </>
        )}
      </button>
      <Image 
        className="covers object-cover w-full h-[325px] border-b-4 border-b-white" 
        src={imageSrc}
        alt="Cover"
        width={1920}
        height={325}
        priority={true}
        unoptimized={imageSrc !== defaultImage}
      />
    </div>
  );
};

export default CoverPhoto;
