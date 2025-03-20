"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';

export default function NotFound() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  // Handle mouse movement to create a subtle parallax effect
  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    setPosition({ x, y });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Video Background */}
      <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
        
        
        {/* Overlay to ensure text remains readable */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <div 
        className="min-h-screen bg-transparent text-white flex flex-col items-center justify-center p-4"
        onMouseMove={handleMouseMove}
      >
        <div className="max-w-3xl w-full text-center error-container">
          <h1 
            className="error-number"
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
              transition: 'transform 0.2s ease-out'
            }}
          >
            404
          </h1>
          
          <div className="mb-8 relative error-icon">
          </div>
          
          <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
          
          <p className="text-xl mb-8 text-gray-300">
            Looks like you've wandered into uncharted territory. The page you're looking for doesn't exist or may have been moved.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/" className="bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
              Go Home
            </Link>
            
            <Link href="/about" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-black transition">
              About ZyVEX
            </Link>
          </div>
        </div>
        
        <div className="mt-12 pulse-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </>
  );
} 