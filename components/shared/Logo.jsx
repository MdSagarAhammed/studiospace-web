import { Aperture } from "lucide-react";
import { cn } from "cn";

export function Logo({ className, iconClassName }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground",
          iconClassName
        )}
      >
        <Aperture className="size-5" />
      </span>
      <span className="text-lg font-bold tracking-tight">
        Studio<span className="text-primary">Space</span>
      </span>
    </span>
  );
}
