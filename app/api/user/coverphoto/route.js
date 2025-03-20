import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import connectToDatabase from '../../../../lib/mongodb';
import mongoose from 'mongoose';

// Define a User schema for storing cover photos if it doesn't exist yet
let UserProfile;
try {
  UserProfile = mongoose.model('UserProfile');
} catch {
  const userProfileSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    coverPhoto: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  UserProfile = mongoose.models.UserProfile || mongoose.model('UserProfile', userProfileSchema);
}

// GET: Fetch the user's cover photo
export async function GET(request) {
  try {
    // Get the authenticated user
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({
        success: false,
        error: "Authentication required"
      }, { status: 401 });
    }

    // Connect to the database
    await connectToDatabase();

    // Find the user's profile
    const userProfile = await UserProfile.findOne({ userId: user.id });
    
    // If no profile is found, return success but no cover photo
    if (!userProfile || !userProfile.coverPhoto) {
      return NextResponse.json({
        success: true,
        coverPhoto: null
      });
    }

    // Return the cover photo
    return NextResponse.json({
      success: true,
      coverPhoto: userProfile.coverPhoto
    });
  } catch (error) {
    console.error('Error fetching cover photo:', error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch cover photo"
    }, { status: 500 });
  }
}

// POST: Save or update the user's cover photo
export async function POST(request) {
  try {
    // Get the authenticated user
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({
        success: false,
        error: "Authentication required"
      }, { status: 401 });
    }

    // Parse the request body
    const body = await request.json();
    
    // Validate the cover photo data
    if (!body.coverPhoto) {
      return NextResponse.json({
        success: false,
        error: "Cover photo is required"
      }, { status: 400 });
    }

    // Connect to the database
    await connectToDatabase();
    
    // Find and update or create the user's profile with the new cover photo
    await UserProfile.findOneAndUpdate(
      { userId: user.id },
      { 
        userId: user.id,
        coverPhoto: body.coverPhoto,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Cover photo updated successfully"
    });
  } catch (error) {
    console.error('Error saving cover photo:', error);
    return NextResponse.json({
      success: false,
      error: "Failed to save cover photo"
    }, { status: 500 });
  }
} 