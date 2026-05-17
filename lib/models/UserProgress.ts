import mongoose, { Schema, models, model } from "mongoose";

const UserProgressSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    problemId: {
      type: Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

UserProgressSchema.index(
  { userId: 1, problemId: 1 },
  { unique: true }
);

const UserProgress =
  models.UserProgress ||
  model("UserProgress", UserProgressSchema);

export default UserProgress;