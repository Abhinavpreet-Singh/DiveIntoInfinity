import { Router } from "express";
import { ah } from "../lib/async.ts";
import { getUserByEmail, getUserById, HttpError } from "../db/queries.ts";
import {
  signMagicToken,
  verifyMagicToken,
  signSession,
  verifySession,
  getBearer,
} from "../lib/auth.ts";
import { sendMagicLink } from "../lib/email.ts";

export const authRouter = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PUBLIC_WEB_URL = process.env.PUBLIC_WEB_URL ?? "http://localhost:3001";

function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

/** Request a magic login link be emailed. */
authRouter.post(
  "/magic/request",
  ah(async (req, res) => {
    const email = ((req.body ?? {}).email as string | undefined)?.trim().toLowerCase();
    if (!email || !EMAIL_RE.test(email))
      throw new HttpError(400, "Please enter a valid email address.");

    // Only issue links to known users (admins bootstrapped on startup, or
    // people who previously booked). Unknown emails get the same response to
    // avoid leaking which addresses exist.
    const known = adminEmails().includes(email);
    const user = await getUserByEmail(email);
    if (user || known) {
      const token = signMagicToken(email);
      const link = `${PUBLIC_WEB_URL}/login/verify?token=${encodeURIComponent(token)}`;
      const sent = await sendMagicLink({ to: email, link });
      if (!sent) {
        // Dev affordance: if no email provider is configured, surface the link
        // in the server log so you can still test the login flow locally.
        console.warn(
          `[auth] Email not sent (no provider). Dev login link for ${email}:\n${link}`
        );
      }
    }
    res.json({ sent: true });
  })
);

/** Verify a magic token and return a session token + the user. */
authRouter.post(
  "/magic/verify",
  ah(async (req, res) => {
    const token = (req.body ?? {}).token as string | undefined;
    if (!token) throw new HttpError(400, "Missing token.");
    let email: string;
    try {
      email = verifyMagicToken(token);
    } catch {
      throw new HttpError(400, "This login link is invalid or has expired.");
    }
    const user = await getUserByEmail(email);
    if (!user) {
      throw new HttpError(403, "This email does not have access.");
    }
    const sessionToken = signSession(user);
    res.json({
      token: sessionToken,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  })
);

/** Return the currently-authenticated user. */
authRouter.get(
  "/me",
  ah(async (req, res) => {
    const bearer = getBearer(req);
    if (!bearer) throw new HttpError(401, "Not authenticated.");
    const session = verifySession(bearer);
    if (!session) throw new HttpError(401, "Invalid or expired session.");
    const user = await getUserById(session.sub);
    if (!user) throw new HttpError(401, "User not found.");
    res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  })
);

/** Logout is client-side (clear the stored token); this confirms the intent. */
authRouter.post("/logout", ah(async (_req, res) => res.json({ ok: true })));
