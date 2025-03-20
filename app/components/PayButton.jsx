'use client';

import React from 'react';
import { useUser, SignUpButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function PayButton({ amount, text, className = '' }) {
  const { user } = useUser();
  const router = useRouter();

  const handleClick = () => {
    if (text === "Start Now") {
      if (user) {
        // If user is logged in, navigate to userDashboard
        router.push('/userDashboard');
      } 
      // For non-logged in users, the SignUpButton will handle the redirect
    } else if (text === "Read More") {
      // Navigate to the About page
      router.push('/about');
    }
  };

  // Create the button with consistent styling
  const buttonElement = (
    <button 
      className={`butt w-full ${className}`} 
      onClick={handleClick}
    >
      <span>{text}</span>
    </button>
  );

  // For non-logged in users clicking "Start Now", wrap with SignUpButton
  if (text === "Start Now" && !user) {
    return (
      <SignUpButton afterSignUpUrl='/userDashboard'>
        {buttonElement}
      </SignUpButton>
    );
  }

  // For all other cases, return the button directly
  return buttonElement;
} 