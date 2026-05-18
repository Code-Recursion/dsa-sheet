"use client";

import { useMemo, useState } from "react";
import { DifficultyBadge } from "@/components/dashboard/DifficultyBadge";
import { ProblemCompleteCheckbox } from "@/components/dashboard/ProblemCompleteCheckbox";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { DashboardData } from "@/lib/types/dashboard";

type DashboardTableProps = {
  topics: DashboardData["topics"];
};

const resourceLabels = {
  youtube: "YouTube",
  article: "Article",
  leetcode: "LeetCode",
  codeforces: "Codeforces",
} as const;

function buildInitialCompletion(topics: DashboardData["topics"]) {
  const completion: Record<string, boolean> = {};

  for (const topic of topics) {
    for (const problem of topic.problems) {
      completion[problem.id] = problem.completed;
    }
  }

  return completion;
}

export function DashboardTable({ topics }: DashboardTableProps) {
  const sortedTopics = useMemo(
    () => [...topics].sort((a, b) => a.order - b.order),
    [topics],
  );

  const [completionByProblemId, setCompletionByProblemId] = useState(() =>
    buildInitialCompletion(topics),
  );

  function setProblemCompleted(problemId: string, completed: boolean) {
    setCompletionByProblemId((current) => ({
      ...current,
      [problemId]: completed,
    }));
  }

  return (
    <div className="space-y-6">
      {sortedTopics.map((topic) => (
        <Card key={topic.id}>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{topic.title}</CardTitle>
            <CardDescription>
              {topic.progress
                ? `${topic.progress.completed}/${topic.progress.total} completed (${topic.progress.percentage}%)`
                : "No progress data"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {topic.problems.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No problems in this page for this topic.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Subtopic</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Resources</TableHead>
                    <TableHead className="w-12 text-center">Done</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topic.problems.map((problem, index) => (
                    <TableRow key={problem.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{problem.title}</TableCell>
                      <TableCell>{problem.subtopic}</TableCell>
                      <TableCell>
                        <DifficultyBadge difficulty={problem.difficulty} />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {problem.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          {(
                            Object.keys(resourceLabels) as Array<
                              keyof typeof resourceLabels
                            >
                          ).map((key) => {
                            const href = problem.resourceLinks[key];
                            if (!href) {
                              return null;
                            }

                            return (
                              <a
                                key={key}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-medium text-primary hover:underline"
                              >
                                {resourceLabels[key]}
                              </a>
                            );
                          })}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <ProblemCompleteCheckbox
                          problemId={problem.id}
                          problemTitle={problem.title}
                          completed={completionByProblemId[problem.id] ?? false}
                          onCompletedChange={(completed) =>
                            setProblemCompleted(problem.id, completed)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
