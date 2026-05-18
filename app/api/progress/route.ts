import { NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth/jwt";
import { connectDB } from "@/lib/mongodb";
import UserProgress from "@/lib/models/UserProgress";
import { jsonError } from "@/lib/auth/api";

export async function PATCH(request: Request) {
  try {
    const user = await getUserFromToken();
    if (!user) {
      return jsonError("Unauthorized", 401);
    }

    const { problemId, completed } = await request.json();

    if (!problemId || typeof completed !== "boolean") {
      return jsonError("problemId (string) and completed (boolean) are required", 400);
    }

    await connectDB();

    const progress = await UserProgress.findOneAndUpdate(
      { userId: user.sub, problemId },
      {
        completed,
        completedAt: completed ? new Date() : null,
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({
      success: true,
      data: progress,
    });
  } catch (error: any) {
    console.error("Progress PATCH error:", error);
    return jsonError(error.message || "Internal Server Error", 500);
  }
}
