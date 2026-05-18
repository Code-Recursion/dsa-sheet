import { serverApiRequest } from "@/lib/api/server";
import type { DashboardApiResponse } from "@/lib/types/dashboard";

export async function getDashboard(page = 1, limit = 20) {
  return serverApiRequest<DashboardApiResponse>(
    `/api/dashboard?page=${page}&limit=${limit}`,
    {},
    true
  );
}
