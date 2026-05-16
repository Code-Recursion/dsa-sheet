import type { z } from "zod";
import type {
  loginSchema,
  registerPayloadSchema,
  registerSchema,
} from "@/lib/validations/auth";

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type RegisterPayload = z.infer<typeof registerPayloadSchema>;

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type AuthResponse = {
  user: AuthUser;
};

export type ApiErrorBody = {
  message: string;
};
