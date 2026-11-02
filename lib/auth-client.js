"use client";

import { createAuthClient } from "better-auth/react";

/**
 * BetterAuth client — talks to the auth API mounted on the Express backend
 * (default BetterAuth mount path is /api/auth).
 *
 * Server side uses the MongoDB adapter + JWT; this client only consumes
 * the session endpoints (email/password + Google social login).
 */
export const authClient = createAuthClient({
  baseURL:
    typeof window !== "undefined"
      ? `${window.location.origin}/api/backend/auth`
      : "http://localhost:5010/api/auth",
});

export const { useSession, signIn, signUp, signOut } = authClient;
