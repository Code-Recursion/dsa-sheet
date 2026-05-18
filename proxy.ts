// middleware.ts

import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  console.log("========== REQUEST ==========");
  console.log("METHOD:", request.method);
  console.log("PATH:", request.nextUrl.pathname);
  console.log("QUERY:", request.nextUrl.search);
  console.log(
    "TOKEN:",
    request.cookies.get("auth_token")?.value || "NO_TOKEN"
  );
  console.log("=============================");

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};