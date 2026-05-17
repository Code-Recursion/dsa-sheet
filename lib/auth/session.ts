import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/lib/auth/constants";
import { verifyAuthToken } from "@/lib/auth/jwt";
import { findUserById, toPublicUser } from "@/lib/auth/user-store";

export async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = await verifyAuthToken(token);
    const user = await findUserById(payload.sub);

    if (!user) {
      return null;
    }

    return toPublicUser(user);
  } catch {
    return null;
  }
}
