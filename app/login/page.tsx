import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign in | DSA Tracker",
  description: "Sign in to your DSA Tracker account",
};

export default function LoginPage() {
  return <LoginForm />;
}
