import { CheckIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <label
      className={cn(
        "relative inline-flex size-4 shrink-0 cursor-pointer items-center justify-center",
        props.disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <input
        type="checkbox"
        data-slot="checkbox"
        className="peer sr-only"
        {...props}
      />
      <span
        aria-hidden
        className={cn(
          "flex size-4 items-center justify-center rounded-[4px] border border-input bg-background shadow-xs transition-colors",
          "peer-focus-visible:border-ring peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50",
          "peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground",
          "peer-disabled:pointer-events-none",
          "dark:bg-input/30",
        )}
      />
      <CheckIcon
        aria-hidden
        className="pointer-events-none absolute size-3 text-primary-foreground opacity-0 peer-checked:opacity-100"
      />
    </label>
  );
}

export { Checkbox };
