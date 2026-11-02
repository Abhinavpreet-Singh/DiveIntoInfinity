import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

const SECRET: string = process.env.JWT_SECRET ?? "dev-insecure-secret";
const SESSION_TTL = "7d";
const MAGIC_TTL = "15m";

export interface SessionPayload {
  sub: string;
  email: string;
  role: "admin" | "user";
}

/** Short-lived token embedded in the emailed magic link. */
export function signMagicToken(email: string): string {
  return jwt.sign({ email, purpose: "magic" }, SECRET, { expiresIn: MAGIC_TTL });
}

export function verifyMagicToken(token: string): string {
  const payload = jwt.verify(token, SECRET) as { email: string; purpose: string };
  if (payload.purpose !== "magic") throw new Error("invalid token");
  return payload.email;
}

/** Long-lived session token stored by the web client. */
export function signSession(user: {
  id: string;
  email: string;
  role: string;
}): string {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    SECRET,
    { expiresIn: SESSION_TTL }
  );
}

export function verifySession(token: string): SessionPayload | null {
  try {
    const payload = jwt.verify(token, SECRET) as SessionPayload;
    return payload;
  } catch {
    return null;
  }
}

export function getBearer(req: Request): string | null {
  const h = req.headers.authorization;
  if (!h || !h.startsWith("Bearer ")) return null;
  return h.slice(7);
}

/** Reads the session from the Authorization header; 401/403 if not an admin. */
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = getBearer(req);
  if (!token) {
    return res.status(401).json({ error: "Authentication required." });
  }
  const session = verifySession(token);
  if (!session) {
    return res.status(401).json({ error: "Invalid or expired session." });
  }
  if (session.role !== "admin") {
    return res.status(403).json({ error: "Admin access required." });
  }
  (req as Request & { user?: SessionPayload }).user = session;
  next();
}
