// import { type Metadata } from 'next'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ClerkProvider } from '@clerk/nextjs';
import ToastProvider from "./components/ToastProvider";
import 'react-toastify/dist/ReactToastify.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: 'ZyVEX',
    template: '%s - ZyVEX'
  },
  description: "A crowd funding platform for creators",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider 
      appearance={{
        variables: { colorPrimary: '#000000' },
        baseTheme: undefined
      }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar />
          <div className="relative min-h-screen bg-white">
            {/* Background pattern div */}
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
            
            {/* Content */}
            <div className="relative z-10">
              {children}
            </div>
          </div>
          <Footer />
          <ToastProvider />
        </body>
      </html>
    </ClerkProvider>
  );
}
