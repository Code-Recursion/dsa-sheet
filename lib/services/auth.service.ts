import { apiRequest } from "@/lib/api/client";
import type {
  AuthResponse,
  LoginInput,
  RegisterPayload,
} from "@/lib/types/auth";

export const authService = {
  login(data: LoginInput) {
    return apiRequest<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  register(data: RegisterPayload) {
    return apiRequest<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  logout() {
    return apiRequest<{ success: true }>("/api/auth/logout", {
      method: "POST",
    });
  },
};
