import { getUserFromToken } from "@/lib/auth/jwt";
import { connectDB } from "@/lib/mongodb";

import Topic from "@/lib/models/Topic";
import Problem from "@/lib/models/Problem";
import UserProgress from "@/lib/models/UserProgress";
import { User } from "../models/User";

type DashboardParams = {
  page: number;
  limit: number;
};

export async function getDashboardData({
  page,
  limit,
}: DashboardParams) {
  await connectDB();

  const user = await getUserFromToken();
  console.log('user', user)


  if (!user) {
    throw new Error("Unauthorized");
  }

  const dbUser = await User.findById(user.sub).lean();

  if (!dbUser) {
    throw new Error("User not found");
  }

  const skip = (page - 1) * limit;

  // fetch all topics
  const topics = await Topic.find({})
    .sort({ order: 1 })
    .lean();

  // fetch paginated problems
  const problems = await Problem.find({})
    .sort({ order: 1 })
    .skip(skip)
    .limit(limit)
    .lean();

  // fetch user progress
  const progress = await UserProgress.find({
    userId: user.sub,

    problemId: {
      $in: problems.map((problem) => problem._id),
    },
  }).lean();

  // map progress
  const progressMap = new Map(
    progress.map((item) => [
      item.problemId.toString(),
      item.completed,
    ])
  );

  // group topics
  const topicMap = new Map();

  for (const topic of topics) {
    topicMap.set(topic._id.toString(), {
      id: topic._id,
      title: topic.title,
      slug: topic.slug,
      order: topic.order,

      progress: {
        completed: 0,
        total: 0,
        percentage: 0,
      },

      problems: [],
    });
  }

  // attach problems to topics
  for (const problem of problems) {
    const topic = topicMap.get(
      problem.topicId.toString()
    );

    if (!topic) {
      continue;
    }

    const completed =
      progressMap.get(problem._id.toString()) || false;

    topic.problems.push({
      id: problem._id,

      title: problem.title,

      slug: problem.slug,

      subtopic: problem.subtopic,

      difficulty: problem.difficulty,

      tags: problem.tags,

      resourceLinks: problem.resourceLinks,

      completed,
    });

    topic.progress.total += 1;

    if (completed) {
      topic.progress.completed += 1;
    }
  }

  // calculate topic percentages
  for (const topic of topicMap.values()) {
    topic.progress.percentage =
      topic.progress.total === 0
        ? 0
        : Math.round(
          (topic.progress.completed /
            topic.progress.total) *
          100
        );
  }

  const finalTopics = Array.from(topicMap.values());

  const totalProblems =
    await Problem.countDocuments();

  const completedProblems =
    await UserProgress.countDocuments({
      userId: user.sub,
      completed: true,
    });

  const completionPercentage =
    totalProblems === 0
      ? 0
      : Math.round(
        (completedProblems / totalProblems) * 100
      );

  return {
    user: {
      id: dbUser._id,
      name: dbUser.name,
      email: dbUser.email,
    },

    progressSummary: {
      completedProblems,
      totalProblems,
      completionPercentage,
    },

    topics: finalTopics,

    pagination: {
      page,
      limit,
      total: totalProblems,
      totalPages: Math.ceil(
        totalProblems / limit
      ),
      hasNextPage:
        skip + limit < totalProblems,
    },
  };
}