import { DateTime } from "luxon";

export const TIMEZONE: string = process.env.TIMEZONE ?? "UTC";

/** Parse a stored UTC instant and format it for display in the configured zone.
 * Accepts either an ISO string or the JS Date node-postgres returns for
 * timestamptz columns. */
export function formatSlot(start: string | Date): {
  day: string;
  dateLabel: string;
  timeLabel: string;
  full: string;
  tzShort: string;
  zone: string;
} {
  const dt =
    start instanceof Date
      ? DateTime.fromJSDate(start, { zone: TIMEZONE })
      : DateTime.fromISO(start, { zone: TIMEZONE });
  return {
    day: dt.toFormat("ccc"), // Mon
    dateLabel: dt.toFormat("ccc, MMM d"), // Mon, Nov 2
    timeLabel: dt.toFormat("h:mm a").toLowerCase(), // 10:00 am
    full: dt.toFormat("cccc, MMMM d · h:mm a"),
    tzShort: dt.toFormat("ZZZZ"), // GMT+5:30
    zone: TIMEZONE,
  };
}

/** End instant of a slot, as ISO, given the start and duration in minutes. */
export function endISO(start: string | Date, durationMin: number): string {
  const dt =
    start instanceof Date
      ? DateTime.fromJSDate(start, { zone: TIMEZONE })
      : DateTime.fromISO(start, { zone: TIMEZONE });
  return dt.plus({ minutes: durationMin }).toUTC().toISO()!;
}

/**
 * Expand an admin's "bulk for a week" request into concrete UTC start instants.
 * fromDate / toDate are YYYY-MM-DD interpreted in TIMEZONE; times are HH:mm (24h).
 */
export function computeSlotStarts(
  fromDate: string,
  toDate: string,
  times: string[]
): string[] {
  const out: string[] = [];
  let cursor = DateTime.fromISO(fromDate, { zone: TIMEZONE });
  const end = DateTime.fromISO(toDate, { zone: TIMEZONE });
  if (!cursor.isValid || !end.isValid || cursor > end) return out;

  while (cursor <= end) {
    for (const t of times) {
      const [h, m] = t.split(":").map((n) => Number(n));
      const dt = cursor.set({
        hour: h,
        minute: m ?? 0,
        second: 0,
        millisecond: 0,
      });
      if (dt.isValid) out.push(dt.toUTC().toISO()!);
    }
    cursor = cursor.plus({ days: 1 });
  }
  return out;
}
