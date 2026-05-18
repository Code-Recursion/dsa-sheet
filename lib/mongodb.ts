import mongoose from "mongoose";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached: MongooseCache = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error("connectDB error: MONGODB_URI is undefined");
    throw new Error("Missing MONGODB_URI environment variable");
  }

  if (cached.conn) {
    console.log("connectDB: Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("connectDB: Establishing new MongoDB connection...");
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log("connectDB: MongoDB connected successfully");
      return mongooseInstance;
    }).catch((err) => {
      console.error("connectDB: MongoDB connection failed:", err);
      cached.promise = null;
      throw err;
    });
  } else {
    console.log("connectDB: Awaiting existing MongoDB connection promise...");
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}