"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api/client";
import { authService } from "@/lib/services/auth.service";
import type { RegisterInput } from "@/lib/types/auth";
import { registerSchema } from "@/lib/validations/auth";
import { AuthShell } from "./AuthShell";
import { FormField } from "./FormField";

export function RegisterForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: RegisterInput) {
    setFormError(null);

    try {
      await authService.register({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      router.push("/login");
    } catch (error) {
      setFormError(
        error instanceof ApiError
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start logging problems and building your DSA streak."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormField
          label="Full name"
          registration={register("name")}
          error={errors.name?.message}
          autoComplete="name"
          placeholder="Alex Johnson"
        />
        <FormField
          label="Email"
          type="email"
          registration={register("email")}
          error={errors.email?.message}
          autoComplete="email"
          placeholder="you@example.com"
        />
        <FormField
          label="Password"
          type="password"
          registration={register("password")}
          error={errors.password?.message}
          autoComplete="new-password"
          placeholder="At least 8 characters"
        />
        <FormField
          label="Confirm password"
          type="password"
          registration={register("confirmPassword")}
          error={errors.confirmPassword?.message}
          autoComplete="new-password"
          placeholder="Repeat your password"
        />

        {formError ? (
          <Alert variant="destructive">
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        ) : null}

        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Creating account…" : "Create account"}
        </Button>
      </form>
    </AuthShell>
  );
}
