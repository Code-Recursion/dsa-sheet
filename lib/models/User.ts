import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  passwordHash: {
    type: String,
    required: true,
  },
});

export const User =
  models.User || model("User", UserSchema);