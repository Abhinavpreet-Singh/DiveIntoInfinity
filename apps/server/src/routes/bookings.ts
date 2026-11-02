import { Router } from "express";
import { ah } from "../lib/async.ts";
import {
  bookSlot,
  setBookingMeetLink,
  upsertUser,
  HttpError,
} from "../db/queries.ts";
import { createMeetLink } from "../lib/meet.ts";
import { sendBookingConfirmation } from "../lib/email.ts";
import { endISO, formatSlot, TIMEZONE } from "../lib/time.ts";

export const bookingsRouter = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Public: book a slot. Creates the Google Meet link and emails the booker. */
bookingsRouter.post(
  "/",
  ah(async (req, res) => {
    const { slotId, name, email } = (req.body ?? {}) as {
      slotId?: string;
      name?: string;
      email?: string;
    };

    if (!slotId) throw new HttpError(400, "Missing slot.");
    const cleanName = (name ?? "").trim();
    const cleanEmail = (email ?? "").trim().toLowerCase();
    if (cleanName.length < 2)
      throw new HttpError(400, "Please enter your name.");
    if (!EMAIL_RE.test(cleanEmail))
      throw new HttpError(400, "Please enter a valid email address.");

    // 1) Claim the slot (atomic; fails if already booked).
    const user = await upsertUser(cleanEmail, cleanName);
    const { booking, slot } = await bookSlot({
      slotId,
      userId: user.id,
      name: cleanName,
      email: cleanEmail,
      meetLink: null,
    });

    // 2) Generate a Meet link for this exact date/time (best-effort).
    const meetLink = await createMeetLink({
      summary: "DiveintoInfinity — Intro Call",
      startISO: slot.start_at,
      endISO: endISO(slot.start_at, slot.duration_min),
      timeZone: TIMEZONE,
    });
    if (meetLink) await setBookingMeetLink(slot.id, meetLink);

    // 3) Email the booker the confirmation + link (best-effort).
    const fmt = formatSlot(slot.start_at);
    await sendBookingConfirmation({
      to: cleanEmail,
      name: cleanName,
      slotLabel: fmt.full,
      tzShort: fmt.tzShort,
      durationMin: slot.duration_min,
      meetLink,
    });

    res.status(201).json({
      booking: { id: booking.id, meetLink },
      slot: {
        id: slot.id,
        startAt: slot.start_at,
        durationMin: slot.duration_min,
        ...fmt,
      },
    });
  })
);
