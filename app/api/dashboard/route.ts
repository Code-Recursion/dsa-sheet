import { NextResponse } from "next/server";
import { dashboardSampleData } from "@/lib/data/dashboard-sample";
import { paginateDashboardData } from "@/lib/data/dashboard-pagination";

function parsePositiveInt(value: string | null, fallback: number): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  return Math.floor(parsed);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parsePositiveInt(searchParams.get("page"), 1);
  const limit = parsePositiveInt(searchParams.get("limit"), 20);

  const data = paginateDashboardData(dashboardSampleData, page, limit);

  return NextResponse.json({
    success: true,
    data,
  });
}
