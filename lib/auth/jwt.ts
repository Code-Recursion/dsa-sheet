import { SignJWT, jwtVerify } from "jose";

export type AuthTokenPayload = {
  sub: string;
  email: string;
};

function getJwtSecret() {
  const secret =
    process.env.JWT_SECRET ??
    (process.env.NODE_ENV === "development"
      ? "dev-only-jwt-secret-change-in-production"
      : undefined);

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return new TextEncoder().encode(secret);
}

export async function signAuthToken(payload: AuthTokenPayload) {
  return new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecret());
}

export async function verifyAuthToken(token: string) {
  const { payload } = await jwtVerify(token, getJwtSecret(), {
    algorithms: ["HS256"],
  });

  if (typeof payload.sub !== "string" || typeof payload.email !== "string") {
    throw new Error("Invalid token payload");
  }

  return {
    sub: payload.sub,
    email: payload.email,
  } satisfies AuthTokenPayload;
}
