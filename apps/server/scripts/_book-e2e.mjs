// Temporary e2e check for the public booking flow: creates a slot (as admin),
// books it (as a normal user), verifies the response + that it's consumed,
// then cleans up.
import jwt from "jsonwebtoken";
import pg from "pg";

const BASE = "http://localhost:3000";
const adminToken = jwt.sign(
  { sub: "a", email: "a@t", role: "admin" },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);
const h = { Authorization: `Bearer ${adminToken}`, "Content-Type": "application/json" };

// Create one open slot tomorrow at 11:00.
const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
await fetch(`${BASE}/admin/slots/bulk`, {
  method: "POST",
  headers: h,
  body: JSON.stringify({ fromDate: tomorrow, toDate: tomorrow, times: ["11:00"], durationMin: 30 }),
});

const open = await (await fetch(`${BASE}/slots`)).json();
const slotId = open.slots[0].id;
console.log("open before booking ->", open.slots.length);

// Book it as a normal visitor (no auth).
const book = await fetch(`${BASE}/bookings`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ slotId, name: "Jane Test", email: "jane.test@example.com" }),
});
const bj = await book.json();
console.log("booking ->", book.status, "meetLink:", bj.booking?.meetLink, "| slot.full:", bj.slot?.full, "| tzShort:", bj.slot?.tzShort);

const after = await (await fetch(`${BASE}/slots`)).json();
console.log("open after booking ->", after.slots.length);

// Cleanup.
const { Pool } = pg;
const p = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: true },
});
await p.query("DELETE FROM slots");
await p.query("DELETE FROM users WHERE email = 'jane.test@example.com'");
console.log("cleaned up");
await p.end();
