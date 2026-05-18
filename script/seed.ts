import mongoose from "mongoose";

import { topics } from "@/data/topics";
import { problems } from "@/data/problems";
import Problem from "@/lib/models/Problem";
import Topic from "@/lib/models/Topic";

const MONGODB_URI = process.env.MONGODB_URI!;

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log("Connected to MongoDB");

    // clear old data
    await Topic.deleteMany({});
    await Problem.deleteMany({});

    // insert topics
    const insertedTopics = await Topic.insertMany(topics);

    // create topic map
    const topicMap = insertedTopics.reduce((acc, topic) => {
      acc[topic.slug] = topic._id;
      return acc;
    }, {} as Record<string, mongoose.Types.ObjectId>);

    // prepare problems
    const formattedProblems = problems.map((problem) => ({
      ...problem,
      topicId: topicMap[problem.topicSlug],
    }));

    // insert problems
    await Problem.insertMany(formattedProblems);

    console.log("Database seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();