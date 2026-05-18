import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardTable } from "@/components/dashboard/DashboardTable";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ApiError } from "@/lib/api/client";
import { getDashboard } from "@/lib/services/dashboard.service";

export const metadata: Metadata = {
  title: "Dashboard | DSA Tracker",
  description: "Track your DSA practice progress across topics and problems",
};

export const dynamic = "force-dynamic";

type DashboardPageProps = {
  searchParams: Promise<{ page?: string }>;
};

function parsePage(value: string | undefined): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }

  return Math.floor(parsed);
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const params = await searchParams;
  const page = parsePage(params.page);
  const limit = 20;

  try {
    const response = await getDashboard(page, limit);
    const { user, progressSummary, topics } = response.data;

    return (
      <DashboardShell>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Dashboard</CardTitle>
              <CardDescription>
                Welcome back, {user.name}. Track your progress across topics.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <p>
                <span className="font-medium text-foreground">Name:</span>{" "}
                {user.name}
              </p>
              <p>
                <span className="font-medium text-foreground">Email:</span>{" "}
                {user.email}
              </p>
            </CardContent>
          </Card>

          {progressSummary ? (
            <Card>
              <CardHeader>
                <CardTitle>Overall progress</CardTitle>
                <CardDescription>
                  {progressSummary.completedProblems} of{" "}
                  {progressSummary.totalProblems} problems completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">
                  {progressSummary.completionPercentage}%
                </p>
              </CardContent>
            </Card>
          ) : null}

          <DashboardTable topics={topics} />
        </div>
      </DashboardShell>
    );
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      redirect("/login");
    }

    const message =
      error instanceof ApiError
        ? error.message
        : "Unable to load dashboard data. Please try again.";

    return (
      <DashboardShell>
        <Alert variant="destructive">
          <AlertTitle>Failed to load dashboard</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      </DashboardShell>
    );
  }
}
