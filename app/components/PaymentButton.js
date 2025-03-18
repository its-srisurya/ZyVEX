"use client";
import { useState, useEffect } from 'react';
import { createPayment } from '../../actions/userActions';
import Script from 'next/script';

export default function PaymentButton({ amount, name = '', message = '', children }) {
  // Convert amount to number to ensure consistent behavior
  const numericAmount = Number(amount);
  
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [error, setError] = useState('');
  const [scriptError, setScriptError] = useState(false);
  
  // Log component props for debugging
  useEffect(() => {
    console.log(`PaymentButton [${numericAmount}]: name=${name ? 'YES' : 'NO'}, message=${message ? 'YES' : 'NO'}`);
  }, [numericAmount, name, message]);

  const handlePayment = async () => {
    // Clear any previous errors
    setError('');
    
    console.log(`Button clicked: amount=${numericAmount}`);
    
    // Validate inputs
    if (!numericAmount || numericAmount <= 0) {
      console.log('Failed: Invalid amount', numericAmount);
      setError('Amount is required and must be greater than 0');
      return;
    }
    
    if (!name || name.trim() === '') {
      console.log('Failed: Empty name');
      setError('Name is required');
      return;
    }
    
    if (!message || message.trim() === '') {
      console.log('Failed: Empty message');
      setError('Message is required');
      return;
    }
    
    if (scriptError) {
      console.log('Failed: Script error');
      setError("Razorpay failed to load. Please check your internet connection or try again later.");
      return;
    }
    
    if (!scriptLoaded) {
      console.log('Failed: Script not loaded');
      setError("Razorpay is still loading. Please try again in a moment.");
      return;
    }
    
    try {
      // Show loading state
      setPaymentLoading(true);
      console.log('Creating payment...', { amount: numericAmount, name, message });
      
      // Create order on the server
      const result = await createPayment(numericAmount, name, message);
      
      if (!result.success) {
        throw new Error(result.error || "Failed to create payment");
      }
      
      console.log('Payment created successfully, opening Razorpay...');
      
      // Configure Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_KEY_ID,
        amount: result.order.amount,
        currency: result.order.currency,
        name: "ZyVEX Platform",
        description: "Support Payment",
        order_id: result.order.id,
        handler: function (response) {
          alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
          // Reload the page to update the list of supporters
          window.location.reload();
        },
        prefill: {
          name: name
        },
        notes: {
          message: message
        },
        theme: {
          color: "#353B3C"
        }
      };

      // Open Razorpay
      if (window.Razorpay) {
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        throw new Error("Razorpay SDK not loaded. Please refresh the page.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setError(error.message || 'Payment failed');
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => {
          console.log('Razorpay script loaded');
          setScriptLoaded(true);
          setScriptError(false);
        }}
        onError={() => {
          console.log('Razorpay script failed to load');
          setScriptLoaded(false);
          setScriptError(true);
          setError("Failed to load Razorpay. Please check your internet connection.");
        }}
      />
      
      <div className="flex flex-col">
        <div className="min-h-3 text-center mb-1">
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
        
        <button
          type="button"
          onClick={handlePayment}
          disabled={paymentLoading}
          className={children ? "" : "bg-white text-black border border-green-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group cursor-pointer"}
          style={{
            opacity: paymentLoading ? 0.7 : 1
          }}
        >
          {children || (
            <>
              Pay {numericAmount}
              <span className="bg-black shadow-black absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
            </>
          )}
        </button>
      </div>
    </>
  );
} 