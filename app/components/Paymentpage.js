"use client"
import React, { useEffect } from 'react'
import Script from 'next/script'

const Paymentpage = () => {
  useEffect(() => {
    // Wait for the Razorpay script to load and initialize the payment
    const options = {
      key: "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
      amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Acme Corp", // Your business name
      description: "Test Transaction", // Corrected spelling from 'deScription'
      image: "https://example.com/your_logo",
      order_id: "order_9A33XWu170gUtm", // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
      prefill: {
        name: "Gaurav Kumar", // Customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000" // Customer's phone number
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#3399cc"
      }
    };

    // Initialize Razorpay
    const rzp1 = new Razorpay(options);

    // Bind the event on the button click
    const button = document.getElementById('rzp-button1');
    button?.addEventListener('click', (e) => {
      e.preventDefault();
      rzp1.open();
    });
  }, []); // This useEffect will run once after the initial render

  return (
    <>
      <button id="rzp-button1">Pay</button>
      {/* Load the Razorpay script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      
    </>
  )
}

export default Paymentpage
