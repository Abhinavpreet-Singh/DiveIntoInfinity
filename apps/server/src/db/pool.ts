import pg from "pg";

const { Pool } = pg;

/**
 * Single shared connection pool for the Postgres database.
 * Neon requires TLS; we validate the certificate against the system CA store.
 *
 * Note: node-postgres returns timestamp/timestamptz columns as JS Date objects,
 * so the time helpers in lib/time.ts use `DateTime.fromJSDate` for those.
 */
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: true },
  max: 10,
});

pool.on("error", (err) => {
  console.error("[db] unexpected idle client error:", err);
});

export interface UserRow {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  created_at: string;
}

export interface SlotRow {
  id: string;
  start_at: string; // ISO timestamp (UTC)
  duration_min: number;
  status: "open" | "booked";
  created_at: string;
}

export interface BookingRow {
  id: string;
  slot_id: string;
  user_id: string | null;
  name: string;
  email: string;
  meet_link: string | null;
  created_at: string;
}
