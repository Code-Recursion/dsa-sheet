import {
  jsonAuthSuccess,
  jsonError,
  jsonValidationError,
} from "@/lib/auth/api";
import { hashPassword } from "@/lib/auth/password";
import { createUser, findUserByEmail } from "@/lib/auth/user-store";
import { registerPayloadSchema } from "@/lib/validations/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerPayloadSchema.safeParse(body);

    if (!parsed.success) {
      return jsonValidationError(parsed.error);
    }

    const { name, email, password } = parsed.data;

    if (await findUserByEmail(email)) {
      return jsonError("An account with this email already exists", 409);
    }

    const passwordHash = await hashPassword(password);
    const user = await createUser({ name, email, passwordHash });

    if (!user) {
      return jsonError("An account with this email already exists", 409);
    }

    return jsonAuthSuccess(user);
  } catch {
    return jsonError("Unable to register. Please try again.", 500);
  }
}
