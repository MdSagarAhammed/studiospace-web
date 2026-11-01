"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { Loader2Icon, EyeIcon, EyeOffIcon, CircleCheckIcon, CircleXIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Divider, GoogleButton } from "./GoogleButton";
import { cn } from "cn";

/** Password rules from the requirements: uppercase, lowercase, min 6 chars. */
function validatePassword(pw) {
  const checks = {
    uppercase: /[A-Z]/.test(pw),
    lowercase: /[a-z]/.test(pw),
    length: pw.length >= 6,
  };
  const messages = [];
  if (!checks.uppercase) messages.push("an uppercase letter");
  if (!checks.lowercase) messages.push("a lowercase letter");
  if (!checks.length) messages.push("at least 6 characters");
  return { checks, messages };
}

function Rule({ ok, children }) {
  return (
    <li
      className={cn(
        "flex items-center gap-1.5 text-xs",
        ok ? "text-primary" : "text-muted-foreground"
      )}
    >
      {ok ? <CircleCheckIcon className="size-3.5" /> : <CircleXIcon className="size-3.5" />}
      {children}
    </li>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [touchedPw, setTouchedPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { checks, messages } = validatePassword(form.password);
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const pwInvalid =
    touchedPw && messages.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouchedPw(true);
    if (messages.length > 0) {
      setError(`Password must contain ${messages.join(", ")}.`);
      toast.error("Password does not meet the requirements");
      return;
    }
    setError("");
    setLoading(true);
    const { error: err } = await signUp.email({
      name: form.name,
      email: form.email,
      image: form.photoURL || undefined,
      password: form.password,
    });
    setLoading(false);
    if (err) {
      const msg = err.message || "Registration failed. Please try again.";
      setError(msg);
      toast.error(msg);
      return;
    }
    toast.success("Account created! Please log in.");
    router.push("/login");
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-extrabold tracking-tight">Create Your Account</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Join StudioSpace to book or host creative spaces.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            required
            autoComplete="name"
            placeholder="Sagara Ahmed"
            value={form.name}
            onChange={set("name")}
          />
        </div>

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
          <Label htmlFor="photoURL">Photo URL</Label>
          <Input
            id="photoURL"
            type="url"
            placeholder="https://i.ibb.co/your-photo.jpg"
            value={form.photoURL}
            onChange={set("photoURL")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="new-password"
              placeholder="••••••••"
              value={form.password}
              onChange={set("password")}
              onBlur={() => setTouchedPw(true)}
              aria-invalid={pwInvalid}
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

          <ul className="space-y-1 rounded-lg border bg-muted/40 px-3 py-2">
            <Rule ok={checks.uppercase}>Must have an uppercase letter</Rule>
            <Rule ok={checks.lowercase}>Must have a lowercase letter</Rule>
            <Rule ok={checks.length}>Length must be at least 6 characters</Rule>
          </ul>

          {pwInvalid ? (
            <p role="alert" className="text-xs font-medium text-destructive">
              Password must contain {messages.join(", ")}.
            </p>
          ) : null}
        </div>

        {error ? (
          <p
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {error}
          </p>
        ) : null}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? <Loader2Icon className="size-4 animate-spin" /> : null}
          Register
        </Button>
      </form>

      <Divider>or</Divider>
      <GoogleButton mode="register" />

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
