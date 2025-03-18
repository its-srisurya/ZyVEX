import mongoose from 'mongoose';

// Get the MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/zyvex';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

console.log(`Using MongoDB connection string: ${MONGODB_URI}`);

// Global is used here to maintain connection across hot reloads in development
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    };

    console.log('Connecting to MongoDB...');
    
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        // Log the database name we're connected to
        const dbName = mongoose.connection.db.databaseName;
        console.log(`MongoDB connected successfully to database: ${dbName}`);
        return mongoose;
      })
      .catch(err => {
        console.error('MongoDB connection error:', err);
        cached.promise = null;
        return { connection: { readyState: 0 } };
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    console.error('Failed to resolve MongoDB connection promise:', e);
    cached.promise = null;
    return { connection: { readyState: 0 } };
  }

  return cached.conn;
}

export default connectToDatabase; 