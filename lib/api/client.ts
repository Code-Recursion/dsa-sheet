import type { ApiErrorBody } from "@/lib/types/auth";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = (await response.json()) as T & ApiErrorBody;

  if (!response.ok) {
    throw new ApiError(data.message ?? "Something went wrong", response.status);
  }

  return data;
}
