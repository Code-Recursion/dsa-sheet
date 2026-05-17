import Link from "next/link";
import type { ReactNode } from "react";

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex flex-1 flex-col bg-gradient-to-b from-indigo-50/90 via-background to-background px-4 py-10 dark:from-indigo-950/50">
      <div className="mx-auto w-full max-w-6xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            D
          </span>
          DSA Tracker
        </Link>
        {children}
      </div>
    </div>
  );
}
