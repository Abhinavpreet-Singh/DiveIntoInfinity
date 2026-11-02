import { pool, type SlotRow, type UserRow, type BookingRow } from "./pool.ts";

/* ----------------------------- Users ----------------------------- */

export async function getUserById(id: string): Promise<UserRow | null> {
  const res = await pool.query<UserRow>(
    "SELECT id, email, name, role, created_at FROM users WHERE id = $1",
    [id]
  );
  return res.rows[0] ?? null;
}

export async function getUserByEmail(email: string): Promise<UserRow | null> {
  const res = await pool.query<UserRow>(
    "SELECT id, email, name, role, created_at FROM users WHERE email = $1",
    [email.toLowerCase()]
  );
  return res.rows[0] ?? null;
}

/** Create or update a user's name, preserving their role. Returns the row. */
export async function upsertUser(
  email: string,
  name: string
): Promise<UserRow> {
  const res = await pool.query<UserRow>(
    `INSERT INTO users (email, name) VALUES ($1, $2)
     ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
     RETURNING id, email, name, role, created_at`,
    [email.toLowerCase(), name]
  );
  return res.rows[0];
}

/* ----------------------------- Slots ----------------------------- */

export async function listOpenSlots(): Promise<SlotRow[]> {
  const res = await pool.query<SlotRow>(
    `SELECT id, start_at, duration_min, status, created_at
     FROM slots
     WHERE status = 'open' AND start_at >= now()
     ORDER BY start_at ASC`
  );
  return res.rows;
}

export async function getSlot(id: string): Promise<SlotRow | null> {
  const res = await pool.query<SlotRow>(
    `SELECT id, start_at, duration_min, status, created_at
     FROM slots WHERE id = $1`,
    [id]
  );
  return res.rows[0] ?? null;
}

export interface AdminSlotRow extends SlotRow {
  booking_id: string | null;
  booker_name: string | null;
  booker_email: string | null;
  meet_link: string | null;
  booked_at: string | null;
}

/** All slots (open + booked) with their booking details, newest-first by start. */
export async function listAllSlotsWithBookings(): Promise<AdminSlotRow[]> {
  const res = await pool.query<AdminSlotRow>(
    `SELECT s.id, s.start_at, s.duration_min, s.status, s.created_at,
            b.id        AS booking_id,
            b.name      AS booker_name,
            b.email     AS booker_email,
            b.meet_link AS meet_link,
            b.created_at AS booked_at
     FROM slots s
     LEFT JOIN bookings b ON b.slot_id = s.id
     ORDER BY s.start_at ASC`
  );
  return res.rows;
}

export async function deleteSlot(id: string): Promise<void> {
  await pool.query("DELETE FROM slots WHERE id = $1", [id]);
}

/** Bulk-insert slots, ignoring any whose start time already exists. */
export async function createSlotsBulk(
  items: { start_at: string; duration_min: number }[]
): Promise<number> {
  if (items.length === 0) return 0;
  const values: string[] = [];
  const params: (string | number)[] = [];
  items.forEach((it, i) => {
    const b = i * 2;
    values.push(`($${b + 1}, $${b + 2})`);
    params.push(it.start_at, it.duration_min);
  });
  const res = await pool.query(
    `INSERT INTO slots (start_at, duration_min) VALUES ${values.join(", ")}
     ON CONFLICT (start_at) DO NOTHING`,
    params
  );
  return res.rowCount ?? 0;
}

/* ---------------------------- Bookings --------------------------- */

export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function bookSlot(opts: {
  slotId: string;
  userId: string | null;
  name: string;
  email: string;
  meetLink: string | null;
}): Promise<{ booking: BookingRow; slot: SlotRow }> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const slotRes = await client.query<SlotRow>(
      `SELECT id, start_at, duration_min, status, created_at
       FROM slots WHERE id = $1 FOR UPDATE`,
      [opts.slotId]
    );
    const slot = slotRes.rows[0];
    if (!slot) {
      await client.query("ROLLBACK");
      throw new HttpError(404, "That time slot no longer exists.");
    }
    if (slot.status !== "open") {
      await client.query("ROLLBACK");
      throw new HttpError(409, "That slot was just booked — please pick another.");
    }
    await client.query("UPDATE slots SET status = 'booked' WHERE id = $1", [
      opts.slotId,
    ]);
    const ins = await client.query<BookingRow>(
      `INSERT INTO bookings (slot_id, user_id, name, email, meet_link)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, slot_id, user_id, name, email, meet_link, created_at`,
      [opts.slotId, opts.userId, opts.name, opts.email, opts.meetLink]
    );
    await client.query("COMMIT");
    return { booking: ins.rows[0], slot };
  } catch (err) {
    try {
      await client.query("ROLLBACK");
    } catch {
      /* ignore */
    }
    throw err;
  } finally {
    client.release();
  }
}

/** Admin can manually attach a Meet link (e.g. when auto-generation failed). */
export async function setBookingMeetLink(
  slotId: string,
  meetLink: string
): Promise<BookingRow | null> {
  const res = await pool.query<BookingRow>(
    `UPDATE bookings SET meet_link = $2
     WHERE slot_id = $1
     RETURNING id, slot_id, user_id, name, email, meet_link, created_at`,
    [slotId, meetLink]
  );
  return res.rows[0] ?? null;
}

/** Free a slot back up so it can be booked again (admin action). */
export async function releaseSlot(slotId: string): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM bookings WHERE slot_id = $1", [slotId]);
    await client.query("UPDATE slots SET status = 'open' WHERE id = $1", [slotId]);
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
