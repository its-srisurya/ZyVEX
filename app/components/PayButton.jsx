'use client';

import React from 'react';

export default function PayButton({ amount, text }) {
  const handlePay = async (amount) => {
    console.log(`Processing payment of ${amount}`);
    try {
      // This is where you would integrate with a payment provider
      // For example with Stripe:
      // const response = await fetch('/api/create-payment-intent', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ amount })
      // });
      // const data = await response.json();
      
      // Here you would typically redirect to checkout or open a payment modal
      alert(`Payment of $${amount/100} initiated!`);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <button className="butt" onClick={() => handlePay(amount)}>
      <span>{text}</span>
    </button>
  );
} 