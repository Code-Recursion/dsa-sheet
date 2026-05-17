"use client";

import { Checkbox } from "@/components/ui/checkbox";

type ProblemCompleteCheckboxProps = {
  problemId: string;
  problemTitle: string;
  completed: boolean;
  onCompletedChange: (completed: boolean) => void;
};

export function ProblemCompleteCheckbox({
  problemId,
  problemTitle,
  completed,
  onCompletedChange,
}: ProblemCompleteCheckboxProps) {
  return (
    <Checkbox
      id={`problem-complete-${problemId}`}
      checked={completed}
      aria-label={`Mark "${problemTitle}" as completed`}
      onChange={(event) => onCompletedChange(event.target.checked)}
    />
  );
}
