import mongoose from 'mongoose';

// Get the MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://zyvex:Surya%4094927@zyvex-cluster.wxctj.mongodb.net/zyvex?retryWrites=true&w=majority&appName=ZyVEX-Cluster';

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
      bufferCommands: true,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    };

    console.log('Connecting to MongoDB Atlas...');
    
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        // Log the database name we're connected to
        const dbName = mongoose.connection.db.databaseName;
        console.log(`MongoDB Atlas connected successfully to database: ${dbName}`);
        return mongoose;
      })
      .catch(err => {
        console.error('MongoDB Atlas connection error:', err);
        cached.promise = null;
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    console.error('Failed to resolve MongoDB Atlas connection promise:', e);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase; 