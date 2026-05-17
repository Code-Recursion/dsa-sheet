import { headers } from "next/headers";
import { apiRequest } from "@/lib/api/client";

export async function getServerBaseUrl(): Promise<string> {
  const headerList = await headers();
  const host =
    headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "localhost:3000";
  const protocol = headerList.get("x-forwarded-proto") ?? "http";

  return `${protocol}://${host}`;
}

export async function serverApiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const baseUrl = await getServerBaseUrl();
  const url = path.startsWith("http") ? path : `${baseUrl}${path}`;

  return apiRequest<T>(url, {
    ...options,
    cache: "no-store",
  });
}
