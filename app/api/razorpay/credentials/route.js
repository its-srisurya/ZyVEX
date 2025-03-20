import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import connectToDatabase from "../../../../lib/mongodb";
import RazorpayCredentials from "../../../../models/RazorpayCredentials";

export async function POST(req) {
  try {
    // Check if user is authenticated
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        message: "Unauthorized" 
      }, { status: 401 });
    }

    // Parse request body
    const body = await req.json();
    const { keyId, keySecret } = body;
    
    // Validate input
    if (!keyId || !keySecret) {
      return NextResponse.json({ 
        success: false, 
        message: "Key ID and Key Secret are required" 
      }, { status: 400 });
    }

    // Connect to database
    await connectToDatabase();
    
    // Save or update credentials
    const savedCredentials = await RazorpayCredentials.findOneAndUpdate(
      { userId: user.id },
      { 
        userId: user.id,
        keyId,
        keySecret
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ 
      success: true,
      message: "Razorpay credentials saved successfully",
      data: {
        userId: savedCredentials.userId,
        keyId: savedCredentials.keyId,
        // Don't expose the secret in the response
      }
    });
  } catch (error) {
    console.error("Error saving Razorpay credentials:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    // Check if user is authenticated
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        message: "Unauthorized" 
      }, { status: 401 });
    }

    // Connect to database
    await connectToDatabase();
    
    // Get credentials for the current user
    const credentials = await RazorpayCredentials.findOne({ userId: user.id });
    
    if (!credentials) {
      return NextResponse.json({ 
        success: false, 
        message: "No Razorpay credentials found" 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true,
      data: {
        userId: credentials.userId,
        keyId: credentials.keyId,
        // Don't expose the secret in the response
      }
    });
  } catch (error) {
    console.error("Error retrieving Razorpay credentials:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
} 