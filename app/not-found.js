import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Aperture } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-w flex min-h-[70vh] flex-col items-center justify-center gap-6 py-16 text-center">
      {/* Creative "empty soundstage / lights out" illustration */}
      <div className="relative">
        <div className="relative grid size-40 place-items-center overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/15 via-accent to-muted shadow-inner">
          {/* stage floor */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary/25 to-transparent" />
          {/* spotlight beam */}
          <div className="absolute -top-10 left-1/2 h-48 w-40 -translate-x-1/2 rotate-12 bg-gradient-to-b from-primary/45 to-transparent blur-md" />
          <Aperture className="relative size-16 text-primary" />
          <span className="absolute right-6 top-6 size-3 rounded-full bg-amber-400 blur-[1px]" />
          <span className="absolute left-8 bottom-10 size-2 rounded-full bg-primary/70 blur-[1px]" />
        </div>
        <span className="absolute -right-6 -bottom-2 grid size-14 place-items-center rounded-full border bg-background text-xl font-black text-primary shadow-md">
          404
        </span>
      </div>

      <div className="max-w-md space-y-2">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          This Stage Doesn&apos;t Exist
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          The page you&apos;re looking for was struck from the set — or never
          made it to the call sheet. Let&apos;s get you back to the action.
        </p>
      </div>

      <Button render={<Link href="/" />} size="lg" className="h-11 px-6 text-base">
        Return to Home
      </Button>
    </div>
  );
}
