import { headers, cookies } from "next/headers";
import { apiRequest } from "@/lib/api/client";
import { AUTH_COOKIE_NAME } from "@/lib/auth/constants";

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
  auth = true
): Promise<T> {
  const baseUrl = await getServerBaseUrl();
  const url = path.startsWith("http") ? path : `${baseUrl}${path}`;

  const headersObj: Record<string, string> = {
    ...((options.headers as Record<string, string>) || {}),
  };

  if (auth) {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    if (token) {
      headersObj["Cookie"] = `${AUTH_COOKIE_NAME}=${token}`;
    }
  }

  return apiRequest<T>(url, {
    ...options,
    headers: headersObj,
    cache: "no-store",
  });
}
