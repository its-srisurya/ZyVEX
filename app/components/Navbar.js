"use client";
// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// Import Clerk authentication components
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
    useUser,
} from '@clerk/nextjs';
import { toast } from 'react-toastify';

/**
 * RazorpayForm Component
 * Modal form for users to enter their Razorpay API credentials
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onClose - Function to call when the form is closed
 */
const RazorpayForm = ({ onClose }) => {
    // Get current user information from Clerk
    const { user } = useUser();
    // State for form inputs and loading status
    const [razorpayKey, setRazorpayKey] = useState('');
    const [razorpaySecret, setRazorpaySecret] = useState('');
    const [loading, setLoading] = useState(false);

    /**
     * Handle form submission
     * Saves Razorpay credentials to the user's account
     * 
     * @param {Event} e - Form submission event
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            // Send credentials to the server API
            const response = await fetch('/api/razorpay/credentials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    keyId: razorpayKey,
                    keySecret: razorpaySecret
                }),
            });

            const data = await response.json();
            
            if (data.success) {
                // Show success notification
                toast.success('Razorpay credentials saved successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                // Reset form fields
                setRazorpayKey('');
                setRazorpaySecret('');
                onClose(); // Close the form after successful submission
            } else {
                throw new Error(data.error || 'Failed to save credentials');
            }
        } catch (error) {
            // Show error notification
            toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } finally {
            setLoading(false);
        }
    };

    // Render the modal form
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4 ">
                {/* Modal header with title and close button */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-black font-bold text-xl">Razorpay Credentials</h3>
                    <button 
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {/* Credential input form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-gray-700 mb-2 font-medium">Key ID</label>
                        <input
                            type="text"
                            placeholder="Enter your Razorpay Key ID"
                            value={razorpayKey}
                            onChange={(e) => setRazorpayKey(e.target.value)}
                            className="w-full p-2 rounded bg-white text-black border border-gray-300 focus:border-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2 font-medium">Key Secret</label>
                        <input
                            type="password"
                            placeholder="Enter your Razorpay Key Secret"
                            value={razorpaySecret}
                            onChange={(e) => setRazorpaySecret(e.target.value)}
                            className="w-full p-2 rounded bg-white text-black border border-gray-300 focus:border-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    {/* Submit button */}
                    <div className="flex justify-center mt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="ui-btn"
                        >
                            <span>
                                {loading ? 'Saving...' : 'Save'}
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

/**
 * Navbar Component
 * Main navigation bar for the application with authentication controls
 */
const Navbar = () => {
    // State to control the display of the Razorpay credentials form
    const [showRazorpayForm, setShowRazorpayForm] = useState(false);

    return (
        <nav className='bg-black text-white flex justify-between items-center h-15 px-4'>
            {/* Logo and brand name */}
            <div className="logo font-bold text-xl flex items-center gap-3">
                <Link href="/"><Image src="/logoo.jpg" width={27} height={27} alt="logo image" /></Link>
                <Link href="/" className='text-xxl'><span>ZyVEX</span></Link>
            </div>
            {/* Authentication controls */}
            <div className="flex items-center gap-4 ml-auto">
                <div className="flex items-center gap-2 md:gap-4">
                    {/* Show these buttons for signed out users */}
                    <SignedOut>
                        <div className="btn-17 scale-75 md:scale-100">
                            <span className="text-container">
                                <span className="text"><SignInButton  /></span>
                            </span>
                        </div>
                        <div className="btn-17 scale-75 md:scale-100">
                            <span className="text-container">
                                <span className="text"><SignUpButton afterSignUpUrl="/userDashboard" /></span>
                            </span>
                        </div>
                    </SignedOut>
                    {/* Show these controls for signed in users */}
                    <SignedIn>
                        <div className="flex items-center gap-2">
                            {/* Dashboard button */}
                            <Link href="/userDashboard">
                                <div className="btn-17 scale-75 md:scale-100">
                                    <span className="text-container">
                                        <span className="text">Dashboard</span>
                                    </span>
                                </div>
                            </Link>
                            {/* Razorpay settings button */}
                            <button
                                onClick={() => setShowRazorpayForm(true)}
                                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                                title="Razorpay Settings"
                            >
                                <Image 
                                    src="/rp.png" 
                                    alt="Razorpay Settings" 
                                    width={24}
                                    height={24}
                                    className="w-6 h-6 rounded-full"
                                />
                            </button>
                            {/* User profile button from Clerk */}
                            <UserButton signOutUrl="/" />
                        </div>
                    </SignedIn>
                </div>
            </div>
            {/* Conditionally render the Razorpay form modal */}
            {showRazorpayForm && (
                <RazorpayForm onClose={() => setShowRazorpayForm(false)} />
            )}
        </nav>
    );
};

export default Navbar;