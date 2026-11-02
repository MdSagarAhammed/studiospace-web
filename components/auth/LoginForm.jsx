"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient, signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { Loader2Icon, EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Divider, GoogleButton } from "./GoogleButton";

// OAuth callback error codes → user-friendly messages. These arrive as
// /login?error=… redirects from the backend's BetterAuth onAPIError handler.
const OAUTH_ERROR_MESSAGES = {
  state_mismatch: "Your Google sign-in session expired. Please try again.",
  invalid_code: "Google sign-in could not be verified. Please try again.",
  state_not_found: "Your Google sign-in session expired. Please try again.",
  provider_not_found:
    "Google sign-in is not configured on the server. Try email/password.",
  signup_disabled:
    "No account exists for this Google login. Create an account on the registration page first.",
  email_not_verified:
    "Verify your Google email address before signing in.",
};

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Derived from the URL — no extra state/effect needed.
  const oauthError = params.get("error");
  const oauthMessage = oauthError
    ? OAUTH_ERROR_MESSAGES[oauthError] ||
      "Google sign-in failed. Please try email/password instead."
    : null;

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const requestedRedirect = params.get("redirect") || "/";
    const redirect =
      requestedRedirect.startsWith("/") && !requestedRedirect.startsWith("//")
        ? requestedRedirect
        : "/";

    try {
      const { error: signInError } = await signIn.email({
        email: form.email,
        password: form.password,
      });
      if (signInError) throw signInError;

      // Confirm the cookie reaches the auth endpoint, then hydrate the shared
      // Better Auth session store before a client-side route transition.
      const { data: session, error: sessionError } = await authClient.getSession();
      if (sessionError) throw sessionError;
      if (!session?.user) {
        throw new Error("Login succeeded, but the session could not be loaded. Please try again.");
      }

      authClient.hydrateSession(session);
      // Next.js may restore this client component from its route cache after
      // logout. Clear credentials and the pending state before navigating so
      // returning to /login cannot resurrect the previous form state.
      setForm({ email: "", password: "" });
      toast.success("Welcome back!");
      router.replace(redirect);
    } catch (err) {
      const msg = err.message || "Login failed. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-extrabold tracking-tight">Welcome Back</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Log in to book studios and manage your listings.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={set("email")}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {/* Forgot-password flow is intentionally not implemented. */}
            <button
              type="button"
              onClick={() =>
                toast.info("Password reset is not available in this build.")
              }
              className="text-xs font-medium text-primary hover:underline"
            >
              Forgot Password?
            </button>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              value={form.password}
              onChange={set("password")}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
            </button>
          </div>
        </div>

        {error || oauthMessage ? (
          <p
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {error || oauthMessage}
          </p>
        ) : null}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? <Loader2Icon className="size-4 animate-spin" /> : null}
          Login
        </Button>
      </form>

      <Divider>or</Divider>
      <GoogleButton mode="login" />

      <p className="text-center text-sm text-muted-foreground">
        New to StudioSpace?{" "}
        <Link
          href={params.get("redirect") ? `/register?redirect=${encodeURIComponent(params.get("redirect"))}` : "/register"}
          className="font-semibold text-primary hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
