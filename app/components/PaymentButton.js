"use client";
import { useState, useEffect } from 'react';
import { createPayment } from '../../actions/userActions';
import Script from 'next/script';
import { toast } from 'react-toastify';

/**
 * PaymentButton Component
 * Handles Razorpay payment integration and payment processing
 * 
 * @param {number} amount - The payment amount
 * @param {string} name - The name of the payer
 * @param {string} message - A message from the payer
 * @param {React.ReactNode} children - Optional child elements for custom button content
 */
export default function PaymentButton({ amount, name = '', message = '', children }) {
  // Convert amount to number to ensure consistent behavior
  const numericAmount = Number(amount);

  // State management for payment processing
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [error, setError] = useState('');
  const [scriptError, setScriptError] = useState(false);

  // Log component props for debugging purposes
  useEffect(() => {
    console.log(`PaymentButton [${numericAmount}]: name=${name ? 'YES' : 'NO'}, message=${message ? 'YES' : 'NO'}`);
  }, [numericAmount, name, message]);

  // Load Razorpay script and handle its state
  useEffect(() => {
    // Check if Razorpay is already available in window
    if (typeof window !== 'undefined' && window.Razorpay) {
      console.log('Razorpay already available in window');
      setScriptLoaded(true);
      setScriptError(false);
      return;
    }

    // Function to dynamically load Razorpay script
    const loadRazorpay = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;

      // Handle successful script load
      script.onload = () => {
        console.log('Razorpay script loaded dynamically');
        setScriptLoaded(true);
        setScriptError(false);
      };

      // Handle script load error
      script.onerror = () => {
        console.log('Razorpay script failed to load dynamically');
        setScriptLoaded(false);
        setScriptError(true);
        setError("Failed to load Razorpay. Please check your internet connection.");
      };

      // Append script to document body
      document.body.appendChild(script);
    };

    // Load the script
    loadRazorpay();

    // Cleanup function to remove script on component unmount
    return () => {
      const script = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (script && script.parentNode === document.body) {
        document.body.removeChild(script);
      }
    };
  }, []);

  /**
   * Verify payment with server
   * @param {Object} paymentData - Payment verification data
   * @returns {Promise<Object>} Verification result
   */
  const verifyPayment = async (paymentData) => {
    try {
      // Send verification request to server
      const response = await fetch('/api/payment/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      // Parse and return response
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      return { success: false, error: error.message };
    }
  };

  /**
   * Handle payment processing
   * Validates inputs and initiates Razorpay payment
   */
  const handlePayment = async () => {
    // Clear any previous errors
    setError('');

    console.log(`Button clicked: amount=${numericAmount}`);

    // Validate required inputs
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

    // Check for script loading errors
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
      // Set loading state
      setPaymentLoading(true);
      console.log('Creating payment...', { amount: numericAmount, name, message });

      // Create order on server
      const result = await createPayment(numericAmount, name, message);

      if (!result.success) {
        throw new Error(result.error || "Failed to create payment");
      }

      console.log('Payment created successfully, opening Razorpay...');

      // Configure Razorpay options
      const options = {
        key: result.order.notes?.key_id || process.env.NEXT_PUBLIC_KEY_ID,
        amount: result.order.amount,
        currency: result.order.currency,
        name: "ZyVEX Platform",
        description: "Support Payment",
        order_id: result.order.id,
        handler: async function (response) {
          // Show verification message
          setError("Verifying payment...");

          // Verify payment with server
          const verificationResult = await verifyPayment({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature
          });

          if (verificationResult.success) {
            // Show success toast
            toast.success('Payment is successful', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });

            // Set success flag in localStorage
            localStorage.setItem('paymentSuccess', 'true');

            // Reload page after delay
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            // Show error toast
            toast.error(`Payment verification failed: ${verificationResult.message || "Unknown error"}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setError("Payment verification failed: " + (verificationResult.message || "Unknown error"));
          }
        },
        prefill: {
          name: name
        },
        notes: {
          message: message
        },
        theme: {
          color: "#353B3C"
        },
        modal: {
          ondismiss: function () {
            setPaymentLoading(false);
          }
        }
      };

      // Initialize and open Razorpay
      if (window.Razorpay) {
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        throw new Error("Razorpay SDK not loaded. Please refresh the page.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setError(error.message || 'Payment failed');

      // Show error toast
      toast.error(`Payment failed: ${error.message || 'Unknown error'}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setPaymentLoading(false);
    }
  };

  // Render the payment button
  return (
    <>
      <div className="flex flex-col">
        {/* Error message display */}
        <div className="min-h-6 text-center mb-1">
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>

        {/* Payment button */}
        <button
          type="button"
          onClick={handlePayment}
          disabled={paymentLoading}
          className={children ? "" : "bg-white text-black border border-green-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group cursor-pointer"}
          style={{
            opacity: paymentLoading ? 0.7 : 1
          }}
        >
          {/* Loading state */}
          {paymentLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {children ? 'Processing...' : `Processing ${numericAmount}...`}
            </div>
          ) : (
            // Normal state
            children || (
              <>
                Pay {numericAmount}
                <span className="bg-black shadow-black absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
              </>
            )
          )}
        </button>
      </div>
    </>
  );
} 