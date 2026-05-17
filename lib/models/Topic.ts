import mongoose, { Schema, models, model } from "mongoose";

const TopicSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
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

const Topic = models.Topic || model("Topic", TopicSchema);

export default Topic;