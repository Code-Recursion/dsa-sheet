"use client";

import { useMemo, useState } from "react";
import { DifficultyBadge } from "@/components/dashboard/DifficultyBadge";
import { ProblemCompleteCheckbox } from "@/components/dashboard/ProblemCompleteCheckbox";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight } from "lucide-react";
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

  // Topics are expanded by default
  const [collapsedTopics, setCollapsedTopics] = useState<Record<string, boolean>>({});

  const toggleTopic = (topicId: string) => {
    setCollapsedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  async function setProblemCompleted(problemId: string, completed: boolean) {
    // Optimistically update the UI
    setCompletionByProblemId((current) => ({
      ...current,
      [problemId]: completed,
    }));

    try {
      const response = await fetch("/api/progress", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problemId,
          completed,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update progress");
      }
    } catch (error) {
      console.error("Failed to update progress:", error);
      // Revert optimistic update on failure
      setCompletionByProblemId((current) => ({
        ...current,
        [problemId]: !completed,
      }));
    }
  }

  return (
    <div className="space-y-6">
      {sortedTopics.map((topic) => {
        const isCollapsed = !!collapsedTopics[topic.id];
        return (
          <Card key={topic.id} className="overflow-hidden transition-all duration-200 shadow-sm border border-border/50">
            <CardHeader
              onClick={() => toggleTopic(topic.id)}
              className="flex flex-row items-center justify-between space-y-0 cursor-pointer select-none hover:bg-muted/40 transition-colors p-5"
            >
              <div className="space-y-1 flex-1 pr-4">
                <CardTitle className="text-lg sm:text-xl font-bold text-foreground">
                  {topic.title}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm font-medium">
                  {topic.progress
                    ? `${topic.progress.completed}/${topic.progress.total} completed (${topic.progress.percentage}%)`
                    : "No progress data"}
                </CardDescription>
              </div>
              <div className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-muted">
                {isCollapsed ? (
                  <ChevronRight className="size-5" />
                ) : (
                  <ChevronDown className="size-5" />
                )}
              </div>
            </CardHeader>
            {!isCollapsed && (
              <CardContent className="p-0 sm:p-6 border-t border-border/40 bg-card">
                {topic.problems.length === 0 ? (
                  <p className="text-sm text-muted-foreground p-5">
                    No problems in this page for this topic.
                  </p>
                ) : (
                  <div className="w-full overflow-x-auto scrollbar-thin">
                    <Table className="md:table-fixed w-full min-w-[750px] md:min-w-full">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12 text-center">#</TableHead>
                          <TableHead className="w-[280px]">Title</TableHead>
                          <TableHead className="w-[150px]">Subtopic</TableHead>
                          <TableHead className="w-[100px]">Difficulty</TableHead>
                          <TableHead className="w-[180px]">Tags</TableHead>
                          <TableHead className="w-[150px]">Resources</TableHead>
                          <TableHead className="w-20 text-center">Completed</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {topic.problems.map((problem, index) => (
                          <TableRow key={problem.id} className="hover:bg-muted/20">
                            <TableCell className="text-center font-medium text-xs sm:text-sm">{index + 1}</TableCell>
                            <TableCell className="font-semibold text-xs sm:text-sm whitespace-normal break-words">
                              {problem.title}
                            </TableCell>
                            <TableCell className="whitespace-normal break-words text-xs sm:text-sm text-muted-foreground">
                              {problem.subtopic}
                            </TableCell>
                            <TableCell className="whitespace-normal">
                              <DifficultyBadge difficulty={problem.difficulty} />
                            </TableCell>
                            <TableCell className="whitespace-normal">
                              <div className="flex flex-wrap gap-1">
                                {problem.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="whitespace-normal">
                              <div className="flex flex-wrap gap-2.5">
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
                                      className="text-xs font-semibold text-primary hover:underline hover:text-primary/80 transition-colors"
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
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}

