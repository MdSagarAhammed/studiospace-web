import { StarIcon } from "lucide-react";
import { cn } from "cn";

export function RatingBadge({ rating, count, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400",
        className
      )}
    >
      <StarIcon className="size-3.5 fill-current" />
      {Number(rating ?? 0).toFixed(1)}
      {typeof count === "number" ? (
        <span className="font-normal text-muted-foreground">({count})</span>
      ) : null}
    </span>
  );
}
