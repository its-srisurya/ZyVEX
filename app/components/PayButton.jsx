'use client';

import React from 'react';
import { useUser, SignUpButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function PayButton({ amount, text }) {
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

  if (text === "Start Now" && !user) {
    return (
      <SignUpButton forceRedirectUrl='/rpaydash'>
        <button className="butt">
          <span>{text}</span>
        </button>
      </SignUpButton>
    );
  }

  return (
    <button className="butt" onClick={handleClick}>
      <span>{text}</span>
    </button>
  );
} 