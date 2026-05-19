"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "../ui/button";
import { authService } from "@/lib/services/auth.service";
import { useRouter } from "next/navigation";

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await authService.logout();
      router.push("/login");
    } catch (error) {}
  };

  return (
    <div className="flex flex-1 flex-col bg-gradient-to-b from-indigo-50/90 via-background to-background px-4 py-8 dark:from-indigo-950/50">
      <div className="mx-auto w-full max-w-6xl flex items-center justify-between mb-8 pb-4 border-b border-border/10">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 text-sm font-semibold text-primary"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-sm font-black text-primary-foreground shadow-md shadow-primary/10">
            D
          </span>
          <span className="text-lg font-bold text-foreground bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            DSA Tracker
          </span>
        </Link>
        <Button onClick={handleLogout} variant="outline" size="sm" className="font-semibold shadow-sm">
          Logout
        </Button>
      </div>
      <div className="mx-auto w-full max-w-6xl">
        {children}
      </div>
    </div>
  );
}
