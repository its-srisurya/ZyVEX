import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "../../../../models/Payment";
import RazorpayCredentials from "../../../../models/RazorpayCredentials";
import connectToDatabase from "../../../../lib/mongodb";

export async function POST(req) {
  try {
    // Connect to the database with proper error handling
    try {
      await connectToDatabase();
      console.log("Connected to MongoDB in webhook");
    } catch (dbError) {
      console.error("MongoDB connection error in webhook:", dbError);
      return NextResponse.json({ 
        success: false, 
        message: "Database connection error",
        error: dbError.message
      }, { status: 500 });
    }
    
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
    let payment;
    try {
      payment = await Payment.findOne({ orderId: body.razorpay_order_id });
      if (!payment) {
        return NextResponse.json({ 
          success: false, 
          message: "Order ID not found" 
        }, { status: 404 });
      }

      // Get the recipient's Razorpay credentials
      const credentials = await RazorpayCredentials.findOne({ userId: payment.recipient });
      if (!credentials) {
        return NextResponse.json({ 
          success: false, 
          message: "Razorpay credentials not found for recipient" 
        }, { status: 404 });
      }
      
      // Verify the payment signature using recipient's key secret
      const isValid = validatePaymentVerification(
        {
          "order_id": body.razorpay_order_id, 
          "payment_id": body.razorpay_payment_id
        }, 
        body.razorpay_signature, 
        credentials.keySecret
      );
      
      if (isValid) {
        // Update the payment status to completed
        try {
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
        } catch (saveError) {
          console.error("Error saving payment:", saveError);
          return NextResponse.json({ 
            success: false, 
            message: "Error saving payment",
            error: saveError.message
          }, { status: 500 });
        }
      } else {
        // Update payment status to failed
        try {
          payment.status = 'failed';
          await payment.save();
          
          return NextResponse.json({ 
            success: false, 
            message: "Payment verification failed" 
          }, { status: 400 });
        } catch (saveError) {
          console.error("Error saving failed payment:", saveError);
          return NextResponse.json({ 
            success: false, 
            message: "Error saving failed payment",
            error: saveError.message
          }, { status: 500 });
        }
      }
    } catch (findError) {
      console.error("Error finding payment:", findError);
      return NextResponse.json({ 
        success: false, 
        message: "Error finding payment",
        error: findError.message
      }, { status: 500 });
    }
  } catch (error) {
    console.error("Error in payment webhook:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
} 