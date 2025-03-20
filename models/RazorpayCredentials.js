import mongoose from 'mongoose';

const razorpayCredentialsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  keyId: {
    type: String,
    required: true
  },
  keySecret: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Check if the model exists before creating it
const RazorpayCredentials = mongoose.models.RazorpayCredentials || mongoose.model('RazorpayCredentials', razorpayCredentialsSchema);

export default RazorpayCredentials; 