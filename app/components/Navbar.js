import React from 'react'
import Link from 'next/link'
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'

const Navbar = () => {
    return (
        <nav className='bg-black text-white flex justify-between items-center h-15'>
            <div className="logo font-bold px-4 text-xl flex justify-center items-center gap-3">
                <Link href="/"><img src="/logoo.jpg" width={27} alt="logo image" /></Link>
                <Link href="/" className='text-xxl'><span>ZyVEX</span></Link>
            </div>
            {/* <ul className='flex justify-between items-center p-4 gap-3'>
                <li>Home</li>
                <li>About</li>
                <li>Projects</li>
                <li>Sign up</li>
                <li>Login</li>
            </ul> */}

            <div>
                <ClerkProvider
                    afterSignOutUrl='/'
                >
                    <div className="flex justify-end items-center p-4 gap-4 h-16">
                        <SignedOut>

                            <div className="btn-17">
                                <span className="text-container">
                                    <span className="text"><SignInButton forceRedirectUrl='/userDashboard' /></span>
                                </span>
                            </div>
                            <div className="btn-17">
                                <span className="text-container">
                                    <span className="text"><SignUpButton forceRedirectUrl='/userDashboard' /></span>
                                </span>
                            </div>



                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </ClerkProvider >
            </div>
        </nav>
    )
}

export default Navbar
