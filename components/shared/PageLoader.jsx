import { Aperture } from "lucide-react";

/** Branded spinner used for route loaders & async actions. */
export function PageLoader({ label = "Loading…" }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
      <div className="relative grid size-14 place-items-center">
        <Aperture className="size-8 animate-pulse text-primary" />
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
