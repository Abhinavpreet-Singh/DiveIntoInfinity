import { randomUUID } from "node:crypto";
import googleapis from "googleapis";

const { google } = googleapis;

/**
 * Returns a Google-auth client + the calendar id to write to, or null if no
 * Google credentials are configured. Prefers the OAuth refresh-token path
 * (most reliable for generating Google Meet links on a real user's calendar),
 * then falls back to a service account.
 */
function getCalendarAuth(): { auth: unknown; calendarId: string } | null {
  // Option B: OAuth refresh token (admin's real account — Meet works reliably)
  if (
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_REFRESH_TOKEN
  ) {
    const oauth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    oauth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
    return { auth: oauth, calendarId: process.env.GOOGLE_CALENDAR_ID || "primary" };
  }

  // Option A: Service account
  if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
    const serviceAuth = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      undefined,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/calendar"]
    );
    return { auth: serviceAuth, calendarId: process.env.GOOGLE_CALENDAR_ID || "primary" };
  }

  return null;
}

/**
 * Create a Google Calendar event with a generated Google Meet conference and
 * return its `hangoutLink`. Returns null if credentials are missing or the
 * call fails (booking still succeeds; admin can attach a link manually).
 */
export async function createMeetLink(opts: {
  summary: string;
  startISO: string;
  endISO: string;
  timeZone: string;
}): Promise<string | null> {
  const a = getCalendarAuth();
  if (!a) {
    console.warn("[meet] No Google credentials configured — skipping Meet creation.");
    return null;
  }

  try {
    const calendar = google.calendar({ version: "v3", auth: a.auth as never });
    const event = await calendar.events.insert({
      calendarId: a.calendarId,
      conferenceDataVersion: 1,
      requestBody: {
        summary: opts.summary,
        start: { dateTime: opts.startISO, timeZone: opts.timeZone },
        end: { dateTime: opts.endISO, timeZone: opts.timeZone },
        conferenceData: { createRequest: { requestId: randomUUID() } },
        guestsCanSeeOtherGuests: false,
      },
    });
    return event.data.hangoutLink ?? null;
  } catch (err) {
    console.error("[meet] Failed to create Google Meet link:", err);
    return null;
  }
}
