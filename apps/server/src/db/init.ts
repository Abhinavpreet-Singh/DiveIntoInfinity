import { pool } from "./pool.ts";

/**
 * DDL for the scheduling system. Idempotent — safe to run on every boot.
 *
 *   users    — accounts with a `role` column ("admin" | "user").
 *   slots    — availability the admin creates in bulk (date/time + duration).
 *   bookings — a user's claim on a slot, with the generated Google Meet link.
 */
const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL DEFAULT '',
  role        TEXT NOT NULL DEFAULT 'user',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS slots (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  start_at      TIMESTAMPTZ NOT NULL,
  duration_min  INT NOT NULL DEFAULT 30,
  status        TEXT NOT NULL DEFAULT 'open',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (start_at)
);

CREATE TABLE IF NOT EXISTS bookings (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_id      UUID NOT NULL UNIQUE REFERENCES slots(id) ON DELETE CASCADE,
  user_id      UUID REFERENCES users(id) ON DELETE SET NULL,
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  meet_link    TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS slots_status_start_idx ON slots (status, start_at);
CREATE INDEX IF NOT EXISTS bookings_created_idx ON bookings (created_at DESC);
`;

/** Ensure the schema exists and seed admin users from ADMIN_EMAILS. */
export async function initDb(): Promise<void> {
  await pool.query(SCHEMA_SQL);

  const admins = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  for (const email of admins) {
    await pool.query(
      `INSERT INTO users (email, role) VALUES ($1, 'admin')
       ON CONFLICT (email) DO UPDATE SET role = 'admin'`,
      [email]
    );
  }

  console.log(`[db] schema ready · admins bootstrapped: ${admins.length}`);
}
