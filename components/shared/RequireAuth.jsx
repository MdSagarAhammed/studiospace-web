"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { PageLoader } from "./PageLoader";

/**
 * Client-side guard for private routes.
 * Redirects unauthenticated visitors to /login with a ?redirect= back-link.
 */
export function RequireAuth({ children }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please log in to continue");
      router.replace(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
    }
  }, [isPending, session, router]);

  if (isPending) {
    return <PageLoader label="Checking your session…" />;
  }
  if (!session) return null;
  return children;
}
