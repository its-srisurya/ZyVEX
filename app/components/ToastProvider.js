"use client";

import { ToastContainer } from 'react-toastify';

/**
 * ToastProvider Component
 * Provides toast notifications throughout the application
 * Configures the global toast container with custom settings
 */
export default function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"      // Position toasts in the top-right corner
      autoClose={5000}         // Automatically close toasts after 5 seconds
      hideProgressBar={false}  // Show progress bar for toast duration
      newestOnTop={false}      // Stack new toasts below existing ones
      closeOnClick={false}     // Prevent closing on click (must use close button)
      rtl={false}             // Left-to-right layout
      pauseOnFocusLoss        // Pause timer when window loses focus
      draggable               // Allow dragging to dismiss
      pauseOnHover           // Pause timer when hovering over toast
      theme="dark"           // Use dark theme for toasts
    />
  );
} 