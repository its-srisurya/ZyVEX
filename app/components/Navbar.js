import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-black text-white flex justify-between items-center h-15'>
            <div className="logo font-bold px-4 text-xl flex justify-center items-center gap-3">
               <a href="/"><img src="/coffee.gif" width={24} alt="logo image" /></a> 
               <a href="/"><span >ZyVEX</span></a> 
            </div>
            <ul className='flex justify-between items-center p-4 gap-3'>
                <li>Home</li>
                <li>About</li>
                <li>Projects</li>
                <li>Sign up</li>
                <li>Login</li>
            </ul>
        </nav>
    )
}

export default Navbar
