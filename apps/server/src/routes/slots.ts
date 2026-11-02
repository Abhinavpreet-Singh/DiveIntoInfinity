import { Router } from "express";
import { ah } from "../lib/async.ts";
import { listOpenSlots } from "../db/queries.ts";
import { formatSlot } from "../lib/time.ts";

export const slotsRouter = Router();

/** Public: list all currently-open upcoming slots. */
slotsRouter.get(
  "/",
  ah(async (_req, res) => {
    const slots = await listOpenSlots();
    res.json({
      slots: slots.map((s) => ({
        id: s.id,
        startAt: s.start_at,
        durationMin: s.duration_min,
        ...formatSlot(s.start_at),
      })),
    });
  })
);
