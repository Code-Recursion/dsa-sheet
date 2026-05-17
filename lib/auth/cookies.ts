import type { NextResponse } from "next/server";
import { AUTH_COOKIE_MAX_AGE, AUTH_COOKIE_NAME } from "@/lib/auth/constants";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set(AUTH_COOKIE_NAME, token, {
    ...cookieOptions,
    maxAge: AUTH_COOKIE_MAX_AGE,
  });
}

export function clearAuthCookie(response: NextResponse) {
  response.cookies.set(AUTH_COOKIE_NAME, "", {
    ...cookieOptions,
    maxAge: 0,
  });
}
