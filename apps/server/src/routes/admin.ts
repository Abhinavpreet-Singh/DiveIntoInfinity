import { Router } from "express";
import { ah } from "../lib/async.ts";
import { requireAdmin } from "../lib/auth.ts";
import {
  createSlotsBulk,
  deleteSlot,
  listAllSlotsWithBookings,
  releaseSlot,
  setBookingMeetLink,
  HttpError,
} from "../db/queries.ts";
import { computeSlotStarts, formatSlot } from "../lib/time.ts";

export const adminRouter = Router();

// Every admin route requires an authenticated admin.
adminRouter.use(requireAdmin);

/** List all slots (open + booked) with their booking details. */
adminRouter.get(
  "/slots",
  ah(async (_req, res) => {
    const rows = await listAllSlotsWithBookings();
    res.json({
      slots: rows.map((r) => {
        const fmt = formatSlot(r.start_at);
        return {
          id: r.id,
          startAt: r.start_at,
          durationMin: r.duration_min,
          status: r.status,
          ...fmt,
          booking: r.booking_id
            ? {
                id: r.booking_id,
                name: r.booker_name,
                email: r.booker_email,
                meetLink: r.meet_link,
                bookedAt: r.booked_at,
              }
            : null,
        };
      }),
    });
  })
);

/** Bulk-create slots for a date range (e.g. a whole week) at given times. */
adminRouter.post(
  "/slots/bulk",
  ah(async (req, res) => {
    const { fromDate, toDate, times, durationMin } = (req.body ?? {}) as {
      fromDate?: string;
      toDate?: string;
      times?: string[];
      durationMin?: number;
    };
    if (!fromDate || !toDate)
      throw new HttpError(400, "fromDate and toDate are required (YYYY-MM-DD).");
    const timeList = (times ?? [])
      .map((t) => t.trim())
      .filter((t) => /^\d{1,2}:\d{2}$/.test(t));
    if (timeList.length === 0)
      throw new HttpError(400, "Provide at least one time (HH:mm, 24h).");
    const duration = Math.min(Math.max(Number(durationMin) || 30, 5), 480);

    const starts = computeSlotStarts(fromDate, toDate, timeList);
    if (starts.length === 0)
      throw new HttpError(400, "No valid dates produced from that range.");

    const created = await createSlotsBulk(
      starts.map((s) => ({ start_at: s, duration_min: duration }))
    );
    res.json({ created, attempted: starts.length });
  })
);

/** Delete a slot (and its booking, if any). */
adminRouter.delete(
  "/slots/:id",
  ah(async (req, res) => {
    await deleteSlot(req.params.id);
    res.json({ ok: true });
  })
);

/** Free a booked slot back up so it can be booked again. */
adminRouter.patch(
  "/slots/:id/release",
  ah(async (req, res) => {
    await releaseSlot(req.params.id);
    res.json({ ok: true });
  })
);

/** Manually attach a Meet link to a booking (e.g. when auto-generation failed). */
adminRouter.patch(
  "/bookings/:slotId/meet-link",
  ah(async (req, res) => {
    const meetLink = (req.body ?? {}).meetLink as string | undefined;
    if (!meetLink || !/^https?:\/\//.test(meetLink))
      throw new HttpError(400, "Provide a valid meet link URL.");
    const updated = await setBookingMeetLink(req.params.slotId, meetLink.trim());
    if (!updated) throw new HttpError(404, "No booking for that slot.");
    res.json({ booking: updated });
  })
);
