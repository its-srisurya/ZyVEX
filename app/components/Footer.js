import React from 'react'

/**
 * Footer Component
 * Displays the application's footer with copyright information
 * Automatically updates the year using JavaScript's Date object
 */
const Footer = () => {
  // Get the current year for the copyright notice
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className='bg-black  text-white flex items-center justify-center h-15'>
        <p className='text-center'>copyright &copy; {currentYear} <span className='font-bold'>ZyVEX </span> - All rights reserved!</p>
    </footer>
  )
}

export default Footer
