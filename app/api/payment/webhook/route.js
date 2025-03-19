import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "../../../../models/Payment";
import connectToDatabase from "../../../../lib/mongodb";

export async function POST(req) {
  try {
    await connectToDatabase();
    
    // Parse the request body
    const body = await req.json();
    
    // Validate required parameters
    if (!body.razorpay_order_id || !body.razorpay_payment_id || !body.razorpay_signature) {
      return NextResponse.json({ 
        success: false, 
        message: "Missing required parameters" 
      }, { status: 400 });
    }
    
    // Find the payment with the order ID
    const payment = await Payment.findOne({ orderId: body.razorpay_order_id });
    if (!payment) {
      return NextResponse.json({ 
        success: false, 
        message: "Order ID not found" 
      }, { status: 404 });
    }
    
    // Verify the payment signature
    const isValid = validatePaymentVerification(
      {
        "order_id": body.razorpay_order_id, 
        "payment_id": body.razorpay_payment_id
      }, 
      body.razorpay_signature, 
      process.env.KEY_SECRET
    );
    
    if (isValid) {
      // Update the payment status to completed
      payment.paymentId = body.razorpay_payment_id;
      payment.status = 'completed';
      await payment.save();
      
      return NextResponse.json({ 
        success: true, 
        message: "Payment verified successfully",
        data: {
          orderId: body.razorpay_order_id,
          paymentId: body.razorpay_payment_id
        }
      });
    } else {
      // Update payment status to failed
      payment.status = 'failed';
      await payment.save();
      
      return NextResponse.json({ 
        success: false, 
        message: "Payment verification failed" 
      }, { status: 400 });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
} 