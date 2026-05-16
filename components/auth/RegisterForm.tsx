"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { AuthShell } from "./AuthShell";
import { FormField } from "./FormField";

export function RegisterForm() {
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
      // Wire to your auth API when ready
      await new Promise((resolve) => setTimeout(resolve, 600));
      console.log("Register:", data);
    } catch {
      setFormError("Something went wrong. Please try again.");
    }
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start logging problems and building your DSA streak."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        noValidate
      >
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
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
            {formError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          {isSubmitting ? "Creating account…" : "Create account"}
        </button>
      </form>
    </AuthShell>
  );
}
