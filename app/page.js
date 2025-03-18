import Image from "next/image";
import PayButton from "./components/PayButton";

export default function Home() {
  return (
    <>
      <div className="flex justify-center flex-col items-center text-black h-[44vh] gap-3">
        <div className="font-bold text-5xl flex justify-center items-center gap-3">Grab Me a Coffee <span><img src="/coffee.gif" width={44} alt="d" /></span></div>
        <p>
          A crowd funding platform for creators
        </p>
        <div >
          <PayButton amount={1000} text="Start Now" />
          <PayButton amount={1000} text="Read More" />
        </div>
      </div>
      <div className="bg-black h-1 opacity-40"></div>


      <div className="container mx-auto my-12 px-4 md:px-8">
        <h2 className="font-bold text-2xl text-center mb-10">How ZyVEX Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 ">
          <div className="text-center bg-gray-50 rounded-lg p-6 shadow-sm border-2 border-black">
            <div className="bg-white p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center shadow-md border-2 border-black">
              <img src="/man.gif" width={60} alt="Create Account" className="rounded-full" />
            </div>
            <h3 className="text-xl font-bold mb-2">Create Your Account</h3>
            <p className="text-gray-700 px-4 py-2">Sign up for ZyVEX and customize your profile to showcase who you are and what you create.</p>
          </div>
          <div className="text-center bg-gray-50 rounded-lg p-6 shadow-sm border-2 border-black">
            <div className="bg-white p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center shadow-md border-2 border-black">
              <img src="/group.gif" width={60} alt="Share Your Page" className="rounded-full" />
            </div>
            <h3 className="text-xl font-bold mb-2">Share With Supporters</h3>
            <p className="text-gray-700 px-4 py-2">Share your personalized ZyVEX link with your audience across all your platforms.</p>
          </div>
          <div className="text-center bg-gray-50 rounded-lg p-6 shadow-sm border-2 border-black">
            <div className="bg-white p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center shadow-md border-2 border-black">
              <img src="/coin.gif" width={60} alt="Receive Support" className="rounded-full" />
            </div>
            <h3 className="text-xl font-bold mb-2">Receive Support</h3>
            <p className="text-gray-700 px-4 py-2">Your supporters can easily contribute any amount to help you continue creating content they love.</p>
          </div>
        </div>
      </div>

      <div className="bg-black h-1  opacity-40"></div>

      <div id="learn-more" className="container mx-auto my-8">
        <h2 className="font-bold text-lg text-center mb-8">Learn More About Us</h2>
        <div>
          <p className="p-6 text-center">Welcome to Zyvex, a platforam dedicated to empowering creators and fostering a community of passionate supporters. We believe in the power of connection — where creators can share their work and fans can actively support their favorite artists, writers, musicians, and content creators.</p>
          <p className="p-6 text-center">At Zyvex, we provide a space where creators can receive consistent support to fuel their creativity. Through small contributions like buying a coffee or simply showing your appreciation, you help make their dreams a reality. Whether you're an artist, a musician, or a storyteller, your support enables creators to keep doing what they love.</p>
          <p className="p-6  text-center">We're all about building a community where creativity thrives, and every bit of support makes a difference. Join us in this journey to help creators continue doing what they do best!

          </p>
        </div>

      </div>

    </>
  );
}
