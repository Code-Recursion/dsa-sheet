import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI");
}

declare global {
  var mongooseConn: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

global.mongooseConn ||= {
  conn: null,
  promise: null,
};

export async function connectDB() {
  if (global.mongooseConn.conn) {
    return global.mongooseConn.conn;
  }

  if (!global.mongooseConn.promise) {
    console.log("Connecting MongoDB...");

    global.mongooseConn.promise =
      mongoose.connect(MONGODB_URI, {
        bufferCommands: false,
      });
  }

  try {
    global.mongooseConn.conn =
      await global.mongooseConn.promise;

    console.log("MongoDB Connected");

    return global.mongooseConn.conn;
  } catch (error) {
    global.mongooseConn.promise = null;

    console.error("Mongo Error", error);

    throw error;
  }
}