import {
  jsonAuthSuccess,
  jsonError,
  jsonValidationError,
} from "@/lib/auth/api";
import { verifyPassword } from "@/lib/auth/password";
import { findUserByEmail } from "@/lib/auth/user-store";
import { loginSchema } from "@/lib/validations/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return jsonValidationError(parsed.error);
    }

    const { email, password } = parsed.data;
    const user = await findUserByEmail(email);

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return jsonError("Invalid email or password", 401);
    }

    return jsonAuthSuccess(user);
  } catch(err) {
    console.error("error occured whie loggin in ", err);
    return jsonError("Unable to sign in. Please try again.", 500);
  }
}
