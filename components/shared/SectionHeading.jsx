import { cn } from "cn";

export function SectionHeading({ eyebrow, title, subtitle, align = "center", className }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? (
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
