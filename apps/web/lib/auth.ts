"use client";

import { api, clearToken, setToken, type AuthUser } from "./api";

/** Returns the logged-in user, or null if not authenticated. */
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const res = await api.get<{ user: AuthUser }>("/auth/me");
    return res.user;
  } catch {
    return null;
  }
}

/** Request a magic-link email. */
export async function requestMagicLink(email: string): Promise<void> {
  await api.post("/auth/magic/request", { email });
}

/** Verify a magic token; stores the session and returns the user. */
export async function verifyMagicToken(
  token: string
): Promise<AuthUser> {
  const res = await api.post<{ token: string; user: AuthUser }>(
    "/auth/magic/verify",
    { token }
  );
  setToken(res.token);
  return res.user;
}

export async function logout(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } catch {
    /* ignore network errors on logout */
  }
  clearToken();
}
