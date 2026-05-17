import type { DashboardData } from "@/lib/types/dashboard";

export const dashboardSampleData: DashboardData = {
  user: {
    id: "u1",
    name: "Ajay",
    email: "ajay@gmail.com",
  },
  topics: [
    {
      id: "t1",
      title: "Arrays",
      slug: "arrays",
      order: 1,
      progress: {
        completed: 8,
        total: 15,
        percentage: 53,
      },
      problems: [
        {
          id: "p1",
          title: "Two Sum",
          slug: "two-sum",
          subtopic: "Hashing",
          difficulty: "easy",
          tags: ["array", "hashmap"],
          resourceLinks: {
            youtube: "https://youtube.com/example",
            article: "https://article.com/example",
            leetcode: "https://leetcode.com/problems/two-sum",
            codeforces: "https://codeforces.com/problemset/problem/1/A",
          },
          completed: true,
        },
        {
          id: "p2",
          title: "Kadane Algorithm",
          slug: "kadane-algorithm",
          subtopic: "Dynamic Programming",
          difficulty: "medium",
          tags: ["array", "dp"],
          resourceLinks: {
            youtube: "https://youtube.com/example/kadane",
            leetcode: "https://leetcode.com/problems/maximum-subarray",
          },
          completed: false,
        },
        {
          id: "p3",
          title: "Best Time to Buy and Sell Stock",
          slug: "best-time-to-buy-and-sell-stock",
          subtopic: "Greedy",
          difficulty: "easy",
          tags: ["array", "greedy"],
          resourceLinks: {
            leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock",
          },
          completed: true,
        },
        {
          id: "p4",
          title: "Product of Array Except Self",
          slug: "product-of-array-except-self",
          subtopic: "Prefix Sum",
          difficulty: "medium",
          tags: ["array", "prefix-sum"],
          resourceLinks: {
            leetcode: "https://leetcode.com/problems/product-of-array-except-self",
          },
          completed: false,
        },
        {
          id: "p5",
          title: "Maximum Subarray",
          slug: "maximum-subarray",
          subtopic: "Divide and Conquer",
          difficulty: "medium",
          tags: ["array", "divide-and-conquer"],
          resourceLinks: {
            leetcode: "https://leetcode.com/problems/maximum-subarray",
          },
          completed: true,
        },
      ],
    },
    {
      id: "t2",
      title: "Trees",
      slug: "trees",
      order: 2,
      progress: {
        completed: 3,
        total: 20,
        percentage: 15,
      },
      problems: [],
    },
    {
      id: "t3",
      title: "Graphs",
      slug: "graphs",
      order: 3,
      progress: {
        completed: 2,
        total: 12,
        percentage: 17,
      },
      problems: [
        {
          id: "p6",
          title: "Number of Islands",
          slug: "number-of-islands",
          subtopic: "DFS",
          difficulty: "medium",
          tags: ["graph", "dfs", "bfs"],
          resourceLinks: {
            leetcode: "https://leetcode.com/problems/number-of-islands",
          },
          completed: false,
        },
        {
          id: "p7",
          title: "Course Schedule",
          slug: "course-schedule",
          subtopic: "Topological Sort",
          difficulty: "medium",
          tags: ["graph", "topological-sort"],
          resourceLinks: {
            leetcode: "https://leetcode.com/problems/course-schedule",
          },
          completed: true,
        },
      ],
    },
  ],
};
