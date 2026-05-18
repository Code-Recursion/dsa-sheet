import mongoose from "mongoose";

export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  console.log("MONGODB_URI", MONGODB_URI);

  if (!MONGODB_URI) {
    throw new Error("Missing MONGODB_URI");
  }

  if (mongoose.connection.readyState >= 1) {
    return;
  }

  await mongoose.connect(MONGODB_URI);
}