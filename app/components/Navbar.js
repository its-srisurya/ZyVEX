"use client";
import React, { useState } from 'react';

import Link from 'next/link';
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs';

const Navbar = () => {
    const [razorpayKey, setRazorpayKey] = useState('');
    const [razorpaySecret, setRazorpaySecret] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission, e.g., store the values in state or send them to an API
        console.log('Razorpay Key:', razorpayKey);
        console.log('Razorpay Secret:', razorpaySecret);
    };

    return (
        
        <nav className='bg-black text-white flex justify-between items-center h-15 px-4'>
            <div className="logo font-bold text-xl flex items-center gap-3">
                <Link href="/"><img src="/logoo.jpg" width={27} alt="logo image" /></Link>
                <Link href="/" className='text-xxl'><span>ZyVEX</span></Link>
            </div>
            <div className="flex items-center gap-4 ml-auto">
                <ClerkProvider afterSignOutUrl='/'>
                    
                    <div className="flex items-center gap-4">
                        <SignedOut>
                            <div className="btn-17">
                                <span className="text-container">
                                    <span className="text"><SignInButton forceRedirectUrl='/userDashboard' /></span>
                                </span>
                            </div>
                            <div className="btn-17">
                                <span className="text-container">
                                    <span className="text"><SignUpButton forceRedirectUrl='/rpaydash' /></span>
                                </span>
                            </div>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </ClerkProvider>
            </div>
        </nav>
       
    );
};

export default Navbar;