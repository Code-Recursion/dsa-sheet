import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="h-7 w-40 animate-pulse rounded-md bg-muted" />
            <div className="mt-2 h-4 w-72 animate-pulse rounded-md bg-muted" />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="h-4 w-48 animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-56 animate-pulse rounded-md bg-muted" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="h-6 w-32 animate-pulse rounded-md bg-muted" />
            <div className="mt-2 h-4 w-52 animate-pulse rounded-md bg-muted" />
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-10 w-full animate-pulse rounded-md bg-muted"
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
