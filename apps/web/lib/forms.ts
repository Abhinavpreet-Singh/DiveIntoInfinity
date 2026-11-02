/**
 * Formspree form integration.
 *
 * Formspree endpoints are designed to be embedded directly in static HTML
 * forms, so the endpoint id is safe to ship to the client (it is not a
 * secret). Override per-environment with NEXT_PUBLIC_FORMSPREE_ENDPOINT if a
 * different form is needed without a code change.
 */
export const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/moeepqvg";

export interface FormspreeResult {
  ok: boolean;
  /** Human-readable error message (when ok is false). */
  message?: string;
  /** Per-field validation errors keyed by field name (when provided). */
  fieldErrors?: Record<string, string>;
}

/**
 * Submit a form payload to the configured Formspree endpoint.
 *
 * Uses Formspree's JSON API (Accept: application/json) so we get a structured
 * response instead of a redirect. Formspree recognises an `email` field as the
 * reply-to address and a `name` field as the submitter's name. Pass `subject`
 * to customise the email subject line via Formspree's `_subject` field.
 */
export async function submitToFormspree(
  payload: Record<string, unknown>,
  subject?: string
): Promise<FormspreeResult> {
  const body: Record<string, unknown> = { ...payload };
  if (subject) body._subject = subject;

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    // Formspree returns JSON when Accept: application/json is set. A missing
    // or non-JSON body (e.g. on some error states) degrades gracefully.
    const data = (await res.json().catch(() => ({}))) as {
      error?: string;
      errors?: Record<string, unknown>;
    };

    if (res.ok) {
      return { ok: true };
    }

    // Formspree returns { errors: { field: "message" } } for validation
    // failures, or { error: "message" } for general errors.
    if (data?.errors && typeof data.errors === "object") {
      const fieldErrors: Record<string, string> = {};
      const messages: string[] = [];
      for (const [key, value] of Object.entries(data.errors)) {
        const msg = String(value);
        fieldErrors[key] = msg;
        messages.push(msg);
      }
      return {
        ok: false,
        fieldErrors,
        message: messages.join(" ") || "Please check the highlighted fields.",
      };
    }

    return {
      ok: false,
      message: data?.error || "Unable to send your message. Please try again.",
    };
  } catch {
    // Network failure, CORS issue, or Formspree unreachable.
    return {
      ok: false,
      message:
        "We couldn't reach the form service. Please check your connection and try again.",
    };
  }
}
