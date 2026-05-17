import { jsonLogoutSuccess } from "@/lib/auth/api";

export async function POST() {
  return jsonLogoutSuccess();
}
