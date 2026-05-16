import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create account | DSA Tracker",
  description: "Create a DSA Tracker account",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
