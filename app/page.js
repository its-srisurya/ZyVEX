import Image from "next/image";


export default function Home() {
  return (
    <>
      <div className="flex justify-center flex-col items-center text-black h-[44vh] gap-3">
        <div className="font-bold text-5xl flex justify-center items-center gap-3">Grab Me a Coffee <span><img src="/coffee.gif" width={44} alt="d" /></span></div>
        <p>
          A crowd funding platform for creators
        </p>
        <div >
          <button className="butt ">
            <span>Start Now</span>
          </button>
          <button className="butt ">
            <span>Read More</span>
          </button>
        </div>
      </div>
      <div className="bg-black h-1 opacity-15"></div>


      <div className="container mx-auto my-10">
        <h1 className="font-bold text-lg text-center my-12.5">Every Coffee Counts!</h1>
        <div className="flex gap-5 justify-around ">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img src="/man.gif" width={85} className="rounded-full border-2 p-2 text-black  bg-slate-200 border-black" alt="" />
            <p className="font-bold">Fund Yourself</p>
            <p className="text-center">Your fans are available to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img src="/coin.gif" width={85} className="rounded-full border-2 p-2 text-blac bg-slate-200 v border-black" alt="" />
            <p className="font-bold">Fund Yourself</p>
            <p className="text-center">Your fans are available to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img src="/group.gif" width={85} className="rounded-full border-2 p-2 text-black bg-slate-200 border-black" alt="" />
            <p className="font-bold">Fans want to help</p>
            <p className=" text-center">Your fans are available to help you</p>
          </div>
        </div>
      </div>

      <div className="bg-black h-1  opacity-15"></div>

      <div className="container mx-auto my-8">
        <h1 className="font-bold text-lg text-center my-10">Learn More About Us</h1>
        <div>
          <p className="p-6 text-center">Welcome to Zyvex, a platform dedicated to empowering creators and fostering a community of passionate supporters. We believe in the power of connection — where creators can share their work and fans can actively support their favorite artists, writers, musicians, and content creators.</p>
          <p className="p-6 text-center">At Zyvex, we provide a space where creators can receive consistent support to fuel their creativity. Through small contributions like buying a coffee or simply showing your appreciation, you help make their dreams a reality. Whether you're an artist, a musician, or a storyteller, your support enables creators to keep doing what they love.</p>
          <p className="p-6  text-center">We’re all about building a community where creativity thrives, and every bit of support makes a difference. Join us in this journey to help creators continue doing what they do best!

          </p>
        </div>

      </div>

    </>
  );
}
