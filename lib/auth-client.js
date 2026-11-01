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
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
    `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5010/api"}/auth`,
});

export const { useSession, signIn, signUp, signOut } = authClient;
