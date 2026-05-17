import type { DashboardData, DashboardProblem, DashboardTopic } from "@/lib/types/dashboard";

type FlatProblem = {
  topic: DashboardTopic;
  problem: DashboardProblem;
};

function flattenProblems(topics: DashboardTopic[]): FlatProblem[] {
  const sorted = [...topics].sort((a, b) => a.order - b.order);
  const flat: FlatProblem[] = [];

  for (const topic of sorted) {
    for (const problem of topic.problems) {
      flat.push({ topic, problem });
    }
  }

  return flat;
}

export function paginateDashboardData(
  data: DashboardData,
  page: number,
  limit: number,
): DashboardData {
  const offset = (page - 1) * limit;
  const flat = flattenProblems(data.topics);
  const slice = flat.slice(offset, offset + limit);
  const problemsByTopicId = new Map<string, DashboardProblem[]>();

  for (const { topic, problem } of slice) {
    const existing = problemsByTopicId.get(topic.id) ?? [];
    existing.push(problem);
    problemsByTopicId.set(topic.id, existing);
  }

  const topics = [...data.topics]
    .sort((a, b) => a.order - b.order)
    .map((topic) => ({
      ...topic,
      problems: problemsByTopicId.get(topic.id) ?? [],
    }));

  return {
    user: data.user,
    progressSummary: data.progressSummary,
    topics,
  };
}
