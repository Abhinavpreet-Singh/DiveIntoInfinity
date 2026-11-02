"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Video,
  ArrowUpRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { api, ApiError, type SlotView } from "@/lib/api";

const fieldClass =
  "w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--dim)] outline-none transition-colors duration-200 focus:border-[var(--ink)] focus:bg-[var(--surface-2)]";
const labelClass =
  "mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--dim)]";

type Status = "idle" | "loading" | "submitting" | "success" | "error";

export function Schedule() {
  const [slots, setSlots] = useState<SlotView[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<{
    meetLink: string | null;
    full: string;
    tzShort: string;
  } | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await api.get<{ slots: SlotView[] }>("/slots");
        if (alive) {
          setSlots(res.slots);
          setLoading(false);
        }
      } catch (err) {
        if (alive) {
          setLoadError(
            err instanceof ApiError ? err.message : "Couldn't load slots."
          );
          setLoading(false);
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Group slots by their display day.
  const grouped = useMemo(() => {
    const map = new Map<string, SlotView[]>();
    for (const s of slots) {
      const key = s.dateLabel;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(s);
    }
    return Array.from(map.entries());
  }, [slots]);

  const selected = slots.find((s) => s.id === selectedId) ?? null;

  async function handleBook(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;
    if (name.trim().length < 2) {
      setStatus("error");
      setMessage("Please enter your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("submitting");
    setMessage("");
    try {
      const res = await api.post<{
        booking: { id: string; meetLink: string | null };
        slot: { full: string; tzShort: string };
      }>("/bookings", { slotId: selected.id, name: name.trim(), email: email.trim() });
      setResult({ meetLink: res.booking.meetLink, full: res.slot.full, tzShort: res.slot.tzShort });
      setStatus("success");
      // Remove the booked slot from the list.
      setSlots((prev) => prev.filter((s) => s.id !== selected.id));
      setSelectedId(null);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof ApiError ? err.message : "Booking failed.");
    }
  }

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <Container size="wide" className="relative">
        {/* Header */}
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--ink)]" />
            <span className="eyebrow text-[var(--ink)]">Booking</span>
          </div>
          <h1 className="mt-5 text-[2rem] font-semibold leading-[1.06] tracking-[-0.035em] text-[var(--ink)] sm:text-[2.75rem]">
            Schedule a meeting
          </h1>
          <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-[var(--muted)]">
            Pick a time that works for you. You&apos;ll get a Google Meet link for that
            exact slot — sent straight to your inbox, from{" "}
            <span className="text-[var(--ink)]">DiveintoInfinity</span>.
          </p>
        </Reveal>

        {result ? (
          <Confirmation result={result} onReset={() => { setResult(null); setStatus("idle"); setName(""); setEmail(""); }} />
        ) : (
          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
            {/* Slot picker */}
            <div className="lg:col-span-7">
              {loading ? (
                <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading available times…
                </div>
              ) : loadError ? (
                <div className="flex items-start gap-2.5 rounded-xl border border-[var(--ink)] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--ink)]">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  {loadError}
                </div>
              ) : grouped.length === 0 ? (
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-8 text-center">
                  <CalendarDays className="mx-auto h-7 w-7 text-[var(--dim)]" />
                  <p className="mt-3 text-sm text-[var(--muted)]">
                    No open slots right now. New times are added every week —
                    check back shortly.
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {grouped.map(([day, daySlots]) => (
                    <Reveal key={day}>
                      <div>
                        <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--dim)]">
                          {day}
                        </h3>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                          {daySlots.map((s) => {
                            const active = s.id === selectedId;
                            return (
                              <button
                                key={s.id}
                                type="button"
                                onClick={() => setSelectedId(s.id)}
                                className={
                                  "group flex flex-col items-start gap-1 rounded-2xl border p-4 text-left transition-all duration-200 " +
                                  (active
                                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)]"
                                    : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--ink)]")
                                }
                              >
                                <span className="text-sm font-semibold tracking-tight">
                                  {s.timeLabel}
                                </span>
                                <span
                                  className={
                                    "flex items-center gap-1 text-[11px] " +
                                    (active ? "text-[var(--bg)]/70" : "text-[var(--dim)]")
                                  }
                                >
                                  <Clock className="h-3 w-3" />
                                  {s.durationMin} min
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>

            {/* Booking panel */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 panel rounded-3xl p-6 sm:p-8">
                {selected ? (
                  <>
                    <span className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--dim)]">
                      Selected
                    </span>
                    <h2 className="mt-2 text-lg font-semibold tracking-tight text-[var(--ink)]">
                      {selected.full}
                    </h2>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      {selected.tzShort} · {selected.durationMin} minutes
                    </p>

                    <form onSubmit={handleBook} className="mt-6 space-y-5">
                      <div>
                        <label htmlFor="bk-name" className={labelClass}>
                          Your name *
                        </label>
                        <input
                          id="bk-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ada Lovelace"
                          className={fieldClass}
                          autoComplete="name"
                        />
                      </div>
                      <div>
                        <label htmlFor="bk-email" className={labelClass}>
                          Email address *
                        </label>
                        <input
                          id="bk-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="jane@company.com"
                          className={fieldClass}
                          autoComplete="email"
                        />
                      </div>

                      {status === "error" && (
                        <p
                          role="alert"
                          className="flex items-start gap-2.5 rounded-xl border border-[var(--ink)] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--ink)]"
                        >
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                          {message}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--ink)] bg-[var(--ink)] px-7 py-3.5 text-sm font-semibold text-[var(--bg)] transition-all duration-300 hover:shadow-[0_18px_40px_-22px_var(--ink)] active:scale-[0.985] disabled:opacity-60"
                      >
                        {status === "submitting" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Booking…
                          </>
                        ) : (
                          <>
                            Confirm booking
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </>
                        )}
                      </button>
                      <p className="text-center text-xs text-[var(--dim)]">
                        We&apos;ll email your Google Meet link to this address.
                      </p>
                    </form>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <CalendarDays className="h-8 w-8 text-[var(--dim)]" />
                    <p className="mt-4 max-w-[16rem] text-sm text-[var(--muted)]">
                      Choose a time on the left to continue. A Google Meet link
                      is generated for your exact slot.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

function Confirmation({
  result,
  onReset,
}: {
  result: { meetLink: string | null; full: string; tzShort: string };
  onReset: () => void;
}) {
  return (
    <Reveal className="mt-12">
      <div className="panel mx-auto max-w-2xl rounded-3xl p-8 text-center sm:p-12">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--surface-2)]">
          <CheckCircle2 className="h-6 w-6 text-[var(--ink)]" />
        </span>
        <h2 className="mt-6 text-xl font-semibold tracking-tight text-[var(--ink)]">
          You&apos;re booked in
        </h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          {result.full} · {result.tzShort}
        </p>

        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-[var(--muted)]">
          We&apos;ve sent a confirmation to your inbox with all the details.{" "}
          {result.meetLink
            ? "Your Google Meet link is ready below — you can also find it in the email."
            : "We&apos;ll send your Google Meet link to the same address shortly."}
        </p>

        {result.meetLink && (
          <a
            href={result.meetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-7 inline-flex items-center justify-center gap-2 rounded-full border border-[var(--ink)] bg-[var(--ink)] px-7 py-3.5 text-sm font-semibold text-[var(--bg)] transition-all duration-300 hover:shadow-[0_18px_40px_-22px_var(--ink)] active:scale-[0.985]"
          >
            <Video className="h-4 w-4" />
            Join the Google Meet
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        )}

        <button
          type="button"
          onClick={onReset}
          className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--dim)] transition-colors hover:text-[var(--ink)]"
        >
          Book another time
        </button>
      </div>
    </Reveal>
  );
}
