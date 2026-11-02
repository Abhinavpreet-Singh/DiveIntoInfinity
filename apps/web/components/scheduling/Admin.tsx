"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Unlock,
  Link2,
  LogOut,
  CalendarDays,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { api, ApiError, type AdminSlotView } from "@/lib/api";
import { getCurrentUser, logout } from "@/lib/auth";

const fieldClass =
  "w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--dim)] outline-none transition-colors duration-200 focus:border-[var(--ink)] focus:bg-[var(--surface-2)]";
const labelClass =
  "mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--dim)]";

function thisWeek(): { from: string; to: string } {
  const today = new Date();
  const diffToMonday = (today.getDay() + 6) % 7;
  const monday = new Date(today);
  monday.setDate(today.getDate() - diffToMonday);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  return { from: iso(monday), to: iso(sunday) };
}

export function Admin() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [denied, setDenied] = useState(false);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [times, setTimes] = useState("10:00, 11:00, 14:00, 16:00");
  const [duration, setDuration] = useState(30);

  const [slots, setSlots] = useState<AdminSlotView[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [bulkStatus, setBulkStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [editLink, setEditLink] = useState<Record<string, string>>({});

  const refresh = useCallback(async () => {
    try {
      const res = await api.get<{ slots: AdminSlotView[] }>("/admin/slots");
      setSlots(res.slots);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    const w = thisWeek();
    setFromDate(w.from);
    setToDate(w.to);
  }, []);

  useEffect(() => {
    (async () => {
      const u = await getCurrentUser();
      if (u?.role === "admin") {
        setChecking(false);
        refresh();
      } else {
        setDenied(true);
        setChecking(false);
        setTimeout(() => router.replace("/login"), 600);
      }
    })();
  }, [router, refresh]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const timeList = times
      .split(",")
      .map((t) => t.trim())
      .filter((t) => /^\d{1,2}:\d{2}$/.test(t));
    if (timeList.length === 0) {
      setBulkStatus({ ok: false, msg: "Enter times as HH:mm, separated by commas." });
      return;
    }
    setBusy(true);
    setBulkStatus(null);
    try {
      const res = await api.post<{ created: number; attempted: number }>(
        "/admin/slots/bulk",
        { fromDate, toDate, times: timeList, durationMin: Number(duration) }
      );
      const skipped = res.attempted - res.created;
      setBulkStatus({
        ok: true,
        msg: `Created ${res.created} slot${res.created === 1 ? "" : "s"}${
          skipped > 0 ? ` · ${skipped} already existed` : ""
        }.`,
      });
      await refresh();
    } catch (err) {
      setBulkStatus({ ok: false, msg: err instanceof ApiError ? err.message : "Failed." });
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this slot? Its booking will be removed too.")) return;
    try {
      await api.del(`/admin/slots/${id}`);
      setSlots((p) => p.filter((s) => s.id !== id));
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "Failed.");
    }
  }

  async function handleRelease(id: string) {
    if (!confirm("Free this slot back up so it can be booked again?")) return;
    try {
      await api.patch(`/admin/slots/${id}/release`);
      await refresh();
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "Failed.");
    }
  }

  async function handleSaveLink(slotId: string) {
    const link = (editLink[slotId] ?? "").trim();
    if (!link) return;
    try {
      await api.patch(`/admin/bookings/${slotId}/meet-link`, { meetLink: link });
      setEditLink((p) => {
        const n = { ...p };
        delete n[slotId];
        return n;
      });
      await refresh();
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "Failed.");
    }
  }

  async function handleLogout() {
    await logout();
    router.replace("/");
  }

  if (checking || denied) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center py-24">
        {denied ? (
          <p className="text-sm text-[var(--muted)]">Admin access required. Redirecting…</p>
        ) : (
          <Loader2 className="h-6 w-6 animate-spin text-[var(--ink)]" />
        )}
      </section>
    );
  }

  const openCount = slots.filter((s) => s.status === "open").length;
  const bookedCount = slots.length - openCount;

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <Container size="wide" className="relative">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--ink)]" />
              <span className="eyebrow text-[var(--ink)]">Admin</span>
            </div>
            <h1 className="mt-4 text-[1.75rem] font-semibold leading-tight tracking-[-0.035em] text-[var(--ink)] sm:text-[2.25rem]">
              Availability &amp; bookings
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 text-xs font-semibold text-[var(--muted)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]"
          >
            <LogOut className="h-3.5 w-3.5" />
            Log out
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-[var(--muted)]">
          <span><span className="font-semibold text-[var(--ink)]">{openCount}</span> open</span>
          <span><span className="font-semibold text-[var(--ink)]">{bookedCount}</span> booked</span>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {/* Bulk create */}
          <div className="lg:col-span-5">
            <div className="panel rounded-3xl p-6 sm:p-8">
              <h2 className="flex items-center gap-2 text-sm font-semibold tracking-tight text-[var(--ink)]">
                <Plus className="h-4 w-4" />
                Create slots in bulk
              </h2>
              <p className="mt-1 text-xs text-[var(--muted)]">
                Generates every time on every day in the range.
              </p>

              <form onSubmit={handleCreate} className="mt-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} htmlFor="from">From</label>
                    <input id="from" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className={fieldClass} />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="to">To</label>
                    <input id="to" type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className={fieldClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass} htmlFor="times">Times (24h, comma-separated)</label>
                  <input id="times" value={times} onChange={(e) => setTimes(e.target.value)} placeholder="10:00, 14:00, 16:00" className={fieldClass} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="dur">Duration (minutes)</label>
                  <input id="dur" type="number" min={5} max={480} value={duration} onChange={(e) => setDuration(Number(e.target.value))} className={fieldClass} />
                </div>

                {bulkStatus && (
                  <p className={"flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm " + (bulkStatus.ok ? "border-[var(--line-strong)] bg-[var(--surface-2)] text-[var(--ink)]" : "border-[var(--ink)] bg-[var(--surface-2)] text-[var(--ink)]")}>
                    {bulkStatus.ok ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />}
                    {bulkStatus.msg}
                  </p>
                )}

                <button type="submit" disabled={busy} className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--ink)] bg-[var(--ink)] px-7 py-3.5 text-sm font-semibold text-[var(--bg)] transition-all duration-300 hover:shadow-[0_18px_40px_-22px_var(--ink)] active:scale-[0.985] disabled:opacity-60">
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                  Generate slots
                </button>
              </form>
            </div>
          </div>

          {/* Slots table */}
          <div className="lg:col-span-7">
            <div className="panel rounded-3xl p-6 sm:p-8">
              <h2 className="text-sm font-semibold tracking-tight text-[var(--ink)]">All slots</h2>
              {loadingSlots ? (
                <div className="flex items-center gap-2 py-10 text-sm text-[var(--muted)]">
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading…
                </div>
              ) : slots.length === 0 ? (
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-8 text-center">
                  <CalendarDays className="mx-auto h-7 w-7 text-[var(--dim)]" />
                  <p className="mt-3 text-sm text-[var(--muted)]">No slots yet. Create some on the left.</p>
                </div>
              ) : (
                <div className="mt-5 space-y-3">
                  {slots.map((s) => {
                    const editing = editLink[s.id] ?? "";
                    return (
                      <div key={s.id} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-[var(--ink)]">
                              {s.dateLabel} · {s.timeLabel}
                              <span className="ml-2 text-[11px] font-normal text-[var(--dim)]">{s.durationMin}m</span>
                            </p>
                            <p className="mt-0.5 text-xs text-[var(--muted)]">{s.tzShort}</p>
                          </div>
                          <span className={"rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] " + (s.status === "open" ? "border border-[var(--line-strong)] text-[var(--muted)]" : "border border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)]")}>
                            {s.status}
                          </span>
                        </div>

                        {s.booking ? (
                          <div className="mt-3 border-t border-[var(--line-soft)] pt-3">
                            <p className="text-xs text-[var(--muted)]">
                              <span className="text-[var(--ink)]">{s.booking.name}</span>{" "}
                              · {s.booking.email}
                            </p>
                            {s.booking.meetLink ? (
                              <a href={s.booking.meetLink} target="_blank" rel="noopener noreferrer" className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ink)] hover:opacity-75">
                                <Link2 className="h-3.5 w-3.5" />
                                Meet link
                              </a>
                            ) : (
                              <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-[var(--dim)]">
                                <AlertCircle className="h-3.5 w-3.5" /> No Meet link yet
                              </p>
                            )}

                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <input
                                value={editing}
                                onChange={(e) => setEditLink((p) => ({ ...p, [s.id]: e.target.value }))}
                                placeholder="Paste Google Meet link"
                                className="min-w-[12rem] flex-1 rounded-lg border border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-xs text-[var(--ink)] placeholder:text-[var(--dim)] outline-none focus:border-[var(--ink)]"
                              />
                              <button onClick={() => handleSaveLink(s.id)} className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--ink)] bg-[var(--ink)] px-3 py-2 text-xs font-semibold text-[var(--bg)]">
                                <Link2 className="h-3.5 w-3.5" /> Save
                              </button>
                              <button onClick={() => handleRelease(s.id)} className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--line)] px-3 py-2 text-xs font-semibold text-[var(--muted)] hover:border-[var(--ink)] hover:text-[var(--ink)]">
                                <Unlock className="h-3.5 w-3.5" /> Release
                              </button>
                            </div>
                          </div>
                        ) : null}

                        <div className="mt-3">
                          <button onClick={() => handleDelete(s.id)} className="inline-flex items-center gap-1.5 text-xs text-[var(--dim)] transition-colors hover:text-[var(--ink)]">
                            <Trash2 className="h-3.5 w-3.5" /> Delete slot
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
