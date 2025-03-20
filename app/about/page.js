"use client";

import Image from "next/image";
import Link from "next/link";
import { useUser, SignUpButton } from '@clerk/nextjs';

export default function About() {
  const { user, isLoaded } = useUser();

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 lg:px-16">
      {/* Hero section */}
      <div className="max-w-6xl mx-auto mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About ZyVEX</h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          A platform that connects creators with their supporters
        </p>
      </div>

      {/* Mission section */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-4">
              ZyVEX was created to empower content creators by providing them with a simple way to receive support from their fans and audience. Our platform allows creators to focus on what they do best - creating amazing content - while giving their supporters an easy way to show appreciation.
            </p>
            <p className="text-lg text-gray-700">
              We believe that every creator deserves support, regardless of their field or audience size. Whether you're a digital artist, musician, writer, podcaster, or any other type of creator, ZyVEX provides the tools you need to establish sustainable support from your community.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Image 
              src="/coffee.gif" 
              alt="Support creators" 
              width={256}
              height={256}
              className="w-64 h-64 object-contain rounded-xl border-4 border-black shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* How it works section */}
      <div className="max-w-6xl mx-auto mb-16 bg-gray-50 p-8 rounded-xl border-2 border-black">
        <h2 className="text-3xl font-bold mb-8 text-center">How ZyVEX Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center shadow-md">
              <Image src="/man.gif" width={60} height={60} alt="Create Account" className="rounded-full" />
            </div>
            <h3 className="text-xl font-bold mb-2">Create Your Account</h3>
            <p className="text-gray-700">Sign up for ZyVEX and customize your profile to showcase who you are and what you create.</p>
          </div>
          <div className="text-center">
            <div className="bg-white p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center shadow-md">
              <Image src="/group.gif" width={60} height={60} alt="Share Your Page" className="rounded-full" />
            </div>
            <h3 className="text-xl font-bold mb-2">Share With Supporters</h3>
            <p className="text-gray-700">Share your personalized ZyVEX link with your audience across all your platforms.</p>
          </div>
          <div className="text-center">
            <div className="bg-white p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center shadow-md">
              <Image src="/coin.gif" width={60} height={60} alt="Receive Support" className="rounded-full" />
            </div>
            <h3 className="text-xl font-bold mb-2">Receive Support</h3>
            <p className="text-gray-700">Your supporters can easily contribute any amount to help you continue creating content they love.</p>
          </div>
        </div>
      </div>

      {/* Creator section */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-gray-100 p-6 rounded-xl shadow-md">
              <Image 
                src="/logoo.jpg" 
                alt="Sri Surya Havanuru" 
                width={128}
                height={128}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-white"
              />
              <h3 className="text-2xl font-bold text-center mb-2">Sri Surya Havanuru</h3>
              <p className="text-center text-gray-700 mb-2">Founder & Developer</p>
              <div className="flex justify-center space-x-4">
                <a href="https://github.com/its-srisurya" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>
                </a>
                <a href="https://www.linkedin.com/in/srisuryahavanuru/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
                </a>
                <a href="https://x.com/its_srisurya" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">From the Creator</h2>
            <p className="text-lg text-gray-700 mb-4">
              &quot;I created ZyVEX to solve a problem I saw many creators facing - finding a sustainable way to monetize their passion. As a developer and creator myself, I understand the challenges of balancing creative work with financial stability.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              ZyVEX is designed to be simple, transparent, and effective. Our name comes from &apos;Zy&apos; representing the infinite possibilities for creators, and &apos;VEX&apos; standing for value exchange - the core principle of our platform.
            </p>
            <p className="text-lg text-gray-700">
              I believe in building technology that empowers people to do what they love. With ZyVEX, I hope to create a community where creators can thrive with the support of those who value their work.&quot;
            </p>
            <p className="text-lg font-bold mt-4">- Sri Surya Havanuru</p>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose ZyVEX</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-3">Simple & Transparent</h3>
            <p className="text-gray-700">No complicated tiers or subscription management. Just straightforward support from fans to creators.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-3">Low Fees</h3>
            <p className="text-gray-700">We keep our fees minimal so creators receive as much of their supporters' contributions as possible.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-3">Personalized Experience</h3>
            <p className="text-gray-700">Customize your profile to reflect your brand and connect with your audience authentically.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-3">Direct Support</h3>
            <p className="text-gray-700">Supporters can leave personal messages along with their contributions, creating meaningful connections.</p>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="max-w-4xl mx-auto text-center bg-black text-white py-16 px-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl mb-8">Join thousands of creators already using ZyVEX to connect with their supporters.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/" className="bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
            Go Home
          </Link>
          
          {isLoaded && user ? (
            <Link href="/userDashboard" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-black transition">
              View Dashboard
            </Link>
          ) : (
            <SignUpButton forceRedirectUrl='/rpaydash'>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-black transition">
                Sign Up
              </button>
            </SignUpButton>
          )}
        </div>
      </div>
    </div>
  );
} 