'use client';

import React from 'react';
import { useUser, SignUpButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

/**
 * PayButton Component
 * A reusable button component that handles navigation and authentication states
 * 
 * @param {number} amount - The payment amount (used for payment buttons)
 * @param {string} text - The text to display on the button
 * @param {string} className - Optional additional CSS classes
 */
export default function PayButton({ amount, text, className = '' }) {
  // Get current user's authentication state from Clerk
  const { user } = useUser();
  // Initialize Next.js router for navigation
  const router = useRouter();

  /**
   * Handles button click events
   * Routes to different pages based on button text and user authentication
   */
  const handleClick = () => {
    // Handle "Start Now" button click
    if (text === "Start Now") {
      // If user is logged in, navigate to dashboard
      if (user) {
        router.push('/userDashboard');
      } 
      // For non-logged in users, SignUpButton wrapper handles the redirect
    } 
    // Handle "Read More" button click
    else if (text === "Read More") {
      // Navigate to the About page
      router.push('/about');
    }
  };

  // Create the base button element with consistent styling
  const buttonElement = (
    <button 
      // Apply base button class and any additional classes
      className={`butt w-full ${className}`} 
      // Attach click handler
      onClick={handleClick}
    >
      {/* Display button text */}
      <span>{text}</span>
    </button>
  );

  // Special handling for "Start Now" button when user is not logged in
  if (text === "Start Now" && !user) {
    // Wrap with Clerk's SignUpButton for authentication
    return (
      <SignUpButton forceRedirectUrl='/rpaydash'>
        {buttonElement}
      </SignUpButton>
    );
  }

  // Return the button element for all other cases
  return buttonElement;
} 