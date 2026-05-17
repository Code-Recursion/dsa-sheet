import mongoose, { Schema, models, model } from "mongoose";

const ProblemSchema = new Schema(
  {
    topicId: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    subtopic: {
      type: String,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    resourceLinks: {
      youtube: String,
      article: String,
      leetcode: String,
      codeforces: String,
    },

    order: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ProblemSchema.index({ topicId: 1, order: 1 });

const Problem =
  models.Problem || model("Problem", ProblemSchema);

export default Problem;