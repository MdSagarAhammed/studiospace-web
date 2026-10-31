import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "cn";

/** Friendly empty state with an optional CTA. */
export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className,
  children,
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed bg-muted/40 px-6 py-16 text-center",
        className
      )}
    >
      {Icon ? (
        <div className="grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
          <Icon className="size-7" />
        </div>
      ) : null}
      <h3 className="text-lg font-semibold">{title}</h3>
      {description ? (
        <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      ) : null}
      {actionLabel && actionHref ? (
        <Button render={<Link href={actionHref} />} className="mt-2">
          {actionLabel}
        </Button>
      ) : null}
      {actionLabel && onAction ? (
        <Button onClick={onAction} className="mt-2">
          {actionLabel}
        </Button>
      ) : null}
      {children}
    </div>
  );
}
