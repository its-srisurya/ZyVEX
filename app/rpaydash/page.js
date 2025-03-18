"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // For Next.js 13+

const RazorpayForm = ({ onSubmit }) => {
    const [razorpayKey, setRazorpayKey] = useState('');
    const [razorpaySecret, setRazorpaySecret] = useState('');
    const router = useRouter(); // Initialize router

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Razorpay Key:', razorpayKey);
        console.log('Razorpay Secret:', razorpaySecret);
        
        // Call the onSubmit function if provided
        if (onSubmit) {
            onSubmit(razorpayKey, razorpaySecret);
        }

        // Redirect to /userDashboard
        router.push('/userDashboard');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-black border-white border-y">
            <form onSubmit={handleSubmit} className="bg-black p-6 rounded-lg shadow-md">
                <table className="table-auto w-full">
                    <tbody>
                        <tr>
                            <td className="px-4 py-2 text-white">Razorpay Key:</td>
                            <td className="px-4 py-2">
                                <input
                                    type="text"
                                    placeholder="Razorpay Key"
                                    value={razorpayKey}
                                    onChange={(e) => setRazorpayKey(e.target.value)}
                                    className="px-2 py-1 rounded border w-full text-white"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 text-white">Razorpay Secret:</td>
                            <td className="px-4 py-2">
                                <input
                                    type="text"
                                    placeholder="Razorpay Secret"
                                    value={razorpaySecret}
                                    onChange={(e) => setRazorpaySecret(e.target.value)}
                                    className="px-2 py-1 rounded border w-full text-white"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="px-4 py-2 text-center">
                                <button type="submit" className="button0">Save</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default RazorpayForm;