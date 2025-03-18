import mongoose from 'mongoose';

// Set the database name explicitly
const DATABASE_NAME = 'zyvex';

const PaymentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [1, 'Amount should be at least 1']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true
  },
  paymentId: {
    type: String,
    trim: true
  },
  orderId: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['created', 'completed', 'failed'],
    default: 'created'
  },
  recipient: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'payments', // Explicitly set collection name
});

// Log which database the model is connecting to
console.log(`Payment model configured for database: ${DATABASE_NAME}, collection: payments`);

// If mongoose is already connected, check which database it's using
if (mongoose.connection && mongoose.connection.readyState === 1) {
  const currentDb = mongoose.connection.db.databaseName;
  console.log(`Current MongoDB connection using: ${currentDb}`);
  
  if (currentDb !== DATABASE_NAME) {
    console.warn(`WARNING! Connected to ${currentDb} instead of ${DATABASE_NAME}`);
  }
}

// Check if the model exists before creating it to prevent overwriting
const Payment = mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);

export default Payment; 