import { BOOKING_STATUSES } from "@/lib/constants";
import { cn } from "cn";

export function StatusBadge({ status, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        BOOKING_STATUSES[status] || "bg-muted text-foreground border-border",
        className
      )}
    >
      {status}
    </span>
  );
}

export function CategoryBadge({ category, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary",
        className
      )}
    >
      {category}
    </span>
  );
}
