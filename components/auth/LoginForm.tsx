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
import type { LoginInput } from "@/lib/types/auth";
import { loginSchema } from "@/lib/validations/auth";
import { AuthShell } from "./AuthShell";
import { FormField } from "./FormField";

export function LoginForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginInput) {
    setFormError(null);

    try {
      await authService.login(data);
      setIsRedirecting(true);
      router.push("/dashboard");
    } catch (error) {
      setFormError(
        error instanceof ApiError
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  const isLoading = isSubmitting || isRedirecting;

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue tracking your DSA progress."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormField
          label="Email"
          type="email"
          registration={register("email")}
          error={errors.email?.message}
          autoComplete="email"
          placeholder="you@example.com"
          disabled={isLoading}
        />
        <FormField
          label="Password"
          type="password"
          registration={register("password")}
          error={errors.password?.message}
          autoComplete="current-password"
          placeholder="••••••••"
          disabled={isLoading}
        />

        {formError ? (
          <Alert variant="destructive">
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        ) : null}

        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          {isRedirecting ? "Redirecting…" : isSubmitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </AuthShell>
  );
}
