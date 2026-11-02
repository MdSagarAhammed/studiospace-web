"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Google social login — full-page redirect to Google, then back to the target. */
export function GoogleButton({ mode = "login" }) {
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();

  const handleClick = async () => {
    setLoading(true);
    try {
      const requestedRedirect = params.get("redirect") || "/";
      const redirectTo =
        requestedRedirect.startsWith("/") && !requestedRedirect.startsWith("//")
          ? requestedRedirect
          : "/";
      const callbackURL = new URL(redirectTo, window.location.origin).toString();

      const { data, error } = await signIn.social({
        provider: "google",
        callbackURL,
        errorCallbackURL: new URL(
          mode === "register" ? "/register" : "/login",
          window.location.origin
        ).toString(),
        // New Google accounts can only be created from the register page.
        requestSignUp: mode === "register",
        // Fetch the provider URL as JSON, then perform one browser navigation.
        disableRedirect: true,
      });

      if (error) {
        const code = error.code || error.message;
        const message =
          code === "PROVIDER_NOT_ENABLED" ||
          code === "provider_not_found" ||
          code === "oauth_provider_not_found"
            ? "Google sign-in is not configured on the server."
            : code === "signup_disabled"
              ? "No account exists for this Google login. Use the registration page first."
              : `Google sign-in could not start${code ? ` (${code})` : ""}. Please try again.`;
        toast.error(message);
        return;
      }

      if (!data?.url) {
        throw new Error("The authentication server did not return a Google sign-in URL.");
      }

      window.location.assign(data.url);
    } catch (error) {
      toast.error(error.message || "Google sign-in could not start. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button type="button" variant="outline" onClick={handleClick} disabled={loading} className="w-full">
      {loading ? (
        <Loader2Icon className="size-4 animate-spin" />
      ) : (
        <svg className="size-4" viewBox="0 0 24 24" aria-hidden>
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h6.06a5.19 5.19 0 0 1-2.25 3.4v2.84h3.65c2.13-1.97 3.35-4.88 3.35-8.25Z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.76c-.99.66-2.25 1.05-3.71 1.05-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11.02 11.02 0 0 0 12 23Z" fill="#34A853" />
          <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18A10.96 10.96 0 0 0 1 12c0 1.77.43 3.45 1.18 4.94l3.66-2.84Z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.16-3.16C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52Z" fill="#EA4335" />
        </svg>
      )}
      Continue with Google
      <span className="sr-only">{mode === "login" ? "Login" : "Register"} with Google</span>
    </Button>
  );
}

/** Small helper: divider line with text in the middle. */
export function Divider({ children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-border" />
      <span className="text-xs text-muted-foreground">{children}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
