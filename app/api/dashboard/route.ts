import { NextResponse } from "next/server";
import { getDashboardData } from "@/lib/data/dashboard";
import { jsonError } from "@/lib/auth/api";

function parsePositiveInt(value: string | null, fallback: number): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  return Math.floor(parsed);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parsePositiveInt(searchParams.get("page"), 1);
    const limit = parsePositiveInt(searchParams.get("limit"), 20);

    const data = await getDashboardData({ page, limit });

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return jsonError("Unauthorized", 401);
    }
    if (error.message === "User not found") {
      return jsonError("User not found", 404);
    }
    console.error("Dashboard GET error:", error);
    return jsonError(error.message || "Internal Server Error", 500);
  }
}
