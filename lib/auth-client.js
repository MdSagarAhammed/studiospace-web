"use client";

import { createAuthClient } from "better-auth/react";

/**
 * BetterAuth client — talks to the auth API mounted on the Express backend
 * (default BetterAuth mount path is /api/auth).
 *
 * Server side uses the MongoDB adapter + JWT; this client only consumes
 * the session endpoints (email/password + Google social login).
 */
const authBaseURL =
  process.env.NODE_ENV === "production"
    ? typeof window !== "undefined"
      ? window.location.origin
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : undefined
    : process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
      `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5010/api"}/auth`;

export const authClient = createAuthClient({
  ...(authBaseURL ? { baseURL: authBaseURL } : {}),
  fetchOptions: { timeout: 15_000 },
});

export const { useSession, signIn, signUp, signOut } = authClient;
