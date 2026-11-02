// Temporary e2e check for the admin slot API. Mints an admin session JWT
// (using JWT_SECRET from .env) and exercises bulk create + list + cleanup.
import jwt from "jsonwebtoken";
import pg from "pg";

const BASE = "http://localhost:3000";
const token = jwt.sign(
  { sub: "test-admin", email: "admin@test.local", role: "admin" },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);
const h = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

// 1) Bulk create a Mon–Fri week at 10:00 and 14:00 (Asia/Kolkata).
const create = await fetch(`${BASE}/admin/slots/bulk`, {
  method: "POST",
  headers: h,
  body: JSON.stringify({
    fromDate: "2026-11-09",
    toDate: "2026-11-13",
    times: ["10:00", "14:00"],
    durationMin: 30,
  }),
});
console.log("bulk create ->", create.status, JSON.stringify(await create.json()));

// 2) Admin lists all slots.
const list = await (await fetch(`${BASE}/admin/slots`, { headers: h })).json();
console.log("admin slots count ->", list.slots.length);
console.log("sample ->", JSON.stringify(list.slots[0]));

// 3) Public /slots should show them as open.
const pub = await (await fetch(`${BASE}/slots`)).json();
console.log("public open slots ->", pub.slots.length);

// 4) Unauthenticated admin call must be 401.
const unauth = await fetch(`${BASE}/admin/slots`);
console.log("admin(no-auth) ->", unauth.status);

// 5) Cleanup all test slots (cascade clears bookings).
const { Pool } = pg;
const p = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: true },
});
await p.query("DELETE FROM slots");
const c = await p.query("SELECT count(*) AS c FROM slots");
console.log("after cleanup slots ->", c.rows[0].c);
await p.end();
