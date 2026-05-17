export type DashboardUser = {
  id: string;
  name: string;
  email: string;
};

export type ProgressSummary = {
  completedProblems: number;
  totalProblems: number;
  completionPercentage: number;
};

export type TopicProgress = {
  completed: number;
  total: number;
  percentage: number;
};

export type ResourceLinks = {
  youtube?: string;
  article?: string;
  leetcode?: string;
  codeforces?: string;
};

export type ProblemDifficulty = "easy" | "medium" | "hard";

export type DashboardProblem = {
  id: string;
  title: string;
  slug: string;
  subtopic: string;
  difficulty: ProblemDifficulty;
  tags: string[];
  resourceLinks: ResourceLinks;
  completed: boolean;
};

export type DashboardTopic = {
  id: string;
  title: string;
  slug: string;
  order: number;
  progress?: TopicProgress;
  problems: DashboardProblem[];
};

export type DashboardData = {
  user: DashboardUser;
  progressSummary?: ProgressSummary;
  topics: DashboardTopic[];
};

export type DashboardApiResponse = {
  success: true;
  data: DashboardData;
};
