// Client-side helpers for talking to the Express backend via the /api/server
// proxy rewrite. The session JWT is kept in a cookie (same-origin) and sent as
// a Bearer header on every request.

const TOKEN_COOKIE = "di_session";
const API_BASE = "/api/server";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export function getToken(): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(
    "(?:^|; )\\s*" + TOKEN_COOKIE + "=([^;]+)"
  );
  return m ? decodeURIComponent(m[1]) : null;
}

export function setToken(token: string): void {
  const maxAge = 7 * 24 * 60 * 60;
  document.cookie = `${TOKEN_COOKIE}=${encodeURIComponent(
    token
  )}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function clearToken(): void {
  document.cookie = `${TOKEN_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
};

export type SlotView = {
  id: string;
  startAt: string;
  durationMin: number;
  day: string;
  dateLabel: string;
  timeLabel: string;
  full: string;
  tzShort: string;
  zone: string;
};

export type AdminSlotView = SlotView & {
  status: "open" | "booked";
  booking: {
    id: string;
    name: string | null;
    email: string | null;
    meetLink: string | null;
    bookedAt: string | null;
  } | null;
};

async function request<T>(
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  const headers: Record<string, string> = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined) headers["Content-Type"] = "application/json";

  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, "Can't reach the server. Is it running?");
  }

  let data: unknown = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      /* non-JSON body */
    }
  }

  if (!res.ok) {
    const message =
      (data as { error?: string } | null)?.error ?? "Request failed.";
    throw new ApiError(res.status, message);
  }
  return data as T;
}

export const api = {
  get: <T>(path: string) => request<T>("GET", path),
  post: <T>(path: string, body?: unknown) => request<T>("POST", path, body),
  patch: <T>(path: string, body?: unknown) => request<T>("PATCH", path, body),
  del: <T>(path: string) => request<T>("DELETE", path),
};
