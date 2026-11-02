interface SendArgs {
  to: string;
  subject: string;
  text: string;
  html: string;
}

const FROM = process.env.BOOKING_FROM_EMAIL ?? "onboarding@resend.dev";
const STUDIO = "DiveintoInfinity";

/** Low-level Resend send. Returns true on success. */
async function send(args: SendArgs): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[email] RESEND_API_KEY not set — skipping send");
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${STUDIO} <${FROM}>`,
        to: args.to,
        reply_to: FROM,
        subject: args.subject,
        text: args.text,
        html: args.html,
      }),
    });
    if (!res.ok) {
      console.error("[email] Resend error:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[email] send failed:", err);
    return false;
  }
}

export async function sendBookingConfirmation(opts: {
  to: string;
  name: string;
  slotLabel: string;
  tzShort: string;
  durationMin: number;
  meetLink: string | null;
}): Promise<boolean> {
  const meetLine = opts.meetLink
    ? `Google Meet link: ${opts.meetLink}`
    : "We'll send your video-call link shortly.";

  const text = `Hi ${opts.name},

Your meeting with ${STUDIO} is confirmed.

When: ${opts.slotLabel} (${opts.tzShort})
Duration: ${opts.durationMin} minutes

${meetLine}

Add it to your calendar, and we'll see you there. If you need to reschedule, just reply to this email.

— ${STUDIO}`;

  const html = `
<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:auto;color:#14120b;background:#f7f7f4;border-radius:16px;padding:32px;border:1px solid #e3e2dc">
  <h1 style="font-size:20px;margin:0 0 4px">Your meeting is booked</h1>
  <p style="color:#6b6962;margin:0 0 20px">Hi ${escapeHtml(opts.name)}, here are your details.</p>
  <table style="width:100%;border-collapse:collapse;font-size:14px">
    <tr><td style="color:#9a988e;padding:8px 0;width:90px">When</td><td style="padding:8px 0">${escapeHtml(opts.slotLabel)} <span style="color:#9a988e">(${escapeHtml(opts.tzShort)})</span></td></tr>
    <tr><td style="color:#9a988e;padding:8px 0">Duration</td><td style="padding:8px 0">${opts.durationMin} minutes</td></tr>
    <tr><td style="color:#9a988e;padding:8px 0;vertical-align:top">Link</td><td style="padding:8px 0">${
      opts.meetLink
        ? `<a href="${escapeHtml(opts.meetLink)}" style="color:#14120b;font-weight:600">Join the Google Meet</a>`
        : "We&rsquo;ll send your video-call link shortly."
    }</td></tr>
  </table>
  <p style="color:#6b6962;font-size:13px;margin-top:24px">Need to reschedule? Just reply to this email.<br/><br/>— ${STUDIO}</p>
</div>`;

  return send({
    to: opts.to,
    subject: `Your meeting with ${STUDIO} is booked · ${opts.slotLabel}`,
    text,
    html,
  });
}

export async function sendMagicLink(opts: {
  to: string;
  link: string;
}): Promise<boolean> {
  const text = `Sign in to ${STUDIO}.

Open this link to log in (it expires in 15 minutes):

${opts.link}

If you didn't request this, you can ignore this email.

— ${STUDIO}`;
  const html = `
<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:auto;color:#14120b;background:#f7f7f4;border-radius:16px;padding:32px;border:1px solid #e3e2dc">
  <h1 style="font-size:20px;margin:0 0 12px">Sign in to ${STUDIO}</h1>
  <p style="color:#6b6962;margin:0 0 24px">Tap the button below to log in. This link expires in 15 minutes.</p>
  <a href="${escapeHtml(opts.link)}" style="display:inline-block;background:#14120b;color:#f7f7f4;text-decoration:none;font-weight:600;padding:14px 28px;border-radius:9999px">Sign in</a>
  <p style="color:#9a988e;font-size:13px;margin-top:24px">Or paste this link: ${escapeHtml(opts.link)}<br/><br/>If you didn't request this, ignore this email.</p>
</div>`;
  return send({
    to: opts.to,
    subject: `Sign in to ${STUDIO}`,
    text,
    html,
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
