import { Badge } from "@/components/ui/badge";
import type { ProblemDifficulty } from "@/lib/types/dashboard";
import { cn } from "@/lib/utils";

const difficultyStyles: Record<ProblemDifficulty, string> = {
  easy: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  medium: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  hard: "bg-rose-500/15 text-rose-700 dark:text-rose-400",
};

type DifficultyBadgeProps = {
  difficulty: ProblemDifficulty;
};

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn("border-transparent capitalize", difficultyStyles[difficulty])}
    >
      {difficulty}
    </Badge>
  );
}
