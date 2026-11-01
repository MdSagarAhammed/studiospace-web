import { cn } from "cn";

/**
 * StudioSpace aperture mark — six shutter blades drawn as chords tangent to
 * an inner circle, inside a lens ring. Stroke inherits the current text
 * color, so it adapts to light/dark themes automatically.
 */
export function ApertureMark({ className }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={className}>
      <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.6" />
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <line x1="20.5" y1="24.9" x2="20.5" y2="7.1" />
        <line x1="10.5" y1="24.4" x2="26" y2="15.4" />
        <line x1="6" y1="15.4" x2="21.5" y2="24.4" />
        <line x1="11.5" y1="7.1" x2="11.5" y2="24.9" />
        <line x1="21.5" y1="7.6" x2="6" y2="16.6" />
        <line x1="26" y1="16.6" x2="10.5" y2="7.6" />
      </g>
    </svg>
  );
}

export function Logo({ className, iconClassName }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground",
          iconClassName
        )}
      >
        <ApertureMark className="size-5" />
      </span>
      <span className="text-lg font-bold tracking-tight">
        Studio<span className="text-primary">Space</span>
      </span>
    </span>
  );
}
