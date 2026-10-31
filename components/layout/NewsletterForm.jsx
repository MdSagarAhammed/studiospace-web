"use client";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MailIcon } from "lucide-react";

export function NewsletterForm() {
  // Wire to a newsletter endpoint on the backend when available.
  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success("You're on the list! We'll be in touch.");
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubscribe} className="flex gap-2">
      <div className="relative flex-1">
        <MailIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className="pl-9"
        />
      </div>
      <Button type="submit">Subscribe</Button>
    </form>
  );
}
