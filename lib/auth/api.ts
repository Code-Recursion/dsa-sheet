import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { clearAuthCookie, setAuthCookie } from "@/lib/auth/cookies";
import { signAuthToken } from "@/lib/auth/jwt";
import { toPublicUser, type StoredUser } from "@/lib/auth/user-store";
import type { AuthUser } from "@/lib/types/auth";

export function jsonError(message: string, status: number) {
  return NextResponse.json({ message }, { status });
}

export function jsonValidationError(error: ZodError) {
  const message = error.issues[0]?.message ?? "Invalid request body";
  return jsonError(message, 400);
}

export async function jsonAuthSuccess(user: StoredUser) {
  const token = await signAuthToken({
    sub: user.id,
    email: user.email,
  });

  const response = NextResponse.json({ user: toPublicUser(user) satisfies AuthUser });
  setAuthCookie(response, token);

  return response;
}

export function jsonLogoutSuccess() {
  const response = NextResponse.json({ success: true });
  clearAuthCookie(response);
  return response;
}
