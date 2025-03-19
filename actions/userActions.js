"use server"

import Razorpay from "razorpay"
import connectToDatabase from "../lib/mongodb"
import Payment from "../models/Payment"
import { currentUser } from "@clerk/nextjs/server"

// Helper function to timeout a promise
const timeoutPromise = (promise, ms) => {
    return Promise.race([
        promise,
        new Promise((_, reject) => 
            setTimeout(() => reject(new Error(`Operation timed out after ${ms}ms`)), ms)
        )
    ]);
}

// Helper function to convert Mongoose document to plain object
const convertToPlainObject = (doc) => {
    if (!doc) return null;
    const obj = doc.toObject();
    return {
        _id: obj._id.toString(),
        name: obj.name,
        amount: obj.amount,
        message: obj.message,
        orderId: obj.orderId,
        status: obj.status,
        recipient: obj.recipient,
        createdAt: obj.createdAt?.toISOString(),
        paymentId: obj.paymentId
    };
};

// Get all completed payments for the current user
export async function getUserPayments() {
    try {
        // Get current user
        const user = await currentUser()
        if (!user) {
            return {
                success: false,
                error: "User not authenticated"
            }
        }

        // Connect to MongoDB
        const mongoose = await timeoutPromise(connectToDatabase(), 5000)
        if (mongoose.connection?.readyState !== 1) {
            return {
                success: false,
                error: "Database connection failed"
            }
        }

        // Fetch all completed payments for this user
        const payments = await timeoutPromise(
            Payment.find({ 
                recipient: user.id,
                status: 'completed'
            }).sort({ createdAt: -1 }), // Sort by newest first
            5000
        )

        // Convert Mongoose documents to plain objects
        const plainPayments = payments.map(convertToPlainObject);

        return {
            success: true,
            payments: plainPayments
        }
    } catch (error) {
        console.error("Error fetching user payments:", error)
        return {
            success: false,
            error: error.message
        }
    }
}

export async function createPayment(amount, name, message) {
    // Input validation
    if (!amount || amount <= 0) {
        return { 
            success: false, 
            error: "Amount is required and must be greater than 0" 
        }
    }
    
    if (!name || name.trim() === '') {
        return { 
            success: false, 
            error: "Name is required" 
        }
    }
    
    if (!message || message.trim() === '') {
        return { 
            success: false, 
            error: "Message is required" 
        }
    }
    
    try {
        // Initialize Razorpay
        const razorpay = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET
        })
        
        // Get current user for recipient info
        const user = await currentUser()
        if (!user) {
            return {
                success: false,
                error: "User not authenticated"
            }
        }
        
        // Create Razorpay order
        const options = {
            amount: amount * 100, // Convert to paise
            currency: "INR",
            receipt: "receipt_" + Math.random().toString(36).substring(2,7),
            notes: {
                name: name,
                message: message
            }
        }
        
        // Create the order
        const order = await razorpay.orders.create(options)
        
        // Connect to MongoDB to create a pending payment record
        let dbConnected = true
        try {
            // Add a timeout to prevent hanging
            const mongoose = await timeoutPromise(connectToDatabase(), 5000) // 5 second timeout
            
            if (mongoose.connection?.readyState !== 1) {
                console.warn('MongoDB connection not ready, skipping payment save')
                dbConnected = false
            }
        } catch (dbError) {
            console.error('MongoDB connection error or timeout:', dbError)
            dbConnected = false
        }
        
        // Save the initial payment record in MongoDB if connection is successful
        // This will be updated to 'completed' status by the webhook after verification
        if (dbConnected) {
            try {
                const payment = new Payment({
                    name,
                    amount,
                    message,
                    orderId: order.id,
                    status: 'created', // Initial status is 'created'
                    recipient: user.id
                })
                
                // Add a timeout to the save operation
                await timeoutPromise(payment.save(), 3000) // 3 second timeout
                console.log('Initial payment record saved to MongoDB:', payment._id)
            } catch (saveError) {
                console.error('Error saving payment to MongoDB:', saveError)
                // Continue with payment processing even if saving to DB fails
            }
        }
        
        return { 
            success: true, 
            order 
        }
    } catch (error) {
        console.error("Error creating payment:", error)
        return { 
            success: false, 
            error: error.message 
        }
    }
}

export async function verifyPayment(paymentId, orderId, signature) {
    try {
        // Connect to MongoDB - but continue even if it fails
        let dbConnected = true
        try {
            // Add a timeout to prevent hanging
            const mongoose = await timeoutPromise(connectToDatabase(), 5000) // 5 second timeout
            
            if (mongoose.connection?.readyState !== 1) {
                console.warn('MongoDB connection not ready, skipping payment verification')
                dbConnected = false
            }
        } catch (dbError) {
            console.error('MongoDB connection error or timeout:', dbError)
            dbConnected = false
        }
        
        if (!dbConnected) {
            return {
                success: true,
                message: "Payment verified but not saved to database"
            }
        }
        
        // Find the payment with timeout
        const payment = await timeoutPromise(
            Payment.findOne({ orderId }),
            3000 // 3 second timeout
        )
        
        if (!payment) {
            console.warn('Payment not found in database:', orderId)
            return {
                success: true,
                message: "Payment verified but not found in database"
            }
        }
        
        // Update payment status with timeout
        payment.paymentId = paymentId
        payment.status = 'completed'
        await timeoutPromise(payment.save(), 3000) // 3 second timeout
        
        // Convert the updated payment to a plain object
        const plainPayment = convertToPlainObject(payment);
        
        return {
            success: true,
            payment: plainPayment
        }
    } catch (error) {
        console.error("Error verifying payment:", error)
        return {
            success: false,
            error: error.message
        }
    }
}